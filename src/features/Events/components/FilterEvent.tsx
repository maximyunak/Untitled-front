import { MySelect2 } from '@shared/UI/MySelect2';
import { MyTags } from '@shared/UI/MyTags';
import { MyTitle } from '@shared/UI/MyTitle';
import { useState } from 'react';

export const FilterEvent = () => {
  return (
    <div className="text-base">
      <MyTitle text="xl">Filter</MyTitle>
      <div className="grid grid-cols-3">
        <div className="w-4/5">
          <MyTitle>Search By Title</MyTitle>
          <span className="w-3/4 my-1 block h-[1px] bg-white bg-opacity-70"></span>
          <input
            type="text"
            className="w-full border border-opacity-70 border-white py-1 px-3 bg-[#282828] rounded-lg placeholder:text-sm hover:bg-[#272727] focus:border focus:border-customPurple transition-colors mt-1 duration-300"
            placeholder="Search by title"
          />
        </div>
        <div className="w-4/5">
          <MyTitle>Search By Country</MyTitle>
          <span className="w-3/4 my-1 block h-[1px] bg-white bg-opacity-70"></span>
          <input
            type="text"
            className="w-full border border-opacity-70 border-white py-1 px-3 bg-[#282828] rounded-lg placeholder:text-sm hover:bg-[#272727] focus:border focus:border-customPurple transition-colors mt-1 duration-300"
            placeholder="Search by title"
          />
        </div>
        <div className="w-4/5">
          <MyTitle>Search By Category</MyTitle>
          <span className="w-3/4 my-1 block h-[1px] bg-white bg-opacity-70"></span>

          <MySelect2 />
        </div>
      </div>
    </div>
  );
};
