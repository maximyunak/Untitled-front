import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { PreferencesTag } from './PreferencesTag';
import { categories } from '@shared/constants';

interface MyTagsProps {
  selectedItems: string[];
  handleAddCategory: (category: string) => void;
  handleRemoveCategory: (category: string) => void;
  placeholder: string;
  type?: string;
}

export const MyTags: React.FC<MyTagsProps> = ({
  selectedItems,
  handleAddCategory,
  handleRemoveCategory,
  placeholder,
  type,
}) => {
  const [inputValue, setInputValue] = useState('');

  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [showAll, setShowAll] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const filteredCategories = categories.filter(
    (category) =>
      category.toLowerCase().includes(inputValue.toLowerCase()) &&
      !selectedItems.includes(category),
  );

  const addCategory = (category: string) => {
    handleAddCategory(category);
    setHighlightedIndex(-1);
    setShowAll(false);
    setInputValue('');
    setIsVisible(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && filteredCategories.length > 0 && inputValue) {
      addCategory(
        highlightedIndex >= 0 ? filteredCategories[highlightedIndex] : filteredCategories[0],
      );
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev < filteredCategories.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : filteredCategories.length - 1));
    }
  };

  const handleMouseEnter = (index: number) => {
    setHighlightedIndex(index);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    if (isVisible) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isVisible]);

  return (
    <div className="relative">
      <input
        type="text"
        placeholder={placeholder}
        className="w-full border py-1 px-3 border-transparent bg-[#282828] rounded-xl placeholder:text-sm hover:bg-[#272727] focus:border focus:border-customPurple transition-colors duration-300 mt-2"
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
          setIsVisible(true);
        }}
        onKeyDown={handleKeyDown}
      />

      {/* Suggestions List */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            ref={containerRef}
            className="mt-2 bg-[#1c1c1c] rounded-xl p-2 absolute overflow-auto z-50 shadow-2xl"
            initial={{ opacity: 0, y: -10, maxHeight: 0 }}
            animate={{ opacity: 1, y: 0, maxHeight: showAll ? '400px' : '150px' }}
            exit={{ opacity: 0, y: -10, maxHeight: 0 }}
            transition={{ duration: 0.3 }}
          >
            {filteredCategories.length > 0 ? (
              filteredCategories.map((category, index) => (
                <motion.div
                  key={category}
                  className={`cursor-pointer p-1 rounded ${
                    index === highlightedIndex ? 'bg-[#333333]' : ''
                  } shadow-2xl`}
                  onClick={() => addCategory(category)}
                  onMouseEnter={() => handleMouseEnter(index)}
                  variants={{
                    initial: { opacity: 0, y: -10 },
                    animate: { opacity: 1, y: 0, transition: { duration: 0.3 } },
                    hover: { backgroundColor: '#333333', transition: { duration: 0.3 } },
                    exit: { opacity: 0, y: -10, transition: { duration: 0.3 } },
                  }}
                  initial="initial"
                  animate="animate"
                  whileHover="hover"
                  exit="exit"
                >
                  {category}
                </motion.div>
              ))
            ) : (
              <div>
                <div className="text-gray-400">No matching categories found</div>
                <button
                  onClick={() => setShowAll((prev) => !prev)}
                  className="mt-1 text-xs text-customPurple block"
                >
                  {showAll ? 'Hide All' : 'Show All'}
                </button>

                <AnimatePresence>
                  {showAll && (
                    <motion.div
                      className="bg-[#1c1c1c] rounded-xl px-2 max-h-[350px] overflow-auto"
                      initial={{ maxHeight: 0 }}
                      animate={{ maxHeight: '200px' }}
                      exit={{ maxHeight: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {categories
                        .filter((category) => !selectedItems.includes(category))
                        .map((category) => (
                          <motion.div
                            key={category}
                            className="cursor-pointer p-1 px-2 rounded hover:bg-[#333333]"
                            onClick={() => addCategory(category)}
                          >
                            {category}
                          </motion.div>
                        ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Selected Categories */}
      <div
        className={`mt-4 ${
          type === 'string'
            ? 'inline-flex gap-2 overflow-x-auto pb-1 whitespace-nowrap max-w-full'
            : 'inline-flex flex-wrap gap-2'
        } max-h-[240px] absolute top-10 left-0`}
      >
        {selectedItems.map((category, id) => (
          <PreferencesTag text={category} key={`${category}-${id}`} remove={handleRemoveCategory} />
        ))}
      </div>
    </div>
  );
};
