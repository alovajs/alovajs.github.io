import { useCallback, useEffect, useRef, useState } from 'react';
import { installCommand } from './content';

const feedbackDuration = 1800;

/** 复制安装命令，并给出 1.8s 的「已复制」反馈（对应 mock 中的 content_copy → check） */
export default function useCopyInstall() {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    []
  );

  const copy = useCallback(() => {
    if (typeof navigator === 'undefined' || !navigator.clipboard) return;
    navigator.clipboard
      .writeText(installCommand)
      .then(() => {
        setCopied(true);
        if (timer.current) clearTimeout(timer.current);
        timer.current = setTimeout(() => setCopied(false), feedbackDuration);
      })
      .catch(() => {});
  }, []);

  return { copied, copy };
}
