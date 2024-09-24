"use client";

import { Footer } from "./footer";
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
    <div className="flex h-full flex-col">
      <title>{`${title} | voluntariat`}</title>
      {description && <meta name="description" content={description} />}

      <Header />
      <div className="min-h-screen flex-1">{children}</div>
      <Footer />
    </div>
  );
};

export default PublicLayout;
