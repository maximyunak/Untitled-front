import React, { useEffect, useRef, useState } from 'react';
import savedAnimation from '@shared/animations/saved.json';
import lottie, { AnimationItem } from 'lottie-web';

export const MyFavorites = () => {
  const animationInstance = useRef<AnimationItem | null>(null);
  const animationContainer = useRef<HTMLDivElement | null>(null);

  const [isReversed, setIsReversed] = useState(false);

  const handleButtonClick = () => {
    if (animationInstance.current) {
      const totalFrames = animationInstance.current.totalFrames;

      if (isReversed) {
        animationInstance.current.playSegments([totalFrames, 0], true); // Проигрываем от конца к началу
      } else {
        animationInstance.current.playSegments([0, totalFrames], true); // Проигрываем с начала до конца
      }
      setIsReversed(!isReversed); // Меняем направление на противоположное при следующем клике
    }
  };

  useEffect(() => {
    if (animationContainer.current) {
      animationInstance.current = lottie.loadAnimation({
        container: animationContainer.current,
        animationData: savedAnimation,
        renderer: 'svg',
        loop: false,
        autoplay: false, // Отключаем автоматическое воспроизведение
      });

      return () => {
        animationInstance.current?.destroy(); // Чистим анимацию при размонтировании компонента
      };
    }
  }, []);
  return (
    <button className="w-8" onClick={handleButtonClick}>
      <div ref={animationContainer} className="w-full h-full"></div>
    </button>
  );
};
