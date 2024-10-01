import React from 'react';
import { motion } from 'framer-motion';
import { useAppSelector, useAppDispatch } from '../../../../../store/hooks.ts';
import { selectType } from '../../../store/registrationSlice.ts';
import { selectPreferences, addPreference, removePreference } from '../../../store/authSlice.ts';
import { reverseVariantsStepPages, variantsStepPages } from '@shared/animationProps.ts';
import { MyTags } from '@shared/UI/MyTags.tsx';
import { MyTitle } from '@shared/UI/MyTitle.tsx';

export const ThirdStep = () => {
  const preferences = useAppSelector(selectPreferences);
  const type = useAppSelector(selectType);
  const dispatch = useAppDispatch();

  const handleAddCategory = (category: string) => {
    dispatch(addPreference(category));
  };

  const handleRemoveCategory = (category: string) => {
    dispatch(removePreference(category));
  };

  return (
    <motion.div
      key="stepX"
      variants={type === 0 ? variantsStepPages : reverseVariantsStepPages}
      animate={'opened'}
      initial={'initial'}
      exit={'closed'}
      transition={{ duration: 0.2 }}
    >
      <MyTitle>Enter your preferences</MyTitle>

      <MyTags
        selectedItems={preferences}
        placeholder="Enter preference"
        handleAddCategory={handleAddCategory}
        handleRemoveCategory={handleRemoveCategory}
      />
    </motion.div>
  );
};
