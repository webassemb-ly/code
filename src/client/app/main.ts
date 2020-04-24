import { D, vdomRender } from '../util/mod.ts';
import { c, h } from '../../util/mod.ts';

const { start } = vdomRender();

function Test(props: object) {
  return h.p(props);
}

function TestHandler() {
  let test = true;

  return h.div(
    {
      style: {
        height: '100px',
        backgroundColor: 'black'
      },
    },
    [test && c(Test, {color: 'pink'}, ['test'])]
  );
}

start(
  D.body,
  c(TestHandler)
);
