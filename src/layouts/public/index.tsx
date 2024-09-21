"use client";

import { Header } from "./header";

interface PublicLayoutProps {
  title: string;
  description?: string;
}

const PublicLayout = ({
  title,
  description,
  children
}: React.PropsWithChildren<PublicLayoutProps>) => {
  return (
    <>
      <title>{`${title} | voluntariat`}</title>
      {description && <meta name="description" content={description} />}

      <Header />
      {children}
    </>
  );
};

export default PublicLayout;
