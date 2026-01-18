---
title: Хук useState в React
description: Дізнайтесь про хук useState в React. Як керувати станом у функціональних компонентах.
section: react
slug: usestate
prev: virtual-dom
next: useref
---

Хук **useState** - це фундаментальний хук React, який дозволяє додавати стан до функціональних компонентів.

## Базове Використання

```jsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Ви натиснули {count} разів</p>
      <button onClick={() => setCount(count + 1)}>
        Натисни мене
      </button>
    </div>
  );
}
```

## Початковий Стан

Аргумент, переданий до `useState`, є початковим значенням стану:

```jsx
// Примітивне значення
const [name, setName] = useState('Іван');

// Об'єкт
const [user, setUser] = useState({ name: 'Іван', age: 30 });

// Масив
const [items, setItems] = useState([]);

// Ледаче ініціалізація
const [state, setState] = useState(() => {
  const initialState = someExpensiveComputation();
  return initialState;
});
```

## Оновлення Стану

### Заміна Стану

```jsx
const [count, setCount] = useState(0);

// Пряме значення
setCount(5);

// Використання попереднього стану
setCount(prevCount => prevCount + 1);
```

### Оновлення Об'єктів

```jsx
const [user, setUser] = useState({ name: 'Іван', age: 30 });

// Оператор розширення для об'єднання
setUser(prevUser => ({
  ...prevUser,
  age: 31
}));
```

### Оновлення Масивів

```jsx
const [items, setItems] = useState([]);

// Додати елемент
setItems(prev => [...prev, newItem]);

// Видалити елемент
setItems(prev => prev.filter(item => item.id !== id));

// Оновити елемент
setItems(prev => prev.map(item => 
  item.id === id ? { ...item, done: true } : item
));
```

## Поширені Патерни

### Обробка Форм

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

### Перемикання Стану

```jsx
const [isOpen, setIsOpen] = useState(false);

const toggle = () => setIsOpen(prev => !prev);
```

## Правила та Найкращі Практики

1. **Завжди викликайте хуки на верхньому рівні** - Не викликайте хуки всередині циклів, умов або вкладених функцій

2. **Використовуйте функціональні оновлення**, коли новий стан залежить від попереднього стану:

```jsx
// ❌ Може викликати проблеми з пакетуванням
setCount(count + 1);

// ✅ Завжди використовує останній стан
setCount(prev => prev + 1);
```

3. **Оновлення стану асинхронні** - React пакує оновлення стану для продуктивності

> **Порада:** Якщо вам потрібно використовувати оновлене значення стану відразу після виклику setState, використовуйте форму функціонального оновлення або useEffect.
