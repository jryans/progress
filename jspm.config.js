SystemJS.config({
  packageConfigPaths: [
    "npm:@*/*.json",
    "npm:*.json",
    "github:*/*.json"
  ],
  globalEvaluationScope: false,
  transpiler: "plugin-babel",

  map: {
    "co": "npm:co@4.6.0",
    "plugin-babel": "npm:systemjs-plugin-babel@0.0.2",
    "process": "github:jspm/nodelibs-process@0.2.0-alpha"
  },

  packages: {
    "progress": {
      "format": "esm",
      "main": "index.js",
    }
  }
});
