---
title: useRef Hook in React
description: Learn about the useRef hook in React. How to persist values and access DOM elements.
section: react
slug: useref
prev: usestate
next: useeffect
---

The **useRef** hook is a built-in React hook that allows you to persist values between renders and access DOM elements directly.

## What is useRef?

`useRef` returns a mutable ref object whose `.current` property is initialized to the passed argument. The returned object will persist for the full lifetime of the component.

```jsx
import { useRef } from 'react';

function MyComponent() {
  const myRef = useRef(initialValue);
  // ...
}
```

## Accessing DOM Elements

The most common use case for `useRef` is to access DOM elements:

```jsx
import { useRef } from 'react';

function TextInputWithFocusButton() {
  const inputRef = useRef(null);

  const handleClick = () => {
    // Focus the input element
    inputRef.current.focus();
  };

  return (
    <>
      <input ref={inputRef} type="text" />
      <button onClick={handleClick}>Focus the input</button>
    </>
  );
}
```

## Storing Mutable Values

Unlike state, updating a ref doesn't trigger a re-render:

```jsx
import { useRef, useEffect } from 'react';

function Timer() {
  const intervalRef = useRef(null);
  const countRef = useRef(0);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      countRef.current += 1;
      console.log(countRef.current);
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, []);

  return <div>Check console for count</div>;
}
```

## useRef vs useState

| Feature | useRef | useState |
|---------|--------|----------|
| Re-renders component | No | Yes |
| Preserves value between renders | Yes | Yes |
| Returns | Mutable object | State value + setter |
| Best for | DOM refs, mutable values | UI state |

## Common Patterns

### Previous Value Pattern

```jsx
function usePrevious(value) {
  const ref = useRef();
  
  useEffect(() => {
    ref.current = value;
  }, [value]);
  
  return ref.current;
}

// Usage
function MyComponent({ count }) {
  const prevCount = usePrevious(count);
  
  return (
    <div>
      Current: {count}, Previous: {prevCount}
    </div>
  );
}
```

### Callback Ref Pattern

```jsx
function MeasureExample() {
  const [height, setHeight] = useState(0);

  const measuredRef = useCallback(node => {
    if (node !== null) {
      setHeight(node.getBoundingClientRect().height);
    }
  }, []);

  return (
    <>
      <h1 ref={measuredRef}>Hello, world</h1>
      <h2>The above header is {Math.round(height)}px tall</h2>
    </>
  );
}
```

> **Tip:** Remember that `useRef` doesn't notify you when its content changes. Mutating the `.current` property doesn't cause a re-render.
