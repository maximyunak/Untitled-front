import { ReactNode } from 'react';

interface MyBtnProps {
  children: ReactNode;
  type?: string;
}

export const MyButton: React.FC<MyBtnProps> = ({ children, type }) => {
  return (
    <button
      className={`rounded-2xl border border-transparent ${
        type === 'outline' ? 'border-customPurple' : 'bg-customPurple'
      } px-3 py-1 text-sm font-medium`}
      type="button"
    >
      {children}
    </button>
  );
};
