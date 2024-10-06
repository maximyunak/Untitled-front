import { useEffect } from 'react';

export const useActiveBody = (isActive: boolean) => {
  useEffect(() => {
    const body = document.body;

    if (isActive) {
      body.classList.add('active');
    } else {
      body.classList.remove('active');
    }

    // Cleanup on unmount
    return () => {
      body.classList.remove('active');
    };
  }, [isActive]);
};
