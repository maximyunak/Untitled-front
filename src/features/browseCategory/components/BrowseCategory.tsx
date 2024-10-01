import { MyButton } from '@shared/UI/MyButton';
import { Category } from './Category';
import { categories } from '@shared/constants';
import { Link } from 'react-router-dom';

export const BrowseCategory = () => {
  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="font-bold biorhyme text-xl">Browse By Category</h1>
        <Link to="/registration">
          <MyButton>Show More</MyButton>
        </Link>
      </div>
      <span className="h-[1px] mt-4 mb-8 w-full block bg-white opacity-70"></span>

      <div className="flex justify-center gap-10">
        {categories.map((el) => (
          <Category title={el.title} image={el.image} />
        ))}
      </div>
    </div>
  );
};
