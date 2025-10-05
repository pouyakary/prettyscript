# Pouya's Flavored TypeScript

This is a modified TypeScript compiler with some interesting functionality

## Named Parameters and Arguments

```ts
// Defining and calling named parameters becomes effortless.
function foo(@x: number? = 2, @y: string) {
  console.log(x, y);
}

// Invoke the function with labeled arguments, Swift/Dart style.
foo(x: 2, y: "hello");

// The compiler desugars this into standard TypeScript.
function foo(options: { x?: number; y: string }) {
  const { x = 2, y } = options;
  console.log(x, y);
}

foo({ x: 2, y: "hello" });
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
