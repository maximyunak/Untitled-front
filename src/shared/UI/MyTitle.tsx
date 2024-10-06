import { FC, ReactNode } from 'react';

interface IMyTitle {
  children: ReactNode;
  text?: string;
  onClick?: () => void;
}
export const MyTitle: FC<IMyTitle> = ({ children, text, onClick }) => {
  return (
    <h1 onClick={onClick} className={`text-${text ? text : 'lg'} font-medium biorhyme`}>
      {children}
    </h1>
  );
};
