import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  mouseEventVariants,
  reverseVariantsStepPages,
  selectEventVariants,
  shakeVariants,
  showModalVariant,
  months,
  years,
  variantsStepPages,
} from "../../../helpers/constants.ts";
import { useAppSelector } from "../../../../../store/hooks.ts";
import { selectType } from "../../../store/registrationSlice.ts";

import selectIcon from "../arrowDown.svg";
import { useNavigate } from "react-router-dom";

function getDaysInMonth(month: string, year: number): number {
  const monthIndex = months.indexOf(month); // Получаем индекс месяца (0-11)
  return new Date(year, monthIndex + 1, 0).getDate();
}

export const SecondStep: React.FC = () => {
  const type = useAppSelector(selectType);
  // const navigate = useNavigate();
  // navigate("/registration/2");

  const [visible, setVisible] = useState({
    day: false,
    month: false,
    year: false,
  });

  const [selectedDay, setSelectedDay] = useState<number>(1);
  const [selectedMonth, setSelectedMonth] = useState<string>("January");
  const [selectedYear, setSelectedYear] = useState<number>(2000);
  const [daysInMonth, setDaysInMonth] = useState<number[]>([]);

  const dayRef = useRef<HTMLDivElement>(null);
  const monthRef = useRef<HTMLDivElement>(null);
  const yearRef = useRef<HTMLDivElement>(null);

  // Обновляем дни месяца при изменении месяца или года
  useEffect(() => {
    const daysCount = getDaysInMonth(selectedMonth, selectedYear);
    const daysArray = Array.from({ length: daysCount }, (_, i) => i + 1);
    setDaysInMonth(daysArray);

    // Если выбранный день больше максимального в новом месяце, сбрасываем на 1
    if (selectedDay > daysCount) {
      setSelectedDay(1);
    }
  }, [selectedMonth, selectedYear]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (
        !(dayRef.current && dayRef.current.contains(target)) &&
        !(monthRef.current && monthRef.current.contains(target)) &&
        !(yearRef.current && yearRef.current.contains(target))
      ) {
        setVisible({ day: false, month: false, year: false });
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleOptionClick = (
    field: keyof typeof visible,
    value: number | string
  ) => {
    if (field === "day") setSelectedDay(value as number);
    if (field === "month") setSelectedMonth(value as string);
    if (field === "year") setSelectedYear(value as number);
    handleCloseModals();
  };

  const handleCloseModals = () => {
    setVisible({
      day: false,
      month: false,
      year: false,
    });
  };

  const toggleVisibility = (field: keyof typeof visible) => {
    setVisible((prevState) => ({
      day: field === "day" ? !prevState.day : false,
      month: field === "month" ? !prevState.month : false,
      year: field === "year" ? !prevState.year : false,
    }));
  };

  return (
    <motion.div
      key="stepX"
      variants={type === 0 ? variantsStepPages : reverseVariantsStepPages}
      animate={"opened"}
      initial={"initial"}
      exit={"closed"}
      transition={{
        duration: 0.2,
      }}
    >
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-lg font-medium biorhyme">Enter first name</h1>
          <input
            type="text"
            placeholder="First name"
            className=" w-full border border-transparent py-1 px-3 border-gray-400 bg-[#282828] rounded-xl placeholder:text-sm hover:bg-[#272727] focus:border focus:border-customPurple transition-colors mt-1 duration-300"
          />
        </div>
        <div>
          <h1 className="text-lg font-medium biorhyme">Enter last name</h1>
          <input
            type="text"
            placeholder="Last name"
            className=" w-full border border-transparent py-1 px-3 border-gray-400 bg-[#282828] rounded-xl placeholder:text-sm hover:bg-[#272727] focus:border focus:border-customPurple transition-colors mt-1 duration-300"
          />
        </div>
        <div>
          <h1 className="text-lg font-medium biorhyme">
            Enter your date of birth
          </h1>
          <div className="flex gap-2 mt-2 items-center w-full justify-between">
            {/* Day Selector */}
            <motion.div
              whileHover={visible.day ? { scale: 1 } : "hover"}
              whileTap={visible.day ? { scale: 1 } : "tap"}
              variants={mouseEventVariants}
              ref={dayRef}
              className="bg-[#282828] rounded-xl py-2 px-5 cursor-pointer w-[81px] flex gap-3 justify-between relative z-50"
              onClick={() => toggleVisibility("day")}
            >
              {selectedDay}
              <motion.img
                src={selectIcon}
                alt=""
                className="invert w-3"
                variants={shakeVariants}
                animate={visible.day ? "visible" : { rotate: 0 }}
              />
              <AnimatePresence>
                {visible.day && (
                  <motion.div
                    className="bg-[#282828] rounded-xl py-3 px-4 w-full absolute top-[50px] left-0 flex flex-col gap-2 overflow-y-auto max-h-52 z-10"
                    variants={showModalVariant}
                    animate="animate"
                    exit="initial"
                    initial="initial"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {daysInMonth.map((day) => (
                      <motion.div
                        key={day}
                        onClick={() => handleOptionClick("day", day)}
                        variants={selectEventVariants}
                        whileHover={"hover"}
                        whileTap={"tap"}
                        className="cursor-pointer"
                      >
                        {day}
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Month Selector */}
            <motion.div
              whileHover={visible.month ? { scale: 1 } : "hover"}
              whileTap={visible.month ? { scale: 1 } : "tap"}
              variants={mouseEventVariants}
              ref={monthRef}
              className="bg-[#282828] rounded-xl py-2 px-4 cursor-pointer w-[160px] flex gap-3 justify-between relative z-50"
              onClick={() => toggleVisibility("month")}
            >
              {selectedMonth}
              <motion.img
                src={selectIcon}
                alt=""
                className="invert w-3"
                variants={shakeVariants}
                animate={visible.month ? "visible" : { rotate: 0 }}
              />
              <AnimatePresence>
                {visible.month && (
                  <motion.div
                    className="bg-[#282828] rounded-xl py-3 px-4 w-full absolute top-[50px] left-0 flex flex-col gap-2 overflow-y-auto max-h-52 z-10"
                    variants={showModalVariant}
                    animate="animate"
                    exit="initial"
                    initial="initial"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {months.map((month) => (
                      <motion.div
                        key={month}
                        onClick={() => handleOptionClick("month", month)}
                        variants={selectEventVariants}
                        whileHover={"hover"}
                        whileTap={"tap"}
                        className="cursor-pointer"
                      >
                        {month}
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Year Selector */}
            <motion.div
              whileHover={visible.year ? { scale: 1 } : "hover"}
              whileTap={visible.year ? { scale: 1 } : "tap"}
              variants={mouseEventVariants}
              ref={yearRef}
              className="bg-[#282828] rounded-xl py-2 px-4 cursor-pointer w-[115px] flex gap-3 justify-between relative"
              onClick={() => toggleVisibility("year")}
            >
              {selectedYear}
              <motion.img
                src={selectIcon}
                alt=""
                className="invert w-3"
                variants={shakeVariants}
                animate={visible.year ? "visible" : { rotate: 0 }}
              />
              <AnimatePresence>
                {visible.year && (
                  <motion.div
                    className="bg-[#282828] rounded-xl py-3 px-4 w-full absolute top-[50px] left-0 flex flex-col gap-4 overflow-y-auto h-52"
                    variants={showModalVariant}
                    animate="animate"
                    exit="initial"
                    initial="initial"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {years.map((year) => (
                      <motion.div
                        key={year}
                        onClick={() => handleOptionClick("year", year)}
                        variants={selectEventVariants}
                        whileHover={"hover"}
                        whileTap={"tap"}
                        className="cursor-pointer"
                      >
                        {year}
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
