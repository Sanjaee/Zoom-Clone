"use client";

import React from "react";
import Header from "@/components/header";
import { Spotlight } from "@/components/ui/Spotlight";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import useCurrentUser from "@/hooks/use-current-user";
import { ColourfulText } from "@/components/ui/colourful-text";
import { HoverBorderGradientDemo } from "@/components/ui/HoverBorderGradientDemo";
import { LinkPreviewDemo } from "@/components/ui/LinkPreviewDemo";

const Page = () => {
  const user = useCurrentUser();

  return (
    <div className="flex flex-col w-full h-full relative overflow-x-hidden">
      <Header />
      <div className="flex-1 w-full h-full flex md:items-center md:justify-center relative">
        <Spotlight
          className="-top-40 left-0 md:left-60 md:-top-20"
          fill="gray"
        />
        <div className=" p-4 max-w-7xl  m-auto relative z-10  w-full  md:pt-0">
          <h1 className="text-4xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-gray-400 to-gray-950 bg-opacity-50">
            <ColourfulText text="Connect" /> <br /> Anywhere, Anytime.
          </h1>
          <p className="mt-5 font-normal text-base max-w-lg text-center mx-auto">
            Bring your team together, share your ideas, and celebrate every
            moment-anytime, anywhere with the ease and reliability of google
            meet.
          </p>
          <div className="flex items-center justify-center">
            <HoverBorderGradientDemo />
          </div>
          <div className="flex items-center justify-center">
            <LinkPreviewDemo />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
