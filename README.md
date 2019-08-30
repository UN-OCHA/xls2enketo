Spreadsheet to Enketo Transformer
=================================
NodeJS library that transforms spreadsheets to forms that enketo-core can render. It leverages both pyxform(xls to xform xml) and enketo-transformer (xform xml to enketo json format).

### Prerequisites
1. python 2.7 and pyxform
2. nodeJS 8 and npm

### Installation
```
npm i xls2enketo
```

### Usage
```js
const xls2enketo = require('xls2enketo');

(async() => {
  const enketoForm = await xls2enketo.transform(`${__dirname}/form.xlsx`);
  console.log(enketoForm);
})()
```

### Running tests
```
npm run test
```

### Publish
```sh
npm publish --tag beta
```

### TODO
1. Add more samples/tests/travis
2. Lint
