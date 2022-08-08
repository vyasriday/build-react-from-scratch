let counter = 0;
const React = {
  createElement: function (tag, props, ...children) {
    const element = { tag, props: { ...props, children } };
    console.log('element: ', element);
    counter++;
    return element;
  },
};
const a = (
  // Finally createElement for parent is called and all the children element objects are pushed as children prop for parent
  <div className='parent'>
    {/* createElement for deepest children is called first for a sibling to build children objects. */}
    <p>
      <li>Hi</li>
      <li>there!</li>
    </p>
    <main>
      <p>
        <ul>
          <li>Deeply</li>
          <li>Nested</li>
        </ul>
      </p>
    </main>
    <span>Copyright 2022</span>
    Hello World
  </div>
);

/**
 * Order of createElement calls for above:
 * called for li
 * called for li
 * called for p
 * called for li
 * called for li
 * called for ul
 * called for main
 * called for span
 * called for div -> returns final element object tree
 */
