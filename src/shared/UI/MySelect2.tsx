import arrowDown from '@shared/assets/icons/arrowDown.svg';
import { categories } from '@shared/constants';
import { MyCheckbox } from './MyCheckbox';
import { FC, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MyCheckboxList } from './MyCheckboxList';
import { useClickOutside } from '@shared/hooks/useClickOutside';

interface IMySelect2 {
  visible: boolean;
  setVisible: (b: boolean) => void;
  items: string[];
  selectedItems: string[];
  onAdd: (category: string) => void;
}

export const MySelect2: FC<IMySelect2> = ({ visible, setVisible, items, selectedItems, onAdd }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);
  // const [visible, setVisible] = useState<boolean>(false);

  useClickOutside([containerRef, itemsRef], () => setVisible(false));

  return (
    <div className="relative cursor-pointer" ref={containerRef}>
      <div
        className="w-full border hover:bg-[#272727] border-opacity-70 border-white py-1 px-3 bg-[#282828] rounded-lg mt-2 font-medium text-[14px] relative z-[50]"
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
            initial={{
              paddingTop: 0,
              paddingBottom: 0,
              // height: 0,
              // scale: 0,
              opacity: 0,
              top: 35,
            }}
            animate={{
              paddingTop: 12,
              paddingBottom: 12,
              // height: "auto",
              // scale: 1,
              opacity: 1,
              top: 40,
            }}
            exit={{
              paddingTop: 0,
              paddingBottom: 0,
              // height: 0,
              // scale: 0,
              opacity: 0,
              top: 35,
            }}
            className="w-full absolute top bg-[#303030] left-0 rounded-lg px-3 flex flex-col gap-3 justify-center overflow-hidden shadow-lg z-[51]"
          >
            {items.map((category, id) => (
              <MyCheckboxList
                key={`${id}-_${category}`}
                category={category}
                active={selectedItems.includes(category)}
                onAdd={onAdd}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
