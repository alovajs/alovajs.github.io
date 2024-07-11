import Link from '@docusaurus/Link';
import IconFont from '@site/src/components/IconFont';

const linkPartCommon = '/alovajs/alova/tree/next/examples/';
const exampleList = [
  {
    id: 'React',
    Image: require('@site/static/img/react.svg').default,
    linkGithub: `https://github.com${linkPartCommon}react`,
    linkCodesandbox: `https://codesandbox.io/p/sandbox/github${linkPartCommon}react`,
    linkStackblitz: `https://stackblitz.com/fork/github${linkPartCommon}react`
  },
  {
    id: 'Vue',
    Image: require('@site/static/img/vue.svg').default,
    linkGithub: `https://github.com${linkPartCommon}vue`,
    linkCodesandbox: `https://codesandbox.io/p/sandbox/github${linkPartCommon}vue`,
    linkStackblitz: `https://stackblitz.com/fork/github${linkPartCommon}vue`
  },
  {
    id: 'Svelte',
    Image: require('@site/static/img/svelte.svg').default,
    linkGithub: `https://github.com${linkPartCommon}svelte`,
    linkCodesandbox: `https://codesandbox.io/p/sandbox/github${linkPartCommon}svelte`,
    linkStackblitz: `https://stackblitz.com/fork/github${linkPartCommon}svelte`
  }
];
const Examples = () => {
  return (
    <div className="grid grid-rows-1 gap-4 lg:grid-cols-3">
      {exampleList.map(item => (
        <div
          key={item.id}
          className="flex flex-col bg-slate-100 px-10 py-6 rounded-md border-[1px] border-slate-200 border-solid">
          <div className="flex items-center justify-between mb-3">
            <div className="flex flex-row items-center">
              <item.Image className="mr-4"></item.Image>
              <strong>{item.id}</strong>
            </div>
            <Link
              className="flex items-center"
              href={item.linkGithub}
              target="_blank">
              <IconFont
                name="github"
                size={28}></IconFont>
            </Link>
          </div>
          <div className="flex flex-row justify-between">
            <Link
              className="flex items-center text-black hover:text-black"
              href={item.linkCodesandbox}
              target="_blank">
              <IconFont
                name="square"
                size={20}></IconFont>
              <p className="text-sm mb-0 ml-1">Codesandbox</p>
            </Link>
            <Link
              className="flex items-center text-black hover:text-black"
              href={item.linkStackblitz}
              target="_blank">
              <IconFont
                name="icon"
                size={20}></IconFont>
              <p className="text-sm mb-0 ml-1">StackBlitz</p>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Examples;
