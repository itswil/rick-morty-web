import type { ReactNode } from "react";
import { Nav } from "@/components/Nav";

type LayoutProps = {
  children: ReactNode;
};

export const LayoutHome = ({ children }: LayoutProps) => {
  return (
    <div className="max-w-screen-lg	mx-auto">
      <Nav />
      {children}
    </div>
  );
};
