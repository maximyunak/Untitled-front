import { useEffect } from 'react';

export const useClickOutside = (elements: React.RefObject<HTMLElement>[], callback: () => void) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const clickedOutside = elements.every((ref) => ref.current && !ref.current.contains(target));

      if (clickedOutside) {
        callback();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [callback, elements]);
};
