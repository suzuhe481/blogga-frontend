import { useState, useEffect, useRef } from "react";

interface IProps {
  children: React.ReactNode;
  isOpen: boolean;
}

const ExpandingHeightContainer = ({ children, isOpen }: IProps) => {
  const [containerHeight, setContainerHeight] = useState<string>("0px");

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      setContainerHeight(
        isOpen ? `${containerRef.current.scrollHeight}px` : "0px"
      );
    }
    // Children is in dependency so that if changes occur in the children's content,
    // the container will be resized.
  }, [isOpen, children]);

  return (
    <div
      ref={containerRef}
      style={{ maxHeight: containerHeight }}
      className="transition-all overflow-hidden"
    >
      {children}
    </div>
  );
};

export default ExpandingHeightContainer;
