interface CategoryProps {
  title: string;
  image: string;
}

export const Category: React.FC<CategoryProps> = ({ title, image }) => {
  return (
    <div className="relative inline-block cursor-pointer hover:opacity-85 transition-opacity duration-300">
      <img src={image} alt={title} className="rounded-3xl" />
      <h3 className="absolute right-1/2 translate-x-1/2 -translate-y-1/2 rounded-2xl border-[4px] bg-[#232222] border-[#282828] px-3 py- font-bold text-base">
        {title}
      </h3>
    </div>
  );
};
