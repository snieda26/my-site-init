---
title: Декоратори в TypeScript
description: Дізнайтесь про декоратори в TypeScript. Як використовувати декоратори класів, методів, властивостей та параметрів.
section: typescript
slug: decorators
prev: null
next: type-vs-interface
---

**Декоратори** надають спосіб додавання анотацій та синтаксису метапрограмування для оголошень класів та їх членів.

## Що таке Декоратори?

Декоратор - це особливий вид оголошення, який може бути прикріплений до оголошення класу, методу, аксесора, властивості або параметра. Декоратори використовують форму `@expression`, де expression повинен бути функцією.

## Декоратори Класів

Декоратор Класу оголошується безпосередньо перед оголошенням класу:

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

## Декоратори Методів

Декоратор Методу оголошується безпосередньо перед оголошенням методу:

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
    return "Привіт, " + this.greeting;
  }
}
```

## Декоратори Властивостей

Декоратор Властивості оголошується безпосередньо перед оголошенням властивості:

```typescript
function format(formatString: string) {
  return function (target: any, propertyKey: string) {
    // зберігаємо метадані формату
  };
}

class Greeter {
  @format("Привіт, %s")
  greeting: string;
  
  constructor(message: string) {
    this.greeting = message;
  }
}
```

## Фабрики Декораторів

Фабрика декораторів - це просто функція, яка повертає вираз, який буде викликаний декоратором під час виконання:

```typescript
function color(value: string) {
  // це фабрика декораторів, вона налаштовує
  // повернуту функцію декоратора
  return function (target: any) {
    // це декоратор
    // робимо щось з 'target' та 'value'...
  };
}

@color("синій")
class Car {}
```

> **Порада:** Щоб увімкнути експериментальну підтримку декораторів, ви повинні увімкнути опцію компілятора `experimentalDecorators` у вашому `tsconfig.json`.
