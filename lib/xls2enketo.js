const enketo = require('enketo-transformer');
const { execSync } = require('child_process');
const fs = require('fs');

const pathDetails = (xpath) => {
  const idx = xpath.lastIndexOf('/');
  const location = xpath.substring(0, idx);
  const periodIdx = xpath.lastIndexOf('.');
  const filename = xpath.substring(idx+1, periodIdx);
  const extension = xpath.substring(periodIdx+1);
  return {location, filename, extension};
}

const xformFilePathBasedOnXlsFilePath = (xlspath) => {
  const {location, filename, extension} = pathDetails(xlspath);
  return `${location}/xform-${filename}.xml`;
}

const transformXlsFileSync = (filepath, outputpath) => {
  execSync(`xls2xform ${filepath} ${outputpath} --json --skip_validate`);
}

const transformXformString = async (xform) => {
  return await enketo.transform({
      xform,
      markdown: false,
      preprocess: doc => doc,
  });
}

const transformXformFile = async (filepath) => {
  const xform = fs.readFileSync(filepath);
  return transformXformString(xform);
}

const transform = async (xlspath) => {
  const xformpath = xformFilePathBasedOnXlsFilePath(xlspath);
  transformXlsFileSync(xlspath, xformpath);
  return transformXformFile(xformpath);
}

module.exports = {
  transformXlsFileSync,
  transformXformFile,
  transformXformString,
  transform
}
