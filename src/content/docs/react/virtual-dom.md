---
title: Virtual DOM in React
description: Learn about the Virtual DOM in React. How React efficiently updates the UI using the virtual DOM.
section: react
slug: virtual-dom
prev: null
next: usestate
---

The **Virtual DOM** is a programming concept where a "virtual" representation of the UI is kept in memory and synced with the "real" DOM.

## What is Virtual DOM?

The Virtual DOM (VDOM) is a lightweight JavaScript representation of the actual DOM. React creates this virtual tree to track changes efficiently.

```jsx
// JSX gets converted to React elements (Virtual DOM)
const element = <h1>Hello, World!</h1>;

// Which is equivalent to:
const element = React.createElement('h1', null, 'Hello, World!');

// Results in a Virtual DOM node:
{
  type: 'h1',
  props: {
    children: 'Hello, World!'
  }
}
```

## How Virtual DOM Works

### 1. Initial Render

When your component first renders, React creates a Virtual DOM tree representing the UI.

```jsx
function App() {
  return (
    <div>
      <h1>Title</h1>
      <p>Content</p>
    </div>
  );
}

// Creates Virtual DOM tree:
// div
//   ├── h1 ("Title")
//   └── p ("Content")
```

### 2. State Change

When state changes, React creates a new Virtual DOM tree.

```jsx
function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}
```

### 3. Diffing Algorithm

React compares the new Virtual DOM with the previous one (reconciliation):

```
Previous VDOM:        New VDOM:
div                   div
├── p ("Count: 0")    ├── p ("Count: 1")  ← Changed
└── button            └── button
```

### 4. Batch Updates

React calculates the minimal set of changes and updates only what's necessary in the real DOM.

## Reconciliation Process

React uses several heuristics to make the O(n) algorithm efficient:

### 1. Different Element Types

When the root elements have different types, React tears down the old tree and builds a new one:

```jsx
// Old
<div>
  <Counter />
</div>

// New
<span>
  <Counter />
</span>
// Counter will unmount and remount
```

### 2. Same Element Type

When comparing two React DOM elements of the same type, React looks at the attributes and updates only the changed ones:

```jsx
// Old
<div className="before" title="stuff" />

// New
<div className="after" title="stuff" />
// Only updates className
```

### 3. Keys in Lists

Keys help React identify which items have changed:

```jsx
// ❌ Without keys - inefficient
{items.map(item => <li>{item.name}</li>)}

// ✅ With keys - efficient
{items.map(item => <li key={item.id}>{item.name}</li>)}
```

## Benefits of Virtual DOM

| Benefit | Description |
|---------|-------------|
| **Performance** | Minimizes expensive DOM operations |
| **Abstraction** | Developers work with simple state updates |
| **Cross-platform** | Same paradigm works for React Native |
| **Batching** | Multiple updates are batched together |

## Virtual DOM vs Real DOM

```
Real DOM Operations:
1. Parse HTML → DOM Tree
2. Calculate styles → CSSOM
3. Layout calculation
4. Paint pixels
5. Composite layers

Virtual DOM:
1. Create new VDOM
2. Diff with old VDOM
3. Calculate minimal changes
4. Apply to Real DOM (once)
```

> **Tip:** While Virtual DOM helps with performance, it's not always faster than direct DOM manipulation. Its main benefit is providing a declarative, component-based architecture.
