const fs = require('fs');
const path = require('path');
const Module = require('module');
const { transformFileSync } = require('@babel/core');

const rootDir = path.resolve(__dirname, '..');
const staticAdminDir = path.join(rootDir, 'static', 'admin');
const configRoot = path.join(rootDir, 'src', 'cms', 'config');
const cmsPackageDir = path.join(rootDir, 'node_modules', '@sveltia', 'cms', 'dist');
const originalJsLoader = Module._extensions['.js'];

const transpileCmsConfig = (module, filename) => {
  const { code } = transformFileSync(filename, {
    babelrc: false,
    configFile: false,
    plugins: [require.resolve('@babel/plugin-transform-modules-commonjs')]
  });

  module._compile(code, filename);
};

Module._extensions['.js'] = (module, filename) => {
  if (filename.startsWith(configRoot)) {
    transpileCmsConfig(module, filename);
    return;
  }

  originalJsLoader(module, filename);
};

const loadCmsConfig = () => {
  const configModulePath = path.join(configRoot, 'index.js');
  delete require.cache[configModulePath];
  const imported = require(configModulePath);
  return imported.default || imported;
};

const writeAdminHtml = () => {
  const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="robots" content="noindex,nofollow" />
    <title>CMS Admin</title>
  </head>
  <body>
    <div id="nc-root"></div>
    <script type="module">
      import { init } from './sveltia-cms.mjs';
      import config from './config.js';

      window.CMS_MANUAL_INIT = true;
      init({ config });
    </script>
  </body>
</html>
`;

  fs.writeFileSync(path.join(staticAdminDir, 'index.html'), html);
};

const writeConfigModule = (config) => {
  const serialized = JSON.stringify(config, null, 2);
  fs.writeFileSync(
    path.join(staticAdminDir, 'config.js'),
    `const config = ${serialized};\n\nexport default config;\n`
  );
};

const copySveltiaBundle = () => {
  fs.copyFileSync(
    path.join(cmsPackageDir, 'sveltia-cms.mjs'),
    path.join(staticAdminDir, 'sveltia-cms.mjs')
  );
  fs.copyFileSync(
    path.join(cmsPackageDir, 'sveltia-cms.mjs.map'),
    path.join(staticAdminDir, 'sveltia-cms.mjs.map')
  );
};

try {
  fs.mkdirSync(staticAdminDir, { recursive: true });
  const config = loadCmsConfig();

  writeConfigModule(config);
  writeAdminHtml();
  copySveltiaBundle();
} finally {
  Module._extensions['.js'] = originalJsLoader;
}
