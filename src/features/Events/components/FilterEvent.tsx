import { useAppDispatch, useAppSelector } from "@hooks";
import { categories, countries } from "@shared/constants";
import { MySelect2 } from "@shared/UI/MySelect2";
import { MyTitle } from "@shared/UI/MyTitle";
import { ChangeEvent, useState } from "react";
import {
  removeCategoryFilter,
  removeCountryFilter,
  setCategoryFilter,
  setCountryFilter,
  setTitleFilter,
} from "../store/eventSlice";
import { motion } from "framer-motion";

export const FilterEvent = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const [visibleCountry, setVisibleCountry] = useState<boolean>(false);
  const { selectedCategories, selectedCountries, titleFilter } = useAppSelector(
    (state) => state.eventSlice
  );
  const dispatch = useAppDispatch();

  const onAddCategory = (category: string) => {
    if (selectedCategories.includes(category)) {
      dispatch(removeCategoryFilter(category));
    } else {
      dispatch(setCategoryFilter(category));
    }
  };

  const onAddCountry = (country: string) => {
    if (selectedCountries.includes(country)) {
      dispatch(removeCountryFilter(country));
    } else {
      dispatch(setCountryFilter(country));
    }
  };

  const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setTitleFilter(e.target.value));
  };

  const variants = {
    initial: {
      opacity: 0,
      height: 0,
    },
    animate: {
      opacity: 1,
      height: "auto",
    },
  };

  return (
    <motion.div
      initial={"initial"}
      animate={"animate"}
      exit={"initial"}
      variants={variants}
      className="text-base"
    >
      <MyTitle text="xl">Filter</MyTitle>
      <div className="grid grid-cols-3">
        <div className="w-4/5">
          <MyTitle>Search By Title</MyTitle>
          <span className="w-3/4 my-1 block h-[1px] bg-white bg-opacity-70"></span>
          <input
            type="text"
            className="w-full border border-opacity-70 border-white py-1 px-3 bg-[#282828] rounded-lg placeholder:text-sm hover:bg-[#272727] focus:border focus:border-customPurple transition-colors mt-1 duration-300"
            placeholder="Search by title"
            value={titleFilter}
            onChange={changeTitle}
          />
        </div>
        <div className="w-4/5">
          <MyTitle>Search By Country</MyTitle>
          <span className="w-3/4 my-1 block h-[1px] bg-white bg-opacity-70"></span>
          {/* <input
            type="text"
            className="w-full border border-opacity-70 border-white py-1 px-3 bg-[#282828] rounded-lg placeholder:text-sm hover:bg-[#272727] focus:border focus:border-customPurple transition-colors mt-1 duration-300"
            placeholder="Search by title"
          /> */}
          <MySelect2
            items={countries}
            visible={visibleCountry}
            setVisible={setVisibleCountry}
            onAdd={onAddCountry}
            selectedItems={selectedCountries}
          />
        </div>
        <div className="w-4/5">
          <MyTitle>Search By Category</MyTitle>
          <span className="w-3/4 my-1 block h-[1px] bg-white bg-opacity-70"></span>

          <MySelect2
            items={categories}
            visible={visible}
            setVisible={setVisible}
            onAdd={onAddCategory}
            selectedItems={selectedCategories}
          />
        </div>
        <h4 className="self">clear</h4>
      </div>
      <span className="h-[1px] mt-4 mb-8 w-full block bg-white opacity-70"></span>
    </motion.div>
  );
};
