import { useClipboard } from 'use-clipboard-copy';

export function useCopy() {
  const clipboard = useClipboard({
    copiedTimeout: 1000,
  });

  return clipboard;
}
