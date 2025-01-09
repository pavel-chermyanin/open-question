import React, {useRef, ReactNode} from 'react';

interface DrawerSelectWrapperProps {
  children: ReactNode;
  className?: string;
}

export const DrawerSelectWrapper: React.FC<DrawerSelectWrapperProps> = ({children, className}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  return (
    <div ref={containerRef} className={className} style={{position: 'relative'}}>
      {React.Children.map(children, (child) => {
        // Проверяем, что это корректный элемент и добавляем проверку на наличие container
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement<{ container: () => HTMLElement | undefined }>, {
            container: () => containerRef.current || undefined,
          });
        }
        return child;
      })}
    </div>
  );
};
