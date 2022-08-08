import ReactDOM from './ReactDOM';
import './index.css';

const globalState = [];
let stateCursor = 0;
const React = {
  createElement: function (type, props, ...children) {
    if (typeof type === 'function') {
      return type();
    }
    const element = { type, props: { ...props, children } };
    return element;
  },
  useState: function (initialState) {
    const FROZENCURSOR = stateCursor;
    globalState[FROZENCURSOR] = globalState[FROZENCURSOR] || initialState;
    let setState = (newState) => {
      globalState[FROZENCURSOR] = newState;
      // for this to work we need to set stateCursor to zero in re-render
      rerender();
    };
    stateCursor++;
    return [globalState[FROZENCURSOR], setState];
  },
};

const App = () => {
  const [name, setName] = React.useState('Hridayesh');
  return (
    <div class='parent'>
      <h1>Building React from Scratch</h1>
      <span>Copyright 2022</span>
      <p>Hello {name}!</p>
      <input
        type='text'
        name='person'
        value={name}
        onchange={(e) => {
          setName(e.target.value);
        }}
      />
      <div style='margin: 16px'>
        <Counter />
      </div>
    </div>
  );
};

const Counter = () => {
  const [count, setCount] = React.useState(0);
  return (
    <div>
      <button onclick={() => setCount(count - 1)}>-</button>
      {count}
      <button onclick={() => setCount(count + 1)}>+</button>
    </div>
  );
};

// just for re rendering after state update. React doesn't work like this for re-rendering
export const rerender = () => {
  console.log(globalState);
  stateCursor = 0;
  document.querySelector('#app').firstChild.remove();
  ReactDOM.render(<App />, document.querySelector('#app'));
};
ReactDOM.render(<App />, document.querySelector('#app'));
