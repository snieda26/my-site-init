---
title: Узагальнення (Generics) в TypeScript
description: Дізнайтесь про узагальнення в TypeScript. Як створювати повторно використовувані компоненти з безпекою типів.
section: typescript
slug: generic
prev: type-vs-interface
next: utility-types
---

**Узагальнення (Generics)** дозволяють створювати повторно використовувані компоненти, які працюють з різноманітними типами, а не лише з одним.

## Що таке Узагальнення?

Узагальнення надають спосіб змусити компоненти працювати з будь-якими типами даних, а не обмежувати їх одним типом даних. Це дозволяє користувачам використовувати ці компоненти та застосовувати власні типи.

```typescript
function identity<T>(arg: T): T {
  return arg;
}

// Використання
const output1 = identity<string>("мійРядок");
const output2 = identity<number>(100);
```

## Узагальнені Інтерфейси

Ви також можете створювати узагальнені інтерфейси:

```typescript
interface GenericIdentityFn<T> {
  (arg: T): T;
}

function identity<T>(arg: T): T {
  return arg;
}

const myIdentity: GenericIdentityFn<number> = identity;
```

## Узагальнені Класи

Класи також можуть бути узагальненими:

```typescript
class GenericNumber<T> {
  zeroValue: T;
  add: (x: T, y: T) => T;
}

const myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = (x, y) => x + y;
```

## Обмеження Узагальнень

Іноді ви хочете обмежити типи, які може приймати параметр типу:

```typescript
interface Lengthwise {
  length: number;
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
  console.log(arg.length);
  return arg;
}

// Працює
loggingIdentity({ length: 10, value: 3 });

// Помилка: number не має властивості .length
// loggingIdentity(3);
```

> **Порада:** Використовуйте узагальнення, коли ви хочете зберегти інформацію про типи під час створення повторно використовуваних компонентів.
