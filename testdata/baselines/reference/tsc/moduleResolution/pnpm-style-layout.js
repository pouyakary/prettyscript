currentDirectory::/home/src/projects/component-type-checker/packages/app
useCaseSensitiveFileNames::true
Input::
//// [/home/src/projects/component-type-checker/node_modules/.pnpm/@component-type-checker+button@0.0.1/node_modules/@component-type-checker/button/package.json] *new* 
{
    "name": "@component-type-checker/button",
    "version": "0.0.1",
    "main": "./src/index.ts"
}
//// [/home/src/projects/component-type-checker/node_modules/.pnpm/@component-type-checker+button@0.0.1/node_modules/@component-type-checker/button/src/index.ts] *new* 
export interface Button {
    a: number;
    b: number;
}
export function createButton(): Button {
    return {
        a: 0,
        b: 1,
    };
}
//// [/home/src/projects/component-type-checker/node_modules/.pnpm/@component-type-checker+button@0.0.2/node_modules/@component-type-checker/button/package.json] *new* 
{
    "name": "@component-type-checker/button",
    "version": "0.0.2",
    "main": "./src/index.ts"
}
//// [/home/src/projects/component-type-checker/node_modules/.pnpm/@component-type-checker+button@0.0.2/node_modules/@component-type-checker/button/src/index.ts] *new* 
export interface Button {
    a: number;
    c: number;
}
export function createButton(): Button {
    return {
        a: 0,
        c: 2,
    };
}
//// [/home/src/projects/component-type-checker/node_modules/.pnpm/@component-type-checker+components@0.0.1_@component-type-checker+button@0.0.1/node_modules/@component-type-checker/button] -> /home/src/projects/component-type-checker/node_modules/.pnpm/@component-type-checker+button@0.0.1/node_modules/@component-type-checker/button *new*
//// [/home/src/projects/component-type-checker/node_modules/.pnpm/@component-type-checker+components@0.0.1_@component-type-checker+button@0.0.1/node_modules/@component-type-checker/components/package.json] *new* 
{
    "name": "@component-type-checker/components",
    "version": "0.0.1",
    "main": "./src/index.ts",
    "peerDependencies": {
        "@component-type-checker/button": "*"
    },
    "devDependencies": {
        "@component-type-checker/button": "0.0.2"
    }
}
//// [/home/src/projects/component-type-checker/node_modules/.pnpm/@component-type-checker+components@0.0.1_@component-type-checker+button@0.0.1/node_modules/@component-type-checker/components/src/index.ts] *new* 
export { createButton, Button } from "@component-type-checker/button";
//// [/home/src/projects/component-type-checker/node_modules/.pnpm/@component-type-checker+components@0.0.1_@component-type-checker+button@0.0.2/node_modules/@component-type-checker/button] -> /home/src/projects/component-type-checker/node_modules/.pnpm/@component-type-checker+button@0.0.2/node_modules/@component-type-checker/button *new*
//// [/home/src/projects/component-type-checker/node_modules/.pnpm/@component-type-checker+components@0.0.1_@component-type-checker+button@0.0.2/node_modules/@component-type-checker/components/package.json] *new* 
{
    "name": "@component-type-checker/components",
    "version": "0.0.1",
    "main": "./src/index.ts",
    "peerDependencies": {
        "@component-type-checker/button": "*"
    },
    "devDependencies": {
        "@component-type-checker/button": "0.0.2"
    }
}
//// [/home/src/projects/component-type-checker/node_modules/.pnpm/@component-type-checker+components@0.0.1_@component-type-checker+button@0.0.2/node_modules/@component-type-checker/components/src/index.ts] *new* 
export { createButton, Button } from "@component-type-checker/button";
//// [/home/src/projects/component-type-checker/packages/app/node_modules/@component-type-checker/button] -> /home/src/projects/component-type-checker/node_modules/.pnpm/@component-type-checker+button@0.0.2/node_modules/@component-type-checker/button *new*
//// [/home/src/projects/component-type-checker/packages/app/node_modules/@component-type-checker/components] -> /home/src/projects/component-type-checker/node_modules/.pnpm/@component-type-checker+components@0.0.1_@component-type-checker+button@0.0.2/node_modules/@component-type-checker/components *new*
//// [/home/src/projects/component-type-checker/packages/app/node_modules/@component-type-checker/sdk] -> /home/src/projects/component-type-checker/packages/sdk *new*
//// [/home/src/projects/component-type-checker/packages/app/package.json] *new* 
{
    "name": "app",
    "version": "1.0.0",
    "dependencies": {
        "@component-type-checker/button": "0.0.2",
        "@component-type-checker/components": "0.0.1",
        "@component-type-checker/sdk": "0.0.2"
    }
}
//// [/home/src/projects/component-type-checker/packages/app/src/app.tsx] *new* 
import { VERSION } from "@component-type-checker/sdk";
import { Button } from "@component-type-checker/components";
import { createButton } from "@component-type-checker/button";
const button: Button = createButton();
//// [/home/src/projects/component-type-checker/packages/app/tsconfig.json] *new* 
{
    "compilerOptions": {
        "target": "es5",
        "module": "esnext",
        "lib": ["ES5"],
        "moduleResolution": "node",
        "outDir": "dist",
    },
    "include": ["src"],
}
//// [/home/src/projects/component-type-checker/packages/sdk/node_modules/@component-type-checker/button] -> /home/src/projects/component-type-checker/node_modules/.pnpm/@component-type-checker+button@0.0.1/node_modules/@component-type-checker/button *new*
//// [/home/src/projects/component-type-checker/packages/sdk/node_modules/@component-type-checker/components] -> /home/src/projects/component-type-checker/node_modules/.pnpm/@component-type-checker+components@0.0.1_@component-type-checker+button@0.0.1/node_modules/@component-type-checker/components *new*
//// [/home/src/projects/component-type-checker/packages/sdk/package.json] *new* 
{
    "name": "@component-type-checker/sdk1",
    "version": "0.0.2",
    "main": "./src/index.ts",
    "dependencies": {
        "@component-type-checker/components": "0.0.1",
        "@component-type-checker/button": "0.0.1"
    }
}
//// [/home/src/projects/component-type-checker/packages/sdk/src/index.ts] *new* 
export { Button, createButton } from "@component-type-checker/components";
export const VERSION = "0.0.2";

tsgo --traceResolution --explainFiles
ExitStatus:: Success
Output::
======== Resolving module '@component-type-checker/sdk' from '/home/src/projects/component-type-checker/packages/app/src/app.tsx'. ========
Explicitly specified module resolution kind: 'Bundler'.
Resolving in CJS mode with conditions 'import', 'types'.
File '/home/src/projects/component-type-checker/packages/app/src/package.json' does not exist.
Found 'package.json' at '/home/src/projects/component-type-checker/packages/app/package.json'.
Loading module '@component-type-checker/sdk' from 'node_modules' folder, target file types: TypeScript, JavaScript, Declaration, JSON.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Directory '/home/src/projects/component-type-checker/packages/app/src/node_modules' does not exist, skipping all lookups in it.
Directory '/home/src/projects/component-type-checker/packages/app/src/node_modules/@types' does not exist, skipping all lookups in it.
Scoped package detected, looking in 'component-type-checker__sdk'
Found 'package.json' at '/home/src/projects/component-type-checker/packages/app/node_modules/@component-type-checker/sdk/package.json'.
File '/home/src/projects/component-type-checker/packages/app/node_modules/@component-type-checker/sdk.ts' does not exist.
File '/home/src/projects/component-type-checker/packages/app/node_modules/@component-type-checker/sdk.tsx' does not exist.
File '/home/src/projects/component-type-checker/packages/app/node_modules/@component-type-checker/sdk.d.ts' does not exist.
'package.json' does not have a 'typesVersions' field.
'package.json' does not have a 'typings' field.
'package.json' does not have a 'types' field.
'package.json' has 'main' field './src/index.ts' that references '/home/src/projects/component-type-checker/packages/app/node_modules/@component-type-checker/sdk/src/index.ts'.
File '/home/src/projects/component-type-checker/packages/app/node_modules/@component-type-checker/sdk/src/index.ts' exists - use it as a name resolution result.
'package.json' does not have a 'peerDependencies' field.
Resolving real path for '/home/src/projects/component-type-checker/packages/app/node_modules/@component-type-checker/sdk/src/index.ts', result '/home/src/projects/component-type-checker/packages/sdk/src/index.ts'.
======== Module name '@component-type-checker/sdk' was successfully resolved to '/home/src/projects/component-type-checker/packages/sdk/src/index.ts' with Package ID '@component-type-checker/sdk1@0.0.2'. ========
======== Resolving module '@component-type-checker/components' from '/home/src/projects/component-type-checker/packages/app/src/app.tsx'. ========
Explicitly specified module resolution kind: 'Bundler'.
Resolving in CJS mode with conditions 'import', 'types'.
File '/home/src/projects/component-type-checker/packages/app/src/package.json' does not exist according to earlier cached lookups.
File '/home/src/projects/component-type-checker/packages/app/package.json' exists according to earlier cached lookups.
Loading module '@component-type-checker/components' from 'node_modules' folder, target file types: TypeScript, JavaScript, Declaration, JSON.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Directory '/home/src/projects/component-type-checker/packages/app/src/node_modules' does not exist, skipping all lookups in it.
Directory '/home/src/projects/component-type-checker/packages/app/src/node_modules/@types' does not exist, skipping all lookups in it.
Scoped package detected, looking in 'component-type-checker__components'
Found 'package.json' at '/home/src/projects/component-type-checker/packages/app/node_modules/@component-type-checker/components/package.json'.
File '/home/src/projects/component-type-checker/packages/app/node_modules/@component-type-checker/components.ts' does not exist.
File '/home/src/projects/component-type-checker/packages/app/node_modules/@component-type-checker/components.tsx' does not exist.
File '/home/src/projects/component-type-checker/packages/app/node_modules/@component-type-checker/components.d.ts' does not exist.
'package.json' does not have a 'typesVersions' field.
'package.json' does not have a 'typings' field.
'package.json' does not have a 'types' field.
'package.json' has 'main' field './src/index.ts' that references '/home/src/projects/component-type-checker/packages/app/node_modules/@component-type-checker/components/src/index.ts'.
File '/home/src/projects/component-type-checker/packages/app/node_modules/@component-type-checker/components/src/index.ts' exists - use it as a name resolution result.
'package.json' has a 'peerDependencies' field.
Resolving real path for '/home/src/projects/component-type-checker/packages/app/node_modules/@component-type-checker/components', result '/home/src/projects/component-type-checker/node_modules/.pnpm/@component-type-checker+components@0.0.1_@component-type-checker+button@0.0.2/node_modules/@component-type-checker/components'.
Found 'package.json' at '/home/src/projects/component-type-checker/node_modules/.pnpm/@component-type-checker+components@0.0.1_@component-type-checker+button@0.0.2/node_modules/@component-type-checker/button/package.json'.
Found peerDependency '@component-type-checker/button' with '0.0.2' version.
Resolving real path for '/home/src/projects/component-type-checker/packages/app/node_modules/@component-type-checker/components/src/index.ts', result '/home/src/projects/component-type-checker/node_modules/.pnpm/@component-type-checker+components@0.0.1_@component-type-checker+button@0.0.2/node_modules/@component-type-checker/components/src/index.ts'.
======== Module name '@component-type-checker/components' was successfully resolved to '/home/src/projects/component-type-checker/node_modules/.pnpm/@component-type-checker+components@0.0.1_@component-type-checker+button@0.0.2/node_modules/@component-type-checker/components/src/index.ts' with Package ID '@component-type-checker/components@0.0.1+@component-type-checker/button@0.0.2'. ========
======== Resolving module '@component-type-checker/button' from '/home/src/projects/component-type-checker/packages/app/src/app.tsx'. ========
Explicitly specified module resolution kind: 'Bundler'.
Resolving in CJS mode with conditions 'import', 'types'.
File '/home/src/projects/component-type-checker/packages/app/src/package.json' does not exist according to earlier cached lookups.
File '/home/src/projects/component-type-checker/packages/app/package.json' exists according to earlier cached lookups.
Loading module '@component-type-checker/button' from 'node_modules' folder, target file types: TypeScript, JavaScript, Declaration, JSON.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Directory '/home/src/projects/component-type-checker/packages/app/src/node_modules' does not exist, skipping all lookups in it.
Directory '/home/src/projects/component-type-checker/packages/app/src/node_modules/@types' does not exist, skipping all lookups in it.
Scoped package detected, looking in 'component-type-checker__button'
Found 'package.json' at '/home/src/projects/component-type-checker/packages/app/node_modules/@component-type-checker/button/package.json'.
File '/home/src/projects/component-type-checker/packages/app/node_modules/@component-type-checker/button.ts' does not exist.
File '/home/src/projects/component-type-checker/packages/app/node_modules/@component-type-checker/button.tsx' does not exist.
File '/home/src/projects/component-type-checker/packages/app/node_modules/@component-type-checker/button.d.ts' does not exist.
'package.json' does not have a 'typesVersions' field.
'package.json' does not have a 'typings' field.
'package.json' does not have a 'types' field.
'package.json' has 'main' field './src/index.ts' that references '/home/src/projects/component-type-checker/packages/app/node_modules/@component-type-checker/button/src/index.ts'.
File '/home/src/projects/component-type-checker/packages/app/node_modules/@component-type-checker/button/src/index.ts' exists - use it as a name resolution result.
'package.json' does not have a 'peerDependencies' field.
Resolving real path for '/home/src/projects/component-type-checker/packages/app/node_modules/@component-type-checker/button/src/index.ts', result '/home/src/projects/component-type-checker/node_modules/.pnpm/@component-type-checker+button@0.0.2/node_modules/@component-type-checker/button/src/index.ts'.
======== Module name '@component-type-checker/button' was successfully resolved to '/home/src/projects/component-type-checker/node_modules/.pnpm/@component-type-checker+button@0.0.2/node_modules/@component-type-checker/button/src/index.ts' with Package ID '@component-type-checker/button@0.0.2'. ========
======== Resolving module '@component-type-checker/components' from '/home/src/projects/component-type-checker/packages/sdk/src/index.ts'. ========
Explicitly specified module resolution kind: 'Bundler'.
Resolving in CJS mode with conditions 'import', 'types'.
File '/home/src/projects/component-type-checker/packages/sdk/src/package.json' does not exist.
Found 'package.json' at '/home/src/projects/component-type-checker/packages/sdk/package.json'.
Loading module '@component-type-checker/components' from 'node_modules' folder, target file types: TypeScript, JavaScript, Declaration, JSON.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Directory '/home/src/projects/component-type-checker/packages/sdk/src/node_modules' does not exist, skipping all lookups in it.
Directory '/home/src/projects/component-type-checker/packages/sdk/src/node_modules/@types' does not exist, skipping all lookups in it.
Scoped package detected, looking in 'component-type-checker__components'
Found 'package.json' at '/home/src/projects/component-type-checker/packages/sdk/node_modules/@component-type-checker/components/package.json'.
File '/home/src/projects/component-type-checker/packages/sdk/node_modules/@component-type-checker/components.ts' does not exist.
File '/home/src/projects/component-type-checker/packages/sdk/node_modules/@component-type-checker/components.tsx' does not exist.
File '/home/src/projects/component-type-checker/packages/sdk/node_modules/@component-type-checker/components.d.ts' does not exist.
'package.json' does not have a 'typesVersions' field.
'package.json' does not have a 'typings' field.
'package.json' does not have a 'types' field.
'package.json' has 'main' field './src/index.ts' that references '/home/src/projects/component-type-checker/packages/sdk/node_modules/@component-type-checker/components/src/index.ts'.
File '/home/src/projects/component-type-checker/packages/sdk/node_modules/@component-type-checker/components/src/index.ts' exists - use it as a name resolution result.
'package.json' has a 'peerDependencies' field.
Resolving real path for '/home/src/projects/component-type-checker/packages/sdk/node_modules/@component-type-checker/components', result '/home/src/projects/component-type-checker/node_modules/.pnpm/@component-type-checker+components@0.0.1_@component-type-checker+button@0.0.1/node_modules/@component-type-checker/components'.
Found 'package.json' at '/home/src/projects/component-type-checker/node_modules/.pnpm/@component-type-checker+components@0.0.1_@component-type-checker+button@0.0.1/node_modules/@component-type-checker/button/package.json'.
Found peerDependency '@component-type-checker/button' with '0.0.1' version.
Resolving real path for '/home/src/projects/component-type-checker/packages/sdk/node_modules/@component-type-checker/components/src/index.ts', result '/home/src/projects/component-type-checker/node_modules/.pnpm/@component-type-checker+components@0.0.1_@component-type-checker+button@0.0.1/node_modules/@component-type-checker/components/src/index.ts'.
======== Module name '@component-type-checker/components' was successfully resolved to '/home/src/projects/component-type-checker/node_modules/.pnpm/@component-type-checker+components@0.0.1_@component-type-checker+button@0.0.1/node_modules/@component-type-checker/components/src/index.ts' with Package ID '@component-type-checker/components@0.0.1+@component-type-checker/button@0.0.1'. ========
======== Resolving module '@component-type-checker/button' from '/home/src/projects/component-type-checker/node_modules/.pnpm/@component-type-checker+components@0.0.1_@component-type-checker+button@0.0.1/node_modules/@component-type-checker/components/src/index.ts'. ========
Explicitly specified module resolution kind: 'Bundler'.
Resolving in CJS mode with conditions 'import', 'types'.
File '/home/src/projects/component-type-checker/node_modules/.pnpm/@component-type-checker+components@0.0.1_@component-type-checker+button@0.0.1/node_modules/@component-type-checker/components/src/package.json' does not exist.
Found 'package.json' at '/home/src/projects/component-type-checker/node_modules/.pnpm/@component-type-checker+components@0.0.1_@component-type-checker+button@0.0.1/node_modules/@component-type-checker/components/package.json'.
Loading module '@component-type-checker/button' from 'node_modules' folder, target file types: TypeScript, JavaScript, Declaration, JSON.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Directory '/home/src/projects/component-type-checker/node_modules/.pnpm/@component-type-checker+components@0.0.1_@component-type-checker+button@0.0.1/node_modules/@component-type-checker/components/src/node_modules' does not exist, skipping all lookups in it.
Directory '/home/src/projects/component-type-checker/node_modules/.pnpm/@component-type-checker+components@0.0.1_@component-type-checker+button@0.0.1/node_modules/@component-type-checker/components/src/node_modules/@types' does not exist, skipping all lookups in it.
Scoped package detected, looking in 'component-type-checker__button'
Directory '/home/src/projects/component-type-checker/node_modules/.pnpm/@component-type-checker+components@0.0.1_@component-type-checker+button@0.0.1/node_modules/@component-type-checker/components/node_modules' does not exist, skipping all lookups in it.
Directory '/home/src/projects/component-type-checker/node_modules/.pnpm/@component-type-checker+components@0.0.1_@component-type-checker+button@0.0.1/node_modules/@component-type-checker/components/node_modules/@types' does not exist, skipping all lookups in it.
Scoped package detected, looking in 'component-type-checker__button'
Directory '/home/src/projects/component-type-checker/node_modules/.pnpm/@component-type-checker+components@0.0.1_@component-type-checker+button@0.0.1/node_modules/@component-type-checker/node_modules' does not exist, skipping all lookups in it.
Directory '/home/src/projects/component-type-checker/node_modules/.pnpm/@component-type-checker+components@0.0.1_@component-type-checker+button@0.0.1/node_modules/@component-type-checker/node_modules/@types' does not exist, skipping all lookups in it.
Scoped package detected, looking in 'component-type-checker__button'
File '/home/src/projects/component-type-checker/node_modules/.pnpm/@component-type-checker+components@0.0.1_@component-type-checker+button@0.0.1/node_modules/@component-type-checker/button/package.json' exists according to earlier cached lookups.
File '/home/src/projects/component-type-checker/node_modules/.pnpm/@component-type-checker+components@0.0.1_@component-type-checker+button@0.0.1/node_modules/@component-type-checker/button.ts' does not exist.
File '/home/src/projects/component-type-checker/node_modules/.pnpm/@component-type-checker+components@0.0.1_@component-type-checker+button@0.0.1/node_modules/@component-type-checker/button.tsx' does not exist.
File '/home/src/projects/component-type-checker/node_modules/.pnpm/@component-type-checker+components@0.0.1_@component-type-checker+button@0.0.1/node_modules/@component-type-checker/button.d.ts' does not exist.
'package.json' does not have a 'typesVersions' field.
'package.json' does not have a 'typings' field.
'package.json' does not have a 'types' field.
'package.json' has 'main' field './src/index.ts' that references '/home/src/projects/component-type-checker/node_modules/.pnpm/@component-type-checker+components@0.0.1_@component-type-checker+button@0.0.1/node_modules/@component-type-checker/button/src/index.ts'.
File '/home/src/projects/component-type-checker/node_modules/.pnpm/@component-type-checker+components@0.0.1_@component-type-checker+button@0.0.1/node_modules/@component-type-checker/button/src/index.ts' exists - use it as a name resolution result.
'package.json' does not have a 'peerDependencies' field.
Resolving real path for '/home/src/projects/component-type-checker/node_modules/.pnpm/@component-type-checker+components@0.0.1_@component-type-checker+button@0.0.1/node_modules/@component-type-checker/button/src/index.ts', result '/home/src/projects/component-type-checker/node_modules/.pnpm/@component-type-checker+button@0.0.1/node_modules/@component-type-checker/button/src/index.ts'.
======== Module name '@component-type-checker/button' was successfully resolved to '/home/src/projects/component-type-checker/node_modules/.pnpm/@component-type-checker+button@0.0.1/node_modules/@component-type-checker/button/src/index.ts' with Package ID '@component-type-checker/button@0.0.1'. ========
======== Resolving module '@component-type-checker/button' from '/home/src/projects/component-type-checker/node_modules/.pnpm/@component-type-checker+components@0.0.1_@component-type-checker+button@0.0.2/node_modules/@component-type-checker/components/src/index.ts'. ========
Explicitly specified module resolution kind: 'Bundler'.
Resolving in CJS mode with conditions 'import', 'types'.
File '/home/src/projects/component-type-checker/node_modules/.pnpm/@component-type-checker+components@0.0.1_@component-type-checker+button@0.0.2/node_modules/@component-type-checker/components/src/package.json' does not exist.
Found 'package.json' at '/home/src/projects/component-type-checker/node_modules/.pnpm/@component-type-checker+components@0.0.1_@component-type-checker+button@0.0.2/node_modules/@component-type-checker/components/package.json'.
Loading module '@component-type-checker/button' from 'node_modules' folder, target file types: TypeScript, JavaScript, Declaration, JSON.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Directory '/home/src/projects/component-type-checker/node_modules/.pnpm/@component-type-checker+components@0.0.1_@component-type-checker+button@0.0.2/node_modules/@component-type-checker/components/src/node_modules' does not exist, skipping all lookups in it.
Directory '/home/src/projects/component-type-checker/node_modules/.pnpm/@component-type-checker+components@0.0.1_@component-type-checker+button@0.0.2/node_modules/@component-type-checker/components/src/node_modules/@types' does not exist, skipping all lookups in it.
Scoped package detected, looking in 'component-type-checker__button'
Directory '/home/src/projects/component-type-checker/node_modules/.pnpm/@component-type-checker+components@0.0.1_@component-type-checker+button@0.0.2/node_modules/@component-type-checker/components/node_modules' does not exist, skipping all lookups in it.
Directory '/home/src/projects/component-type-checker/node_modules/.pnpm/@component-type-checker+components@0.0.1_@component-type-checker+button@0.0.2/node_modules/@component-type-checker/components/node_modules/@types' does not exist, skipping all lookups in it.
Scoped package detected, looking in 'component-type-checker__button'
Directory '/home/src/projects/component-type-checker/node_modules/.pnpm/@component-type-checker+components@0.0.1_@component-type-checker+button@0.0.2/node_modules/@component-type-checker/node_modules' does not exist, skipping all lookups in it.
Directory '/home/src/projects/component-type-checker/node_modules/.pnpm/@component-type-checker+components@0.0.1_@component-type-checker+button@0.0.2/node_modules/@component-type-checker/node_modules/@types' does not exist, skipping all lookups in it.
Scoped package detected, looking in 'component-type-checker__button'
File '/home/src/projects/component-type-checker/node_modules/.pnpm/@component-type-checker+components@0.0.1_@component-type-checker+button@0.0.2/node_modules/@component-type-checker/button/package.json' exists according to earlier cached lookups.
File '/home/src/projects/component-type-checker/node_modules/.pnpm/@component-type-checker+components@0.0.1_@component-type-checker+button@0.0.2/node_modules/@component-type-checker/button.ts' does not exist.
File '/home/src/projects/component-type-checker/node_modules/.pnpm/@component-type-checker+components@0.0.1_@component-type-checker+button@0.0.2/node_modules/@component-type-checker/button.tsx' does not exist.
File '/home/src/projects/component-type-checker/node_modules/.pnpm/@component-type-checker+components@0.0.1_@component-type-checker+button@0.0.2/node_modules/@component-type-checker/button.d.ts' does not exist.
'package.json' does not have a 'typesVersions' field.
'package.json' does not have a 'typings' field.
'package.json' does not have a 'types' field.
'package.json' has 'main' field './src/index.ts' that references '/home/src/projects/component-type-checker/node_modules/.pnpm/@component-type-checker+components@0.0.1_@component-type-checker+button@0.0.2/node_modules/@component-type-checker/button/src/index.ts'.
File '/home/src/projects/component-type-checker/node_modules/.pnpm/@component-type-checker+components@0.0.1_@component-type-checker+button@0.0.2/node_modules/@component-type-checker/button/src/index.ts' exists - use it as a name resolution result.
'package.json' does not have a 'peerDependencies' field.
Resolving real path for '/home/src/projects/component-type-checker/node_modules/.pnpm/@component-type-checker+components@0.0.1_@component-type-checker+button@0.0.2/node_modules/@component-type-checker/button/src/index.ts', result '/home/src/projects/component-type-checker/node_modules/.pnpm/@component-type-checker+button@0.0.2/node_modules/@component-type-checker/button/src/index.ts'.
======== Module name '@component-type-checker/button' was successfully resolved to '/home/src/projects/component-type-checker/node_modules/.pnpm/@component-type-checker+button@0.0.2/node_modules/@component-type-checker/button/src/index.ts' with Package ID '@component-type-checker/button@0.0.2'. ========
../../../../tslibs/TS/Lib/lib.es5.d.ts
   Library 'lib.es5.d.ts' specified in compilerOptions
../../node_modules/.pnpm/@component-type-checker+button@0.0.1/node_modules/@component-type-checker/button/src/index.ts
   Imported via "@component-type-checker/button" from file '../../node_modules/.pnpm/@component-type-checker+components@0.0.1_@component-type-checker+button@0.0.1/node_modules/@component-type-checker/components/src/index.ts' with packageId '@component-type-checker/button@0.0.1'
../../node_modules/.pnpm/@component-type-checker+components@0.0.1_@component-type-checker+button@0.0.1/node_modules/@component-type-checker/components/src/index.ts
   Imported via "@component-type-checker/components" from file '../sdk/src/index.ts' with packageId '@component-type-checker/components@0.0.1+@component-type-checker/button@0.0.1'
../sdk/src/index.ts
   Imported via "@component-type-checker/sdk" from file 'src/app.tsx' with packageId '@component-type-checker/sdk1@0.0.2'
../../node_modules/.pnpm/@component-type-checker+button@0.0.2/node_modules/@component-type-checker/button/src/index.ts
   Imported via "@component-type-checker/button" from file '../../node_modules/.pnpm/@component-type-checker+components@0.0.1_@component-type-checker+button@0.0.2/node_modules/@component-type-checker/components/src/index.ts' with packageId '@component-type-checker/button@0.0.2'
   Imported via "@component-type-checker/button" from file 'src/app.tsx' with packageId '@component-type-checker/button@0.0.2'
../../node_modules/.pnpm/@component-type-checker+components@0.0.1_@component-type-checker+button@0.0.2/node_modules/@component-type-checker/components/src/index.ts
   Imported via "@component-type-checker/components" from file 'src/app.tsx' with packageId '@component-type-checker/components@0.0.1+@component-type-checker/button@0.0.2'
src/app.tsx
   Matched by include pattern 'src' in 'tsconfig.json'
//// [/home/src/projects/component-type-checker/packages/app/dist/app.js] *new* 
import { createButton } from "@component-type-checker/button";
const button = createButton();

//// [/home/src/tslibs/TS/Lib/lib.es5.d.ts] *Lib*
/// <reference no-default-lib="true"/>
interface Boolean {}
interface Function {}
interface CallableFunction {}
interface NewableFunction {}
interface IArguments {}
interface Number { toExponential: any; }
interface Object {}
interface RegExp {}
interface String { charAt: any; }
interface Array<T> { length: number; [n: number]: T; }
interface ReadonlyArray<T> {}
interface SymbolConstructor {
    (desc?: string | number): symbol;
    for(name: string): symbol;
    readonly toStringTag: symbol;
}
declare var Symbol: SymbolConstructor;
interface Symbol {
    readonly [Symbol.toStringTag]: string;
}
declare const console: { log(msg: any): void; };

