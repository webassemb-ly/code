import vdomMutate from './vdomMutate/mod.ts';
import { AbstractNode } from '../../util/mod.ts';

// 🐉 HERE BE DRAGONS 🐉
// =====================

type AnyFunction<T = any> = (..._: any[]) => T;

type Callback = (_: Element | Text) => any;

interface ElementState {
  created?: number;
  exitHandler?: AnyFunction;
}

const ELEMENTS = new WeakMap<Element, ElementState>();

export default function createRenderer() {
  let time: number;
  let isInLoop = false;
  let currentElement: Element | null = null;
  let enterHandler: AnyFunction | null;

  const hooks = {
    onInit: (
      element: Element,
    ) => {
      currentElement = element;
    },
    onEnter: () => {
      const exitHandler = enterHandler && enterHandler(currentElement);

      ELEMENTS.set(
        currentElement!,
        {
          created: time,
          exitHandler,
        },
      );
    },
    onExit: () => {
      const exitRef = ELEMENTS.get(currentElement!);
      const exitHandler = exitRef && exitRef.exitHandler;

      if (exitHandler) {
        exitHandler();
      }
    },
    onNext: () => {
      currentElement = null;
      enterHandler = null;
    }
  };

  const useEnter = (
    callback: Callback,
  ) => {
    enterHandler = callback;
  }

  function start<
    T extends Element,
    U extends AbstractNode,
  >(
    container: T,
    nextTree: U,
  ) {
    let tree: AbstractNode;

    isInLoop = true;

    function renderLoop(
      now: number
    ) {
      time = now;

      vdomMutate(
        container,
        nextTree,
        hooks,
        tree
      );

      if (isInLoop) {
        window.requestAnimationFrame(renderLoop);
      }

      tree = nextTree;
    }

    renderLoop(performance.now());
  }

  function stop() {
    isInLoop = false;
  }

  return {
    useEnter,
    start,
    stop,
  }
}
