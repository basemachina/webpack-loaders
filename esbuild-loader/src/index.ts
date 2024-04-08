import type { LoaderDefinitionFunction } from "webpack";
import type { BuildOptions } from "esbuild";
import { buildSync } from "esbuild";

export type LoaderOptions = {
  build: BuildOptions;
};

const loader: LoaderDefinitionFunction<LoaderOptions> = function () {
  const { build } = this.getOptions();
  const { errors, outputFiles } = buildSync({
    ...build,
    entryPoints: [this.resourcePath],
    bundle: true,
    write: false,
  });
  if (errors.length > 0) {
    this.callback(
      new Error("esbuild err:\n" + errors.map((error) => error.text).join("\n"))
    );
    return;
  }
  if (!outputFiles?.[0]) {
    this.callback(new Error("outputFiles must exist"));
    return;
  }
  return outputFiles[0].text;
};

export default loader;
