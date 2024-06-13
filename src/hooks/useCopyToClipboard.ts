import WillToast from '@/components/atoms/ToastMessage';
import { useState } from 'react';

function useCopyToClipBoard() {
  const [isCopied, setIsCopied] = useState(false);

  async function handleCopyToClipboard(text: string) {
    try {
      if (!navigator.clipboard || isCopied) return;

      await window.navigator.clipboard.writeText(text);

      setIsCopied(true);
      WillToast.success("Copied to clipboard");
    } catch (error) {
      WillToast.error("Something went wrong");
    }
  }
  
  return { isCopied, handleCopyToClipboard };
}
export { useCopyToClipBoard };
