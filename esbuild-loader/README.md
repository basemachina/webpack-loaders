# esbuild-loader

* A Webpack loader to run esbuild's build command on given path.
* This loader is useful for embedding partial TypeScript codes into your another code as bundled string.

## Installation

```
npm i -D @syumai/esbuild-loader
```

## Usage

### webpack.config.ts

```js
import { BuildOptions } from "esbuild";

const config = {
  ...
  module: {
    rules: [
      {
        test: /\.ts$/,
        resourceQuery: /source/,
        type: "asset/source",
        use: [
          {
            loader: ["@syumai/esbuild-loader"],
            options: {
              build: {
                minify: false,
                platform: "neutral",
              } satisfies BuildOptions, // `build` key accepts esbuild's BuildOptions.
            },
          },
        ],
      },
  ...
```

### Code

* bar.ts

```ts
export const bar = "bar";
```

* foo.ts

```ts
import { bar } from "./bar";
export const fooBar = "foo" + bar;
```

* index.ts

```ts
import fooCode from "./foo?source";
/* result:
// src/bar.ts
var bar = "bar";

// src/foo.ts
var fooBar = "foo" + bar;
export {
  fooBar
};
*/
```

## License

MIT

## Author

syumai
