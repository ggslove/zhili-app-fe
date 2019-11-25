const path = require("path");


/**
 * 
 * cheap-module-source-map
 * 内容为
 * {"version":3,"file":"index.js","sources":["webpack://MyLibrary/index.js"],"mappings":"AAAA;;;;;;;;AA8JA;;;;;AA+BA","sourceRoot":""}
 * 
 * cheap-source-map
 * 
 * 
 * //# sourceMappingURL=index.js.map
 * 
 */
module.exports = {
  entry: "./src/index.tsx",
  devtool: 'eval',
  output: {
    path: path.resolve(__dirname, "./lib"),
    filename: "index.js",
    library: 'MyLibrary',
    libraryTarget: 'umd'
  },
  resolve: {
    extensions: [".js", ".ts", ".tsx"]
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/i,
        use: [
          {
            loader: "ts-loader"
          }
        ],
        exclude: /node_modules/
      }
    ]
  }
};
