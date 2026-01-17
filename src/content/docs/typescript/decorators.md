---
title: Decorators in TypeScript
description: Learn about decorators in TypeScript. How to use class, method, property and parameter decorators.
section: typescript
slug: decorators
prev: null
next: type-vs-interface
---

**Decorators** provide a way to add both annotations and a meta-programming syntax for class declarations and members.

## What are Decorators?

A Decorator is a special kind of declaration that can be attached to a class declaration, method, accessor, property, or parameter. Decorators use the form `@expression`, where expression must evaluate to a function.

## Class Decorators

A Class Decorator is declared just before a class declaration:

```typescript
function sealed(constructor: Function) {
  Object.seal(constructor);
  Object.seal(constructor.prototype);
}

@sealed
class BugReport {
  type = "report";
  title: string;
  
  constructor(t: string) {
    this.title = t;
  }
}
```

## Method Decorators

A Method Decorator is declared just before a method declaration:

```typescript
function enumerable(value: boolean) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    descriptor.enumerable = value;
  };
}

class Greeter {
  greeting: string;
  
  constructor(message: string) {
    this.greeting = message;
  }
  
  @enumerable(false)
  greet() {
    return "Hello, " + this.greeting;
  }
}
```

## Property Decorators

A Property Decorator is declared just before a property declaration:

```typescript
function format(formatString: string) {
  return function (target: any, propertyKey: string) {
    // store format metadata
  };
}

class Greeter {
  @format("Hello, %s")
  greeting: string;
  
  constructor(message: string) {
    this.greeting = message;
  }
}
```

## Decorator Factories

A Decorator Factory is simply a function that returns the expression that will be called by the decorator at runtime:

```typescript
function color(value: string) {
  // this is the decorator factory, it sets up
  // the returned decorator function
  return function (target: any) {
    // this is the decorator
    // do something with 'target' and 'value'...
  };
}

@color("blue")
class Car {}
```

> **Tip:** To enable experimental support for decorators, you must enable the `experimentalDecorators` compiler option in your `tsconfig.json`.
