const fs = require('fs');
const fsExtra = require('fs-extra');
const pp = require('pretty-data');
const {assert} = require('chai');
const jsonFormSnapshot = require('./snapshots/form.json')

const {
  transformXlsFileSync,
  transformXformFile,
  transformXformString,
  transform } = require('../lib/xls2enketo');

const datafile = (name) => {
  return `${__dirname}/data/${name}`;
}
const OUTPUT_DIR = `${__dirname}/../output`;
const outputfile = (name) => {
  return `${OUTPUT_DIR}/${name}`;
}

describe('transformer', () => {

  beforeEach(() => {
    fsExtra.emptyDirSync(OUTPUT_DIR);
  })

  it('transform xlsx to xform', () => {
    transformXlsFileSync(datafile('form.xlsx'), outputfile('xform.xml'));
    const files = fs.readdirSync(OUTPUT_DIR);
    assert.equal(files.length, 1);
    assert.equal(files[0], 'xform.xml')
    //TODO verify content
  })

  it('transform xform string to enketo', async () => {
    const xformStr = fs.readFileSync(datafile('select.xml'));
    const xform = await transformXformString(xformStr);
    assert.isNotNull(xform);
    //TODO verify content
  })

  it('transform xform file to enketo', async () => {
    const xform = await transformXformFile(datafile('select.xml'));
    assert.isNotNull(xform);
    //TODO verify content
  })

  it('transform xlsx to enketo', async () => {
    const jsonForm = await transform(datafile('form.xlsx'));
    assert.equal(jsonForm.transformerVersion, '1.34.0');
    //TODO verify content
  })
})
