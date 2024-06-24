const { join } = require('path');
const { resolve: urlResolve } = require('url');
const fs = require('fs');

const baseURL = 'https://alova.js.org/';
const filterFile = ['_category_.json', 'example'];
const replaceTargetContent = (content, link) => {
  const buildModule = mat => `++++++++++\nDocument link: ${link}\n${mat}`;
  return (
    content
      // 章节标题改为一级标题
      .replace(/---\s+?title:([\s\S]*?)\n[\s\S]*?---/g, (_, rep) => buildModule(rep))
      // 添加分隔符
      .replace(/[^#]##\s+(.*?)\s/g, mat => buildModule(mat))
      // 替换链接
      .replace(/\(\/((category|tutorial|api|contributing).+?)\)/g, `(${baseURL}/$1)`)
  );
};
const buildLink = filesrc =>
  urlResolve(baseURL, filesrc.split('docs')[1])
    .replace(/[0-9]+-/g, '')
    .replace('.README.md', '')
    .replace('.md', '');

const extract = async targetPath => {
  let distFileContent = '';
  const filepaths = fs.readdirSync(targetPath);
  for (let path of filepaths) {
    const filesrc = join(targetPath, path);
    if (filterFile.some(item => filesrc.includes(item))) {
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

const basePath = 'docs/tutorial';
(async () => {
  const content = await extract(join(process.cwd(), basePath));
  fs.writeFileSync(join(process.cwd(), './distFile.md'), content);
})();
