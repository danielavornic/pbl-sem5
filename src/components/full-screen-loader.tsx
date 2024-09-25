import Image from "next/image";

export const FullScreenLoader = () => {
  return (
    <div className="fixed right-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-secondary-foreground">
      <div className="w-[200px] animate-pulse rounded-full duration-1000">
        <Image
          src="/logo.svg"
          className="object-contain"
          width={0}
          height={0}
          priority
          sizes="100vw"
          style={{ width: "100%", height: "auto" }}
          alt="Volunratiat Moldova"
        />
      </div>
    </div>
  );
};
