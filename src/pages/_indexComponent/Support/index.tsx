import PageModule from '@site/src/components/PageModule';
import SupportList from '@site/src/components/SupportList';

export default function Support(): JSX.Element {
  return (
    <PageModule
      text="Runs in any JS environment with any request tool"
      textTransId="homepage.support.title"
      desc="Use hooks originated from functional components, but alova innovatively made it compatible with options and class-style UI frameworks, which means that alova's use hooks are almost not restricted by JS environments and UI frameworks, and can be used together with your familiar request tools."
      descTransId="homepage.support.subtitle"
      align="center">
      <SupportList></SupportList>
    </PageModule>
  );
}
