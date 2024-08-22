import { Redirect } from '@docusaurus/router';
import { lang } from '@site/src/common/lang';
import Content from '@theme-original/NotFound/Content';

const initialTs = Date.now();
const href = window.location.href;
const initialRedirectList = ['v2'];
let redirectList = [...initialRedirectList];
export default function ContentWrapper(props) {
  const hrefSplited = href.split('/');
  hrefSplited.splice(0, 3, '');
  const langFlagIndex = hrefSplited.findIndex(urlPiece => lang.includes(urlPiece));
  const breakPointIndex = langFlagIndex >= 0 ? langFlagIndex + 1 : 1;

  // 1秒之内加载的页面才会自动跳转，防止链接跳转也重定向
  if (redirectList.length > 0 && Date.now() - initialTs < 1000) {
    const redirectTag = redirectList.shift();
    if (!hrefSplited.includes(redirectTag)) {
      hrefSplited.splice(breakPointIndex, 0, redirectTag);
      return <Redirect to={hrefSplited.join('/')} />;
    }
  }
  return (
    <>
      <Content {...props} />
    </>
  );
}
