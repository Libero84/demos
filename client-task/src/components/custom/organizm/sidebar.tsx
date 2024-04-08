import { ReactNode, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

import { MdClose } from "react-icons/md";

interface SidebarProps {
  children: string | JSX.Element | ReactNode;
  show: boolean;
  onClose?: () => void;
  selector: string;
}

const Sidebar: React.FC<SidebarProps> = ({
  show,
  selector,
  onClose,
  children,
}) => {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    ref.current = document.getElementById(selector);
  }, [selector]);

  return show && ref.current
    ? createPortal(
        <div className="fixed top-0 bottom-0 w-96 right-0 bg-white z-50 p-8 shadow flex flex-col">
          <button type="button" className="ml-auto" onClick={onClose}>
            <MdClose />
          </button>
          {children}
        </div>,
        ref.current
      )
    : null;
};

export default Sidebar;
