---
title: useState Hook in React
description: Learn about the useState hook in React. How to manage state in functional components.
section: react
slug: usestate
prev: virtual-dom
next: useref
---

The **useState** hook is a fundamental React hook that lets you add state to functional components.

## Basic Usage

```jsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

## Initial State

The argument passed to `useState` is the initial state value:

```jsx
// Primitive value
const [name, setName] = useState('John');

// Object
const [user, setUser] = useState({ name: 'John', age: 30 });

// Array
const [items, setItems] = useState([]);

// Lazy initialization
const [state, setState] = useState(() => {
  const initialState = someExpensiveComputation();
  return initialState;
});
```

## Updating State

### Replacing State

```jsx
const [count, setCount] = useState(0);

// Direct value
setCount(5);

// Using previous state
setCount(prevCount => prevCount + 1);
```

### Updating Objects

```jsx
const [user, setUser] = useState({ name: 'John', age: 30 });

// Spread operator to merge
setUser(prevUser => ({
  ...prevUser,
  age: 31
}));
```

### Updating Arrays

```jsx
const [items, setItems] = useState([]);

// Add item
setItems(prev => [...prev, newItem]);

// Remove item
setItems(prev => prev.filter(item => item.id !== id));

// Update item
setItems(prev => prev.map(item => 
  item.id === id ? { ...item, done: true } : item
));
```

## Common Patterns

### Form Handling

```jsx
function Form() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <form>
      <input
        name="email"
        value={formData.email}
        onChange={handleChange}
      />
      <input
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
      />
    </form>
  );
}
```

### Toggle State

```jsx
const [isOpen, setIsOpen] = useState(false);

const toggle = () => setIsOpen(prev => !prev);
```

## Rules and Best Practices

1. **Always call hooks at the top level** - Don't call hooks inside loops, conditions, or nested functions

2. **Use functional updates** when new state depends on previous state:

```jsx
// ❌ May cause issues with batching
setCount(count + 1);

// ✅ Always uses latest state
setCount(prev => prev + 1);
```

3. **State updates are asynchronous** - React batches state updates for performance

> **Tip:** If you need to use the updated state value immediately after calling setState, use the functional update form or useEffect.
