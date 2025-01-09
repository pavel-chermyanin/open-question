import { Heading as HeadingRsuite } from "rsuite";

type CustomHeadingProps = {
  children: React.ReactNode;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  className?: string
}

const headingSizes: { [key: number]: string } = {
  1: 'text-6xl',
  2: 'text-5xl',
  3: 'text-4xl',
  4: 'text-3xl',
  5: 'text-2xl',
  6: 'text-xl',
};

export const Heading = ({ children, level = 6 ,className}: CustomHeadingProps) => {
  const sizeClass = headingSizes[level];

  return (
    <HeadingRsuite level={level} className={`${className} ${sizeClass}`}>
      {children}
    </HeadingRsuite>
  );
}
