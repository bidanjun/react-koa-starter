const path = require('path');
const fs = require('fs');
let paths = require('../node_modules/react-scripts/config/paths')

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

//only change the paths here
let libPath={
  appBuild:resolveApp('lib'),
  appSrc: resolveApp('src'),
  appIndexJs: resolveApp('src/react-koa-starter/index.js'),

  //add for server
  serverSrc:resolveApp('server'),
  serverBuild:resolveApp('build')
}
let result=Object.assign(paths,libPath);
module.exports=result;
  