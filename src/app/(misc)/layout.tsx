import type { ReactNode } from "react";

export default function MiscRoutesLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="container mx-auto flex h-screen flex-col px-4 pt-28 pb-6">
      {children}
    </div>
  );
}
