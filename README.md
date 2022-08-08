# build-react-from-scratch

A step by step approach to building your own react to understand how react works at core level.

### Call order of (React.createElement) for a React element

```jsx
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
  {/*
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

  */}
```

### Adding a React Component
