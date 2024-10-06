import { AnimatePresence, motion } from 'framer-motion';
import selectIcon from '@shared/assets/icons/arrowDown.svg';
import { selectEventVariants, shakeVariants, showModalVariant } from '@shared/animationProps';
import { FC, useEffect, useRef } from 'react';
import { MyTitle } from './MyTitle';
import { useClickOutside } from '@shared/hooks/useClickOutside';

interface IMySelect {
  title?: string;
  items: string[];
  isVisible: boolean;
  selected: number;
  toggleVisible: (b?: boolean) => void;
  setItem: (index: number) => void;
}

export const MySelect: FC<IMySelect> = ({
  title,
  items,
  isVisible,
  selected,
  toggleVisible,
  setItem,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  const closeModal = () => {
    toggleVisible(false);
  };

  useClickOutside([modalRef, triggerRef], closeModal);

  return (
    <div className="relative" ref={modalRef}>
      {title && <MyTitle>{title}</MyTitle>}
      <div
        className="w-full border border-transparent py-1 px-3 border-gray-400 bg-[#282828] rounded-xl placeholder:text-sm hover:bg-[#272727] transition-colors mt-1 duration-300 cursor-pointer flex justify-between"
        onClick={() => toggleVisible(!isVisible)}
        ref={triggerRef}
      >
        {items[selected]}
        <motion.img
          variants={shakeVariants}
          animate={isVisible ? 'visible' : { rotate: 0 }}
          src={selectIcon}
          alt="selectIcon"
          className="invert w-3"
        />{' '}
      </div>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            className="bg-[#282828] rounded-xl py-3 px-4 w-full absolute top-[70px] left-0 z-50"
            variants={showModalVariant}
            animate="animate"
            exit="initial"
            initial="initial"
          >
            {items.map((el, index) => (
              <motion.h1
                key={index}
                variants={selectEventVariants}
                onClick={() => {
                  setItem(index);
                  toggleVisible(false);
                }}
                whileHover={'hover'}
                whileTap={'tap'}
                className="block cursor-pointer"
              >
                {el}
              </motion.h1>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
