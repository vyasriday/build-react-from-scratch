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
  render: function (reactElement, container: HTMLElement) {
    const actualDOMElement: HTMLElement = document.createElement(
      reactElement.tag
    );

    const {
      props: { children, ...restProps },
    } = reactElement;
    for (let key in restProps) {
      if (['__self', '__source'].includes(key)) {
        continue;
      }
      actualDOMElement[key] = restProps[key];
    }

    if (children.length === 1 && typeof children[0] === 'string') {
      actualDOMElement.textContent = children[0];
    }

    if (children.length >= 1 && typeof children[0] === 'object') {
      children.forEach((child) => {
        this.render(child, actualDOMElement);
      });
    }

    container.appendChild(actualDOMElement);
  },
};
const App = () => (
  // Finally createElement for parent is called and all the children element objects are pushed as children prop for parent
  <div className='parent'>
    {/* createElement for deepest children is called first for a sibling to build children objects. */}
    <p>Hello World</p>
    <ul>
      <li>Tomato</li>
      <li>Potato</li>
      <li>Brinjal</li>
    </ul>

    <div
      class='playground'
      style='height:300px;width:200px;border:1px solid black;padding:16px;background:beige'
    >
      <div>
        <form>
          <input type='text' name='name' />
          <button type='submit'>Submit</button>
        </form>
      </div>
    </div>
  </div>
);

ReactDOM.render(<App />, document.querySelector('#app'));
