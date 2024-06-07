import { useState } from 'react';

export interface IDisclosure {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onToggle: () => void;
}

const useDisclosure = (initialState = false): IDisclosure => {
  const [isOpen, setIsOpen] = useState(initialState);

  const onOpen = () => {
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  const onToggle = () => {
    setIsOpen(pre => !pre);
  };

  return {
    isOpen,
    onOpen,
    onClose,
    onToggle
  };
};

export default useDisclosure;
