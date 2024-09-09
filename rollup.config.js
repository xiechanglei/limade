import ts from "rollup-plugin-ts"
import terser from '@rollup/plugin-terser'


export default {
    input: "./lib/index.ts",
    plugins: [
        ts({tsconfig: "tsconfig.json"}),//typescript support
        terser(), //minify the code and remove comments
    ],
    output: [
        {
            format: "esm",//esm format
            file: "dist/index.esm.js",//output file
        }
    ],
}