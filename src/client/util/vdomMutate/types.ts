import { AbstractElement, AbstractText, AbstractProperties } from '../../../util/vdom/mod.ts';

export type AnyFunction<T = any> = (..._: any[]) => T;

export interface Methods {
  onEnter: AnyFunction;
  onExit: AnyFunction;
  onNext: AnyFunction;
  onInit: AnyFunction;
}

export interface MemoEntry {
  element: Element | Text;
  node: AbstractElement | AbstractText;
  events: {  };
}

export interface ElementWithStyle extends Element, AbstractProperties {}
