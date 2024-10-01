import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  reverseVariantsStepPages,
  showModalVariant,
  variantsStepPages,
  shakeVariants,
  selectEventVariants,
} from '@shared/animationProps.ts';
import { useAppDispatch, useAppSelector } from '@hooks';
import {
  selectType,
  selectVisibleCounty,
  setVisibleCountry,
} from '../../../store/registrationSlice.ts';

import selectIcon from '../arrowDown.svg';
import { setCountry, setEmail, setPassword } from '../../../store/authSlice.ts';
import { countries } from '@shared/constants.ts';
import { MyTitle } from '@shared/UI/MyTitle.tsx';
import { MySelect } from '@shared/UI/MySelect.tsx';

export const FirstStep = () => {
  const type = useAppSelector(selectType);
  const visibleCounty = useAppSelector(selectVisibleCounty);
  const user = useAppSelector((state) => state.authSlice);
  const [selectedCountry, setSelectedCountry] = useState<number>(0);
  // const currentCountry = selectCountry(useAppSelector((state) => state));

  const { emailError, passwordError } = useAppSelector((state) => state.authSlice);

  // const [emailError, setEmailError] = useState(false);
  // const [passwordError, setPasswordError] = useState(false);

  const modalRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  const dispatch = useAppDispatch();

  const toggleCountry = () => {
    dispatch(setVisibleCountry(!visibleCounty));
  };

  const changeEmail = (e: string) => {
    dispatch(setEmail(e));
  };

  const changePassword = (e: string) => {
    dispatch(setPassword(e));
  };

  const changeCountry = (e: number) => {
    dispatch(setVisibleCountry(false));
    setSelectedCountry(e);
    dispatch(setCountry(countries[e]));
  };

  useEffect(() => {
    const index = countries.findIndex((country) => country === user.country);
    setSelectedCountry(index !== -1 ? index : 0);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (
        modalRef.current &&
        !modalRef.current.contains(target) &&
        triggerRef.current &&
        !triggerRef.current.contains(target)
      ) {
        changeCountry(selectedCountry);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [changeCountry]);

  return (
    <motion.div
      variants={type === 0 ? variantsStepPages : reverseVariantsStepPages}
      animate={'opened'}
      key="stepX"
      initial={'initial'}
      exit={'closed'}
      transition={{
        duration: 0.2,
      }}
    >
      <form
        className="flex flex-col gap-4"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div>
          <MyTitle>Enter email</MyTitle>
          <input
            type="text"
            placeholder="Email"
            value={user.email}
            onChange={(e) => changeEmail(e.target.value)}
            className={`w-full border border-transparent py-1 px-3 border-gray-400 bg-[#282828] rounded-xl placeholder:text-sm hover:bg-[#272727] focus:border focus:border-customPurple transition-colors mt-1 duration-300 ${
              emailError ? 'border-red-600' : ''
            }`}
          />
          {emailError && <p className="absolute text-red-600 text-xs">Email is incorrect</p>}
        </div>

        <div className="">
          <MyTitle>Enter password</MyTitle>
          <input
            type="password"
            placeholder="Password"
            value={user.password}
            onChange={(e) => changePassword(e.target.value)}
            className={`w-full border border-transparent py-1 px-3 border-gray-400 bg-[#282828] rounded-xl placeholder:text-sm hover:bg-[#272727] focus:border focus:border-customPurple transition-colors mt-1 duration-300 ${
              passwordError ? 'border-red-600' : ''
            }`}
          />
          {passwordError && <p className="absolute text-red-600 text-xs">Password is required</p>}
        </div>

        <MySelect
          title="Select a country"
          items={countries} // Список стран
          isVisible={visibleCounty} // Видимость компонента выбора страны
          selected={selectedCountry} // Текущая выбранная страна
          setItem={changeCountry} // Обработчик выбора страны
          toggleVisible={toggleCountry} // Обработчик показа/скрытия списка стран
        />
      </form>
    </motion.div>
  );
};
