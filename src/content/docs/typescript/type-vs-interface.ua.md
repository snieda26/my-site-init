---
title: Різниця між type та interface в TypeScript
description: Дізнайтесь про відмінності між type та interface в TypeScript. Питання та відповіді на frontend співбесідах.
section: typescript
slug: type-vs-interface
prev: decorators
next: generic
---

В **TypeScript** є два способи опису типів: **type** та **interface**.

## Interface

- **interface** використовується для опису структури об'єктів та класів, а також для розширення інших інтерфейсів.

**Приклад використання interface**:

```typescript
interface Person {
  name: string;
  age: number;
}

interface Employee extends Person {
  position: string;
}

const employee: Employee = {
  name: "Іван",
  age: 30,
  position: "Розробник"
};
```

`interface` дозволяє використовувати ключове слово extends для розширення інших інтерфейсів. Це робить його зручним для роботи з об'єктно-орієнтованим підходом.

## Type

- **type** є більш універсальним і може використовуватися не тільки для об'єктів, але й для інших типів даних, таких як примітиви, об'єднання, перетини та інші.

**Приклад використання type**:

```typescript
type Person = {
  name: string;
  age: number;
};

type Employee = Person & {
  position: string;
};

const employee: Employee = {
  name: "Іван",
  age: 30,
  position: "Розробник"
};
```

## Коли використовувати interface або type?

- `interface` слід використовувати при роботі з об'єктами, особливо якщо вам потрібно розширити або модифікувати їх за допомогою extends або реалізувати в класах за допомогою implements.
- `type` слід використовувати, коли вам потрібно працювати з універсальними типами, такими як об'єднання, перетини, кортежі та примітиви.
