"use client";

import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

export const ProgressBarProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
      <ProgressBar height="4px" color="#be99ff" options={{ showSpinner: false }} shallowRouting />
    </>
  );
};

export default ProgressBarProvider;
