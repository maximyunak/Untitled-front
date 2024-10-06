import { useRef, useEffect, useState } from 'react';
import { Variant, motion } from 'framer-motion';
import { opacityVariant } from '@shared/animationProps';

export const MyCheckbox = ({ active }: { active: boolean }) => {
  const variants = {
    animate: {
      borderRadius: 6,
      background: '#8b74ff',
    },
    noAnimate: {
      borderRadius: 4,
      background: '#8b74ff00',
    },
  };

  return (
    <motion.div
      className="w-5 h-5 border-2  border-customPurple
  "
      // onClick={() => setActive(!active)}
      animate={active ? 'animate' : 'noAnimate'}
      variants={variants}
    >
      {/* <motion.div className="bg-customPurple h-full w-full"></motion.div> */}
      <div className="flex items-center justify-center -mt-[7px]">
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          width="32px"
          height="32px"
          variants={opacityVariant}
          animate={active ? 'animate' : 'initial'}
        >
          <path
            d="M13.071,24.358c-0.497,0-0.962-0.246-1.242-0.658c-2.339-3.45-4.751-5.873-7.373-7.405 c-0.715-0.418-0.956-1.337-0.538-2.052c0.417-0.715,1.336-0.958,2.052-0.538c2.529,1.478,4.856,3.627,7.071,6.539 c4.261-6.008,9.283-10.838,14.952-14.375c0.705-0.438,1.628-0.225,2.066,0.479c0.438,0.703,0.225,1.628-0.479,2.066 c-5.935,3.702-10.925,8.697-15.258,15.27c-0.276,0.419-0.742,0.672-1.243,0.675C13.077,24.358,13.074,24.358,13.071,24.358z"
            fill="#fff"
          />
        </motion.svg>
      </div>
    </motion.div>
  );
};
