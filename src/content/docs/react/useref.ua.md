---
title: Хук useRef в React
description: Дізнайтесь про хук useRef в React. Як зберігати значення та отримувати доступ до DOM елементів.
section: react
slug: useref
prev: usestate
next: useeffect
---

Хук **useRef** - це вбудований хук React, який дозволяє зберігати значення між рендерами та отримувати прямий доступ до DOM елементів.

## Що таке useRef?

`useRef` повертає мутабельний ref об'єкт, властивість `.current` якого ініціалізується переданим аргументом. Повернутий об'єкт зберігатиметься протягом усього життєвого циклу компонента.

```jsx
import { useRef } from 'react';

function MyComponent() {
  const myRef = useRef(initialValue);
  // ...
}
```

## Доступ до DOM Елементів

Найпоширеніший варіант використання `useRef` - доступ до DOM елементів:

```jsx
import { useRef } from 'react';

function TextInputWithFocusButton() {
  const inputRef = useRef(null);

  const handleClick = () => {
    // Фокус на елемент input
    inputRef.current.focus();
  };

  return (
    <>
      <input ref={inputRef} type="text" />
      <button onClick={handleClick}>Фокус на input</button>
    </>
  );
}
```

## Зберігання Мутабельних Значень

На відміну від стану, оновлення ref не викликає повторний рендер:

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

  return <div>Перевірте консоль для лічильника</div>;
}
```

## useRef проти useState

| Функція | useRef | useState |
|---------|--------|----------|
| Викликає повторний рендер компонента | Ні | Так |
| Зберігає значення між рендерами | Так | Так |
| Повертає | Мутабельний об'єкт | Значення стану + сетер |
| Краще для | DOM refs, мутабельні значення | Стан UI |

## Поширені Патерни

### Патерн Попереднього Значення

```jsx
function usePrevious(value) {
  const ref = useRef();
  
  useEffect(() => {
    ref.current = value;
  }, [value]);
  
  return ref.current;
}

// Використання
function MyComponent({ count }) {
  const prevCount = usePrevious(count);
  
  return (
    <div>
      Поточне: {count}, Попереднє: {prevCount}
    </div>
  );
}
```

### Патерн Callback Ref

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
      <h1 ref={measuredRef}>Привіт, світ</h1>
      <h2>Заголовок вище має висоту {Math.round(height)}px</h2>
    </>
  );
}
```

> **Порада:** Пам'ятайте, що `useRef` не повідомляє вас, коли його вміст змінюється. Зміна властивості `.current` не викликає повторний рендер.
