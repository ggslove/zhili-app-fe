import typescript from "rollup-plugin-typescript2";
import commonjs from "rollup-plugin-commonjs";
import external from "rollup-plugin-peer-deps-external";
import resolve from "rollup-plugin-node-resolve";
// import scss from "rollup-plugin-scss";

import pkg from "./package.json";

export default [
  {
    input: "src/index.tsx",
    output: {
      dir: "lib",
      sourcemap: true,
      file: pkg.module,
      format: "es"
    },
    external: ["react", "react-proptypes"],
    plugins: [
      external(),
      resolve(),
      typescript({
        rollupCommonJSResolveHack: true,
        exclude: "**/__tests__/**",
        clean: true
      }),
      commonjs({
        include: ["../node_modules/**"],
        namedExports: {
          "../node_modules/react/react.js": [
            "Children",
            "Component",
            "PropTypes",
            "createElement"
          ],
          "../node_modules/react-dom/index.js": ["render"]
        }
      })
    ]
  }
];
