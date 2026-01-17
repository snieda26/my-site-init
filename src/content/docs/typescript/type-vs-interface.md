---
title: Differences Between type and interface in TypeScript
description: Learn about differences between type and interface in typescript. Frontend interview questions and answers.
section: typescript
slug: type-vs-interface
prev: decorators
next: generic
---

In **TypeScript** there are two ways to describe types: **type** and **interface**.

## Interface

- **interface** is used to describe the structure of objects and classes, as well as to extend other interfaces.

**interface usage example**:

```typescript
interface Person {
  name: string;
  age: number;
}

interface Employee extends Person {
  position: string;
}

const employee: Employee = {
  name: "John",
  age: 30,
  position: "Developer"
};
```

`interface` allows using the extends keyword to extend other interfaces. This makes it convenient for working with object-oriented approach.

## Type

- **type** is more universal and can be used not only for objects, but also for other data types such as primitives, unions, intersections and others.

**type usage example**:

```typescript
type Person = {
  name: string;
  age: number;
};

type Employee = Person & {
  position: string;
};

const employee: Employee = {
  name: "John",
  age: 30,
  position: "Developer"
};
```

## When to use interface or type?

- `interface` should be used when working with objects, especially if you need to extend or modify them using extends or implement in classes using implements.
- `type` should be used when you need to work with universal types such as unions, intersections, tuples and primitives.
