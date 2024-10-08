import type { WrapperProps } from '@docusaurus/types';
import Content from '@theme-original/NotFound/Content';
import type ContentType from '@theme/NotFound/Content';
import { useEffect } from 'react';

type Props = WrapperProps<typeof ContentType>;
export default function ContentWrapper(props: Props): JSX.Element {
  const invalidLinksMap = {
    learning: 'client/strategy',
    tutorial: 'v2/tutorial'
  };

  useEffect(() => {
    // setTimeout是为了让locale修正的重定向先执行
    setTimeout(async () => {
      const href = window.location.href;
      for (const searchWords in invalidLinksMap) {
        if (href.includes(searchWords) && !href.includes(invalidLinksMap[searchWords])) {
          const newHref = href.replace(searchWords, invalidLinksMap[searchWords]);
          try {
            const response = await fetch(location.origin + newHref);
            if (response.status >= 200 && response.status < 400) {
              window.location.href = newHref;
              break;
            }
          } catch (e) {
            // 由于github服务器限制，如果页面存在将会报以下错误，此时我们也重定向
            // Mixed Content: The page at 'https://alova.js.org/zh-CN/tutorial/combine-framework/use-request' was loaded over HTTPS, but requested an insecure resource 'http://alova.js.org/zh-CN/v2/tutorial/combine-framework/use-request/'. This request has been blocked; the content must be served over HTTPS.
            window.location.href = newHref;
            break;
          }
        }
      }
    }, 1000);
  }, []);

  return <Content {...props} />;
}
