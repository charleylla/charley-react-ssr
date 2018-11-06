module.exports = {
  "parser": "babel-eslint",
  "env": {
    "browser": true,
    "commonjs": true,
    "es6": true,
    "node": true,
  },
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended"
  ],
  "parserOptions": {
    "ecmaVersion": 8,
    "sourceType": "module",
    "ecmaFeatures": {
      "experimentalObjectRestSpread":true,
      "legacyDecorators": true
    }
  },
  "rules": {
    "comma-dangle": ["warn", "always-multiline"],
    "indent": ["warn", 2],
    "linebreak-style": ["warn", "unix"],
    "quotes": ["warn", "double"],
    "semi": ["warn", "always"],
    "no-unused-vars": ["warn"],
    "no-console": ["warn"],
    "react/forbid-prop-types": 0 
  },
};
