---
title: Generics in TypeScript
description: Learn about generics in TypeScript. How to create reusable components with type safety.
section: typescript
slug: generic
prev: type-vs-interface
next: utility-types
---

**Generics** allow you to create reusable components that work with a variety of types rather than a single one.

## What are Generics?

Generics provide a way to make components work with any data type and not restrict to one data type. This allows users to consume these components and use their own types.

```typescript
function identity<T>(arg: T): T {
  return arg;
}

// Usage
const output1 = identity<string>("myString");
const output2 = identity<number>(100);
```

## Generic Interfaces

You can also create generic interfaces:

```typescript
interface GenericIdentityFn<T> {
  (arg: T): T;
}

function identity<T>(arg: T): T {
  return arg;
}

const myIdentity: GenericIdentityFn<number> = identity;
```

## Generic Classes

Classes can also be generic:

```typescript
class GenericNumber<T> {
  zeroValue: T;
  add: (x: T, y: T) => T;
}

const myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = (x, y) => x + y;
```

## Generic Constraints

Sometimes you want to limit the kinds of types that a type parameter can accept:

```typescript
interface Lengthwise {
  length: number;
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
  console.log(arg.length);
  return arg;
}

// Works
loggingIdentity({ length: 10, value: 3 });

// Error: number doesn't have a .length property
// loggingIdentity(3);
```

> **Tip:** Use generics when you want to preserve type information while creating reusable components.
