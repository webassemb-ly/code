import { diff } from '../../../util/mod.ts';
import { createElement, createText } from '../mod.ts';
import {
  NodeKeys,
  AbstractNode,
  AbstractElement,
  AbstractText,
  AbstractProperties,
  AbstractComponent,
} from '../../../util/mod.ts';
import routeAttributes from './routeAttributes.ts';
import routeStyles from './routeStyles.ts';
import routeEvents from './routeEvents.ts';
import { Methods, MemoEntry, ElementWithStyle } from './types.ts';

// This is a top level weak map where references to nodes will be stored.
const MEMO = new WeakMap<AbstractNode, MemoEntry>();

function memoSet<
  T extends AbstractNode,
  U extends keyof MemoEntry,
  V extends MemoEntry[U],
>(
  identity: T,
  key: U,
  value: V,
) {
  const entry = MEMO.get(identity) || Object.create(null);
  entry[key] = value;
  MEMO.set(identity, entry);
}

function memoGet<
  T extends AbstractNode,
  U extends keyof MemoEntry,
>(
  identity: T,
  key: U,
){
  const entry = MEMO.get(identity);

  return entry ? entry[key] : null;
}

/**
 * Return whether an abstract node is of the type element
 * @param item 
 */
function isElement(
  item: AbstractNode,
): item is AbstractElement {
  return item.type === NodeKeys.Element;
}

/**
 * Return whether an abstract node is of the type text
 * @param item 
 */
function isText(
  item: AbstractNode,
): item is AbstractText {
  return item.type === NodeKeys.Text;
}

/**
 * Return whether an abstract node is of the type component
 * @param item 
 */
function isComponent(
  item: AbstractNode,
): item is AbstractComponent {
  return item.type === NodeKeys.Component;
}

/**
 * Evluate whether two nodes refer to the same element.
 * @param prev 
 * @param next 
 */
function isNodeEqual(
  prev?: AbstractNode | null,
  next?: AbstractNode | null,
) {
  if ((!prev || !next) || (prev && prev.type) !== (next && next.type)) {
    return false;
  } else if (isText(prev) && isText(next)) {
    return prev.value === next.value;
  } else if (isElement(prev) && isElement(next)) {
    return (
      prev.namespace === next.namespace &&
      prev.tag === next.tag
    );
  }

  return false;
}

/**
 * Get the attributes of a node if possible otherwise create an empty object.
 * @param abstractNode 
 */
function getProperties(
  abstractNode: AbstractNode | void,
) {
  return (
    abstractNode &&
    isElement(abstractNode) &&
    abstractNode.properties
  ) || ({} as AbstractProperties);
}

/**
 * Get the the children of a node if possible otherwise create an empty array.
 * @param abstractNode 
 */
function getChildren(
  abstractNode: AbstractNode | void,
) {
  return (
    abstractNode &&
    isElement(abstractNode) &&
    abstractNode.children
  ) || ([])
}

/**
 * Recursively walk the abstract dom-tree represented by `next`. At each node
 * compare it to the abstract dom-tree represented by `prev`.
 * 
 * @param parent 
 * @param next 
 * @param prev 
 */
export default function domTreeMutate(
  parent: Element,
  maybeNext: AbstractNode,
  hooks: Methods,
  maybePrev?: AbstractNode,
) {
  let prev: AbstractElement | AbstractText | null;
  let prevElement: Element | Text | null;
  let next: AbstractElement | AbstractText;
  let nextElement: Element | Text;

  prev = memoGet(maybePrev!, 'node');
  prevElement = memoGet(maybePrev!, 'element');

  if (isComponent(maybeNext)) {
    let nextOrComponent = maybeNext.component({ ...maybeNext.properties, children: maybeNext.children });

    while (nextOrComponent.type === NodeKeys.Component) {
      nextOrComponent = nextOrComponent.component({ ...nextOrComponent.properties, children: nextOrComponent.children });
    }
    
    next = nextOrComponent;
  } else {
    next = maybeNext;
  }

  memoSet(maybeNext, 'node', next);

  if (!isNodeEqual(prev, next)) {
    if (isText(next)) {
      nextElement = createText(next.value);
    } else {
      nextElement = createElement(next.namespace, next.tag);
      hooks.onInit(nextElement);
      hooks.onEnter(nextElement);
    }
    
    memoSet(maybeNext, 'element', nextElement);

    if (prevElement) {
      parent.replaceChild(nextElement, prevElement);
    } else {
      parent.appendChild(nextElement);
    }
  } else if (prevElement !== null) {
    nextElement = prevElement;

    hooks.onInit(nextElement);
    memoSet(maybeNext, 'element', nextElement);
  }

  if (prev && isElement(next)) {
    const prevProps: AbstractProperties = getProperties(prev);
    const nextProps: AbstractProperties = getProperties(next);
    const prevChildren = getChildren(prev);
    const nextChildren = getChildren(next);

    const {
      style: prevStyles = {},
      ...prevAttr
    } = prevProps;
    const {
      style: nextStyles = {},
      ...nextAttr
    } = nextProps;

    const attrPatches = diff(prevAttr, nextAttr);
    const stylePatches = diff(prevStyles, nextStyles);

    console.log('nextProps', nextProps, 'stylePatches': stylePatches);

    if (attrPatches) {
      for (let attrPatch of attrPatches) {
        const { type, key, value } = attrPatch;

        if (key.indexOf('on') === 0) {
          const eventName = key.substr(2);
          
          routeEvents(
            type,
            [
              nextElement! as Element,
              eventName,
              value,
            ]
          );
        } else {
          if (value) {
            routeAttributes(
              type,
              [
                next.namespace,
                nextElement! as Element,
                key,
                value
              ],
            );
          }
        }
      }
    }

    if (stylePatches) {
      for (let { type, key, value } of stylePatches) {
        routeStyles(
          type,
          [
            nextElement! as ElementWithStyle,
            key,
            value,
          ]
        )
      }
    }
    
    const nextChildrenLength = nextChildren.length;
    const childrenLength = Math.max(prevChildren.length, nextChildren.length);

    for (let i = 0; i < childrenLength; i++) {
      const prevChild = prevChildren[i];

      if (i < nextChildrenLength) {
        let nextChild = nextChildren[i];

        domTreeMutate(
          nextElement! as Element,
          nextChild,
          hooks,
          prevChild,
        );
      } else if (prevChild) {
        const prevChildElement = memoGet(prevChild, 'element');

        hooks.onExit(prevChildElement);

        if (prevChildElement) {
          nextElement!.removeChild(prevChildElement);
        }
      }
    }
  }

  hooks.onNext();
}