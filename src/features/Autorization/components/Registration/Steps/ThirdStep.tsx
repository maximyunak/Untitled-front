import React, { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  reverseVariantsStepPages,
  variantsStepPages,
} from "@shared/animationProps.ts";
import { useAppSelector, useAppDispatch } from "../../../../../store/hooks.ts";
import { selectType } from "../../../store/registrationSlice.ts";
import { PreferencesTag } from "./PreferencesTag.tsx";
import { selectPreferences, addPreference } from "../../../store/authSlice.ts";

export const ThirdStep = () => {
  const preferences = useAppSelector(selectPreferences);
  const type = useAppSelector(selectType);
  const dispatch = useAppDispatch();
  const [inputValue, setInputValue] = useState("");
  const [categories] = useState([
    "IT",
    "Design",
    "Marketing",
    "Development",
    "Finance",
    "Music",
    "Art",
    "Sport",
  ]);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [showAll, setShowAll] = useState(false); // состояние для показа всех категорий
  const [isVisible, setIsVisible] = useState(false); // состояние для видимости подсказки
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Фильтруем категории на основе введенного текста и того, что их нет в preferences
  const filteredCategories = categories.filter(
    (category) =>
      category.toLowerCase().includes(inputValue.toLowerCase()) &&
      !preferences.includes(category)
  );

  const addCategory = (category: string) => {
    dispatch(addPreference(category));
    setHighlightedIndex(-1);
    setShowAll(false);
    setInputValue("");
    setIsVisible(false);
  };

  // Плавная анимация для ховера на категорию
  const categoryVariants = {
    initial: { opacity: 0, y: -10 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    hover: { backgroundColor: "#333333", transition: { duration: 0.3 } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.3 } },
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && filteredCategories.length > 0 && inputValue) {
      if (highlightedIndex >= 0) {
        addCategory(filteredCategories[highlightedIndex]);
      } else {
        addCategory(filteredCategories[0]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev < filteredCategories.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev > 0 ? prev - 1 : filteredCategories.length - 1
      );
    }
  };

  const handleMouseEnter = (index: number) => {
    setHighlightedIndex(index);
  };

  // Закрытие подсказки при клике вне её
  const handleClickOutside = (event: MouseEvent) => {
    if (
      containerRef.current &&
      !containerRef.current.contains(event.target as Node)
    ) {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    // Добавляем обработчик клика
    if (isVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      // Удаляем обработчик клика
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isVisible]);

  return (
    <motion.div
      key="stepX"
      variants={type === 0 ? variantsStepPages : reverseVariantsStepPages}
      animate={"opened"}
      initial={"initial"}
      exit={"closed"}
      transition={{ duration: 0.2 }}
    >
      <div>
        <h1 className="text-lg font-medium biorhyme">Enter your preferences</h1>
        <input
          type="text"
          placeholder="Enter preference"
          className="w-full border border-transparent py-1 px-3 border-gray-400 bg-[#282828] rounded-xl placeholder:text-sm hover:bg-[#272727] focus:border focus:border-customPurple transition-colors mt-1 duration-300"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            setIsVisible(true); // Показываем подсказку при изменении ввода
          }}
          onKeyDown={handleKeyDown}
        />
      </div>

      {/* Список подсказок */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            ref={containerRef}
            className="mt-2 bg-[#1c1c1c] rounded-xl p-2 absolute overflow-auto z-50 shadow-2xl"
            initial={{ opacity: 0, y: -10, maxHeight: 0 }}
            animate={{
              opacity: 1,
              y: 0,
              maxHeight: showAll ? "400px" : "150px",
            }}
            exit={{ opacity: 0, y: -10, maxHeight: 0 }}
            transition={{ duration: 0.3 }}
          >
            {filteredCategories.length > 0 ? (
              filteredCategories.map((category, index) => (
                <motion.div
                  key={category}
                  className={`cursor-pointer p-1 rounded ${
                    index === highlightedIndex ? "bg-[#333333]" : ""
                  } shadow-2xl`}
                  onClick={() => addCategory(category)}
                  onMouseEnter={() => handleMouseEnter(index)}
                  variants={categoryVariants}
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
                <div className="text-gray-400">
                  No matching categories found
                </div>
                {/* Кнопка "Показать все" */}
                <button
                  onClick={() => setShowAll((prev) => !prev)}
                  className="mt-1 text-xs text-customPurple block"
                >
                  {showAll ? "Hide All" : "Show All"}
                </button>
                {/* Все категории (при показе) */}
                <AnimatePresence>
                  {showAll && (
                    <motion.div
                      className="bg-[#1c1c1c] rounded-xl px-2 max-h-[350px] overflow-auto"
                      initial={{
                        paddingTop: 0,
                        marginBottom: 0,
                        marginTop: 0,
                        maxHeight: 0,
                      }}
                      animate={{
                        paddingTop: 3,
                        marginTop: 8,
                        marginBottom: 2,
                        maxHeight: "200px",
                      }}
                      exit={{
                        paddingTop: 0,
                        marginTop: 0,
                        marginBottom: 0,
                        maxHeight: 0,
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {categories
                        .filter((category) => !preferences.includes(category)) // Фильтруем все категории, чтобы не показывать уже выбранные
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

      {/* Выбранные категории */}
      <div className="mt-4 inline-flex flex-wrap gap-2 overflow-auto max-h-[240px]">
        {preferences.map((category: string) => (
          <PreferencesTag key={category} text={category} />
        ))}
      </div>
    </motion.div>
  );
};
