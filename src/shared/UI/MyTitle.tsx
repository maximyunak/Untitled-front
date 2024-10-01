import { FC, ReactNode } from 'react';

interface IMyTitle {
  children: ReactNode;
  text?: string;
}
export const MyTitle: FC<IMyTitle> = ({ children, text }) => {
  return <h1 className={`text-${text ? text : 'lg'} font-medium biorhyme`}>{children}</h1>;
};
