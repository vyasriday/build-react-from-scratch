export default {
  render: function (reactElementOrStringOrNumber, container: HTMLElement) {
    const actualDOMElement: HTMLElement = document.createElement(
      reactElementOrStringOrNumber.type
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
