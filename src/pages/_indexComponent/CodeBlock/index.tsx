import { Highlight, themes } from 'prism-react-renderer';

interface Props {
  className?: string;
  code: string;
  fontSize?: number;
}

export default (props: Props) => (
  <Highlight
    theme={themes.vsDark}
    code={props.code}
    language="tsx">
    {({ style, tokens, getLineProps, getTokenProps }) => (
      <pre
        style={{
          ...style,
          fontSize: `${props.fontSize ?? 16}px`
        }}
        className={props.className ?? ''}>
        {tokens.map((line, i) => (
          <div
            key={i}
            {...getLineProps({ line })}>
            {/* <span>{i + 1}</span> */}
            {line.map((token, key) => (
              <span
                key={key}
                {...getTokenProps({ token })}
              />
            ))}
          </div>
        ))}
      </pre>
    )}
  </Highlight>
);
