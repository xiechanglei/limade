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
        },
        {
            format: "cjs",//cjs format
            file: "dist/index.cjs.js",//output file
        },
        {
            format: "umd",//umd format
            name: "limade",//umd name
            file: "dist/index.umd.js",//output file
        }
    ],
}