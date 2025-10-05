# Pouya's Flavored TypeScript

This is a modified TypeScript compiler with some interesting functionality

## Named Parameters

```ts
// Imagine you have this Foo
function foo(options: { x: number; y?: string }) {
  const { x, y = 2 } = options;
  console.log(x, y);
}

// Here you can call foo like this, much like
// Swift and Dart:
foo(x: 2, y: "hello");

// Which will compile to:
foo({x: 2, y: "hello"});
```

## Named Parameters

```ts
// Defining  named  parameters  is  also very
// tricky in TypeScript
function foo(options: { x: number; y?: string }) {
  const { x, y = 2 } = options;
  console.log(x, y);
}

// The same here can be done by prepending an
// at sign before the parameters:
function foo(@x: number? = 2, @y: string) {
    console.log(x, y);
}
```

## Clean Control Structures

```ts
// All  C  based  languages  follow  its ugly
// control structure system,  where  you  are
// forced  to  use  parenthesis  when writing
// the code:
if (x < y) {
  doSomething();
}

// Here the control structures don't need it:
if x < y {
  doSomething();
}

// This  is  also  true  for  the rest of the
// control structures:
for let i = 1; i < 10; i++ {

}

while x < y {

}

switch x {

}

// And  you  may  think  about the case where
// you have somewhat inline ifs:
if (x < y) doSomething();

// Well,  you no longer can do this! Which is
// really good:
if x < y { doSomething(); }
```
