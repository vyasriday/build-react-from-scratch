const React = {
  createElement: function (tag, props, ...children) {
    if (typeof tag === 'function') {
      return tag();
    }
    const element = { tag, props: { ...props, children } };
    return element;
  },
};

const ReactDOM = {
  render: function (reactElementOrStringOrNumber, container: HTMLElement) {
    const actualDOMElement: HTMLElement = document.createElement(
      reactElementOrStringOrNumber.tag
    );
    if (['string', 'number'].includes(typeof reactElementOrStringOrNumber)) {
      container.appendChild(
        document.createTextNode(String(reactElementOrStringOrNumber))
      );
      return;
    }

    const {
      props: { children, ...restProps },
    } = reactElementOrStringOrNumber;
    for (let key in restProps) {
      if (['__self', '__source'].includes(key)) {
        continue;
      }
      actualDOMElement[key] = restProps[key];
    }

    if (children.length > 0) {
      children.forEach((child) => {
        this.render(child, actualDOMElement);
      });
    }

    container.appendChild(actualDOMElement);
  },
};
const App = () => (
  <div class='parent'>
    <h1>Building React from Scratch</h1>
    <ul>
      <li>Building createElement</li>
      <li>Buildind render</li>
    </ul>
    <span>Copyright 2022</span>
    Hello World
  </div>
);

ReactDOM.render(<App />, document.querySelector('#app'));
