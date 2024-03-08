const { join } = require('path');
const fs = require('fs');

const basePath = 'docs/tutorial';
const filterFile = ['_category_.json', 'example'];

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
      distFileContent += fs.readFileSync(filesrc, { encoding: 'utf8' });
      distFileContent += '\n\n\n';
    } else {
      distFileContent += await extract(filesrc);
    }
  }
  return distFileContent;
};

(async () => {
  const content = await extract(join(process.cwd(), basePath));
  fs.writeFileSync(
    join(process.cwd(), './distFile.md'),
    content
      // 章节标题改为一级标题
      .replace(/---\s+?title:([\s\S]*?)\n[\s\S]*?---/g, (_, rep) => {
        return '++++++++++\n# ' + rep;
      })
      // 添加分隔符
      .replace(/[^#]##\s+(.*?)\s/g, mat => {
        return '++++++++++\n' + mat;
      })
      // 替换链接
      .replace(/\(\/((category|tutorial|api|contributing).+?)\)/g, '(https://alova.js.org/$1)')
  );
})();
