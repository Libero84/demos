import { ReactNode } from "react";

interface ContainerProps {
  children: string | JSX.Element | ReactNode;
}
const Container: React.FC<ContainerProps> = ({ children }) => (
  <div className="bg-white border border-slate-200 rounded-lg p-10">
    {children}
  </div>
);

export default Container;
