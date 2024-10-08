import { countries } from "@shared/constants"; // Предполагаю, что `countries` — это массив стран
import { FC, useRef, useState } from "react";
import { MySelect } from "@shared/UI/MySelect"; // Ваш компонент для выбора страны
import { MyTags } from "@shared/UI/MyTags"; // Компонент с тегами (категориями)
import { MyTitle } from "@shared/UI/MyTitle";
import { authApi } from "@shared/api/authApi";
import { eventApi } from "@shared/api/eventApi";
import { motion } from "framer-motion";
import { opacityVariant, showModalVariant } from "@shared/animationProps";
import { useClickOutside } from "@shared/hooks/useClickOutside";

interface ICreateEventProps {
  closeModal: () => void;
  containerRef: React.RefObject<HTMLElement>;
}

export const CreateEvent: FC<ICreateEventProps> = ({
  closeModal,
  containerRef,
}) => {
  const { data: user } = authApi.useFetchUserQuery();
  const [createEvent, { isError }] = eventApi.useCreateEventMutation();

  const [visibleCounty, setVisibleCounty] = useState(false); // Состояние для видимости выбора страны
  const [selectedCountry, setSelectedCountry] = useState(0); // Состояние для выбранной страны
  const [eventTitle, setEventTitle] = useState(""); // Состояние для заголовка события
  const [eventDescription, setEventDescription] = useState(""); // Состояние для описания события

  const [titleError, setTitleError] = useState(false);
  const [descError, setDescError] = useState(false);

  const [categories, setCategories] = useState<string[]>([]);

  const modalRef = useRef<HTMLDivElement>(null);

  useClickOutside([containerRef, modalRef], closeModal);

  const clearData = () => {
    setVisibleCounty(false);
    setSelectedCountry(0);
    setEventTitle("");
    setEventDescription("");
  };

  const handleAddCategory = (category: string) => {
    if (!categories.includes(category)) {
      setCategories([...categories, category]);
    }
  };

  const handleRemoveCategory = (category: string) => {
    setCategories(categories.filter((item) => item !== category));
  };

  const toggleCountry = (index: number) => {
    setSelectedCountry(index); // Выбор страны
  };

  const toggleVisible = (b = !visibleCounty) => {
    setVisibleCounty(b); // Показать/скрыть выбор страны
  };

  const handleCreate = () => {
    // Создаем экземпляр FormData

    // Добавляем заголовок события

    if (eventTitle.length < 2) {
      setTitleError(true);
    } else {
      setTitleError(false);
    }

    if (eventDescription.length < 2) {
      setDescError(true);
    } else {
      setDescError(false);
    }

    if (user && eventTitle && eventDescription) {
      try {
        const data = {
          email: user.email,
          title: eventTitle,
          description: eventDescription,
          country: countries[selectedCountry],
          eventTypes: categories,
        };
        createEvent(data);
        closeModal();
        clearData();
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    // <div className="min-w-screen min-h-screen bg-[#282828] text-white text-base absolute top-0 left-0">
    <motion.div
      initial={"initial"}
      exit={"initial"}
      animate={"animate"}
      variants={opacityVariant}
      className="min-w-screen min-h-screen bottom-0 right-0 z-[500] bg-[#28282890] text-white text-base fixed top-0 left-0 flex items-center justify-center flex-col"
    >
      <motion.div
        ref={modalRef}
        initial={"initial"}
        animate={"animate"}
        exit={"initial"}
        variants={showModalVariant}
        className="w-[400px] p-5 rounded-3xl overflow-hiden shadow-xl bg-[#303030]"
      >
        <h1 className="text-2xl text-center font-bold mt-2 biorhyme">
          Create Event
        </h1>

        {/* Заголовок события */}
        <div className="relative mb-4">
          <h1 className="text-lg font-medium biorhyme mt-4">
            Enter an event title
          </h1>
          <input
            type="text"
            placeholder="Event Title"
            value={eventTitle} // Привязка к состоянию eventTitle
            onChange={(e) => setEventTitle(e.target.value)} // Обновление состояния заголовка
            className="w-full border border-transparent py-1 px-3 border-gray-400 bg-[#282828] rounded-xl placeholder:text-sm hover:bg-[#272727] focus:border focus:border-customPurple transition-colors mt-1 duration-300"
          />
          {titleError && (
            <p className="absolute text-red-600 text-xs">
              The title is required
            </p>
          )}
        </div>

        {/* Выбор страны */}
        <MySelect
          title="Select a country"
          items={countries} // Список стран
          isVisible={visibleCounty} // Видимость компонента выбора страны
          selected={selectedCountry} // Текущая выбранная страна
          setItem={toggleCountry} // Обработчик выбора страны
          toggleVisible={toggleVisible} // Обработчик показа/скрытия списка стран
        />

        {/* Описание события */}
        <div className="relative mb-4">
          <h1 className="text-lg font-medium biorhyme mt-4">
            Enter an event description
          </h1>
          <textarea
            placeholder="Event Description"
            value={eventDescription} // Привязка к состоянию eventDescription
            onChange={(e) => setEventDescription(e.target.value)} // Обновление состояния описания
            className="w-full border border-transparent py-1 px-3 border-gray-400 bg-[#282828] rounded-xl placeholder:text-sm hover:bg-[#272727] focus:border focus:border-customPurple transition-colors mt-1 duration-300 outline-none resize-none"
          />
          {descError && (
            <p className="absolute text-red-600 text-xs -mt-1">
              The description is required
            </p>
          )}
        </div>

        {/* Выбранные категории */}
        <MyTitle>Enter event Category</MyTitle>
        <MyTags
          selectedItems={categories}
          placeholder="Enter event categories up to 3"
          handleRemoveCategory={handleRemoveCategory}
          handleAddCategory={handleAddCategory}
          type="string"
        />

        {/* Кнопка для создания события */}
        <div className="flex gap-2">
          <button
            className="mt-16 rounded-xl bg-white px-3 py-2 text-black text-base"
            onClick={closeModal}
          >
            Close
          </button>
          <button
            className="mt-16 rounded-xl bg-customPurple px-3 py-2 text-base w-full font-medium"
            onClick={handleCreate}
          >
            Create
          </button>
        </div>
      </motion.div>
    </motion.div>
    // </div>
  );
};
