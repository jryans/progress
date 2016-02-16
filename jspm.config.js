SystemJS.config({
  packageConfigPaths: [
    "npm:@*/*.json",
    "npm:*.json",
    "github:*/*.json"
  ],
  globalEvaluationScope: false,
  /* transpiler: "plugin-babel",
  babelOptions: {
    "es2015": false,
    "stage3": false
  }, */

  map: {
    "co": "npm:co@4.6.0",
    "process": "github:jspm/nodelibs-process@0.2.0-alpha"
  },

  packages: {
    "progress": {
      "format": "cjs",
      "main": "index.js"
    }
  }
});
