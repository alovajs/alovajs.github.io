const { join } = require('path');
const { resolve: urlResolve } = require('url');
const fs = require('fs');

const baseURL = 'https://alova.js.org/';

const config = {
  basePath: [
    'i18n/zh-CN/docusaurus-plugin-content-docs/current/tutorial/02-getting-started',
    'i18n/zh-CN/docusaurus-plugin-content-docs/current/tutorial/03-client/01-strategy/04-use-pagination.md'
  ],
  exclude: ['_category_.json', 'example', 'congratulations']
};
const replaceTargetContent = (content, link) => {
  const buildModule = mat => `++++++++++\nDocument link: ${link}\n${mat}`;
  return (
    content
      // 章节标题改为一级标题
      .replace(/---\s+?title:([\s\S]*?)\n[\s\S]*?---/g, (_, rep) => buildModule(rep))
      // 添加分隔符
      .replace(/[^#]##\s+(.*?)\s/g, mat => buildModule(mat))
      // 替换链接
      .replace(/\(\/((category|tutorial|api|contributing|resource).+?)\)/g, `(${baseURL}$1)`)
  );
};
const buildLink = filesrc =>
  urlResolve(baseURL, filesrc.split('docs')[1])
    .replace('current/', '')
    .replace(/[0-9]+-/g, '')
    .replace('.README.md', '')
    .replace('.md', '');

const extract = async targetPath => {
  let filepaths = [];
  if (fs.statSync(targetPath).isFile()) {
    filepaths = [targetPath];
  } else {
    filepaths = fs.readdirSync(targetPath).map(pathItem => join(targetPath, pathItem));
  }

  let distFileContent = '';
  for (let filesrc of filepaths) {
    if (config.exclude.some(item => filesrc.includes(item))) {
      continue;
    }
    let stats = fs.statSync(filesrc);
    if (stats.isFile()) {
      const docLink = buildLink(filesrc);
      distFileContent += replaceTargetContent(
        fs.readFileSync(filesrc, { encoding: 'utf8' }),
        docLink
      );
      distFileContent += '\n\n\n';
    } else {
      distFileContent += await extract(filesrc);
    }
  }
  return distFileContent;
};

(async () => {
  const basePath = Array.isArray(config.basePath) ? config.basePath : [config.basePath];
  let content = '';
  for (const path of basePath) {
    content += await extract(join(process.cwd(), path));
  }
  fs.writeFileSync(join(process.cwd(), './distFile.md'), content);
})();
