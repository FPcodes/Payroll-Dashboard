import { ReactNode } from 'react';

export default function MarginWidthWrapper({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="custom:ml-48 sm:border-r">
      {children}
    </div>
  );
}