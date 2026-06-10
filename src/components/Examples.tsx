'use client';
import IconFont from '@site/src/components/IconFont';

const linkPartCommon = '/alovajs/alova/tree/main/examples/';
const exampleList = [
  {
    id: 'React',
    imgSrc: '/img/react.svg',
    linkGithub: `https://github.com${linkPartCommon}react`,
    linkCodesandbox: `https://codesandbox.io/p/sandbox/github${linkPartCommon}react`,
    linkStackblitz: `https://stackblitz.com/fork/github${linkPartCommon}react`
  },
  {
    id: 'Vue',
    imgSrc: '/img/vue.svg',
    linkGithub: `https://github.com${linkPartCommon}vue`,
    linkCodesandbox: `https://codesandbox.io/p/sandbox/github${linkPartCommon}vue`,
    linkStackblitz: `https://stackblitz.com/fork/github${linkPartCommon}vue`
  },
  {
    id: 'Svelte',
    imgSrc: '/img/svelte.svg',
    linkGithub: `https://github.com${linkPartCommon}svelte`,
    linkCodesandbox: `https://codesandbox.io/p/sandbox/github${linkPartCommon}svelte`,
    linkStackblitz: `https://stackblitz.com/fork/github${linkPartCommon}svelte`
  },
  {
    id: 'Solid',
    imgSrc: '/img/solid.svg',
    linkGithub: `https://github.com${linkPartCommon}solid`,
    linkCodesandbox: `https://codesandbox.io/p/sandbox/github${linkPartCommon}solid`,
    linkStackblitz: `https://stackblitz.com/fork/github${linkPartCommon}solid`
  },
  {
    id: 'Server',
    imgSrc: '/img/nodejs.svg',
    linkGithub: `https://github.com${linkPartCommon}server`,
    linkCodesandbox: `https://codesandbox.io/p/sandbox/github${linkPartCommon}server`,
    linkStackblitz: `https://stackblitz.com/fork/github${linkPartCommon}server`
  }
];
const Examples = () => {
  return (
    <div className="use-tailwind">
      <div className="grid grid-rows-1 gap-4 xl:grid-cols-3">
        {exampleList.map(item => (
          <div
            key={item.id}
            className="flex flex-col bg-gray-100/5 px-5 py-6 rounded-md border-[1px] border-gray-200 border-solid dark:border-gray-200/10 dark:text-slate-200">
            <div className="flex items-center justify-between mb-3">
              <div className="flex flex-row items-center">
                <img src={item.imgSrc} alt={item.id} className="mr-4 h-8" />
                <strong>{item.id}</strong>
              </div>
              <a
                className="flex items-center"
                href={item.linkGithub}
                target="_blank"
                rel="noopener noreferrer">
                <IconFont
                  name="github"
                  size={28}></IconFont>
              </a>
            </div>
            <div className="flex flex-row justify-between">
              <a
                className="flex items-center"
                href={item.linkCodesandbox}
                target="_blank"
                rel="noopener noreferrer">
                <IconFont
                  name="square"
                  size={20}></IconFont>
                <p className="text-sm mb-0 ml-1">Codesandbox</p>
              </a>
              <a
                className="flex items-center"
                href={item.linkStackblitz}
                target="_blank"
                rel="noopener noreferrer">
                <IconFont
                  name="icon"
                  size={20}></IconFont>
                <p className="text-sm mb-0 ml-1">StackBlitz</p>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Examples;
