import arrowDown from '@shared/assets/icons/arrowDown.svg';
import { categories } from '@shared/constants';
import { MyCheckbox } from './MyCheckbox';
import { FC, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MyCheckboxList } from './MyCheckboxList';
import { useClickOutside } from '@shared/hooks/useClickOutside';

export const MySelect2 = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState<boolean>(true);

  useClickOutside([containerRef, itemsRef], () => setVisible(false));

  return (
    <div className="relative cursor-pointer" ref={containerRef}>
      <div
        className="w-full border hover:bg-[#272727] border-opacity-70 border-white py-1 px-3 bg-[#282828] rounded-lg mt-2 font-medium text-base relative z-50 "
        onClick={() => setVisible(!visible)}
      >
        <div className="flex justify-between cursor-pointer">
          <h1>Search by categories</h1>
          <img src={arrowDown} alt="" className="invert w-3" />
        </div>
      </div>
      <AnimatePresence>
        {visible && (
          <motion.div
            ref={itemsRef}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="w-full absolute top-10 bg-[#303030] left-0 rounded-lg p-3 flex flex-col gap-3 justify-center overflow-hidden shadow-lg z-50"
          >
            {categories.map((category, id) => (
              <MyCheckboxList key={`${id}-_${category}`} category={category} active={false} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
