currentDirectory::/user/username/projects/noEmitOnError
useCaseSensitiveFileNames::true
Input::
//// [/user/username/projects/noEmitOnError/shared/types/db.ts] *new* 
export interface A {
    name: string;
}
//// [/user/username/projects/noEmitOnError/src/main.ts] *new* 
import { A } from "../shared/types/db";
const a = {
    lastName: 'sdsd'
;
//// [/user/username/projects/noEmitOnError/src/other.ts] *new* 
console.log("hi");
export { }
//// [/user/username/projects/noEmitOnError/tsconfig.json] *new* 
{
    "compilerOptions": {
        "outDir": "./dev-build",
        "declaration": false,
        "incremental": false,
        "noEmitOnError": true,
    },
}

tsgo -b -v
ExitStatus:: DiagnosticsPresent_OutputsSkipped
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is out of date because output file 'dev-build/tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project 'tsconfig.json'...

[96msrc/main.ts[0m:[93m4[0m:[93m1[0m - [91merror[0m[90m TS1005: [0m',' expected.

[7m4[0m ;
[7m [0m [91m~[0m


Found 1 error in src/main.ts[90m:4[0m

//// [/home/src/tslibs/TS/Lib/lib.d.ts] *Lib*
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
//// [/user/username/projects/noEmitOnError/dev-build/tsconfig.tsbuildinfo] *new* 
{"version":"FakeTSVersion","errors":true,"root":["../shared/types/db.ts","../src/main.ts","../src/other.ts"]}
//// [/user/username/projects/noEmitOnError/dev-build/tsconfig.tsbuildinfo.readable.baseline.txt] *new* 
{
  "version": "FakeTSVersion",
  "errors": true,
  "root": [
    {
      "files": [
        "../shared/types/db.ts"
      ],
      "original": "../shared/types/db.ts"
    },
    {
      "files": [
        "../src/main.ts"
      ],
      "original": "../src/main.ts"
    },
    {
      "files": [
        "../src/other.ts"
      ],
      "original": "../src/other.ts"
    }
  ],
  "size": 109
}

tsconfig.json::
SemanticDiagnostics::
*not cached* /home/src/tslibs/TS/Lib/lib.d.ts
*not cached* /user/username/projects/noEmitOnError/shared/types/db.ts
*not cached* /user/username/projects/noEmitOnError/src/main.ts
*not cached* /user/username/projects/noEmitOnError/src/other.ts
Signatures::


Edit [0]:: no change

tsgo -b -v
ExitStatus:: DiagnosticsPresent_OutputsSkipped
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is out of date because buildinfo file 'dev-build/tsconfig.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project 'tsconfig.json'...

[96msrc/main.ts[0m:[93m4[0m:[93m1[0m - [91merror[0m[90m TS1005: [0m',' expected.

[7m4[0m ;
[7m [0m [91m~[0m


Found 1 error in src/main.ts[90m:4[0m

//// [/user/username/projects/noEmitOnError/dev-build/tsconfig.tsbuildinfo] *rewrite with same content*
//// [/user/username/projects/noEmitOnError/dev-build/tsconfig.tsbuildinfo.readable.baseline.txt] *rewrite with same content*

tsconfig.json::
SemanticDiagnostics::
*not cached* /home/src/tslibs/TS/Lib/lib.d.ts
*not cached* /user/username/projects/noEmitOnError/shared/types/db.ts
*not cached* /user/username/projects/noEmitOnError/src/main.ts
*not cached* /user/username/projects/noEmitOnError/src/other.ts
Signatures::


Edit [1]:: Fix error
//// [/user/username/projects/noEmitOnError/src/main.ts] *modified* 
import { A } from "../shared/types/db";
const a = {
    lastName: 'sdsd'
};

tsgo -b -v
ExitStatus:: Success
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is out of date because buildinfo file 'dev-build/tsconfig.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project 'tsconfig.json'...

//// [/user/username/projects/noEmitOnError/dev-build/shared/types/db.js] *new* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

//// [/user/username/projects/noEmitOnError/dev-build/src/main.js] *new* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const a = {
    lastName: 'sdsd'
};

//// [/user/username/projects/noEmitOnError/dev-build/src/other.js] *new* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
console.log("hi");

//// [/user/username/projects/noEmitOnError/dev-build/tsconfig.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","root":["../shared/types/db.ts","../src/main.ts","../src/other.ts"]}
//// [/user/username/projects/noEmitOnError/dev-build/tsconfig.tsbuildinfo.readable.baseline.txt] *modified* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "../shared/types/db.ts"
      ],
      "original": "../shared/types/db.ts"
    },
    {
      "files": [
        "../src/main.ts"
      ],
      "original": "../src/main.ts"
    },
    {
      "files": [
        "../src/other.ts"
      ],
      "original": "../src/other.ts"
    }
  ],
  "size": 95
}

tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.d.ts
*refresh*    /user/username/projects/noEmitOnError/shared/types/db.ts
*refresh*    /user/username/projects/noEmitOnError/src/main.ts
*refresh*    /user/username/projects/noEmitOnError/src/other.ts
Signatures::


Edit [2]:: no change

tsgo -b -v
ExitStatus:: Success
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is up to date because newest input 'src/main.ts' is older than output 'dev-build/shared/types/db.js'


