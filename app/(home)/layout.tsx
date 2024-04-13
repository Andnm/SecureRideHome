"use client";
import GeneralHeader from "@/src/components/GeneralHeader/GeneralHeader";
import React from "react";

const HomeLayout = (props: { children: React.ReactNode }) => {
  return (
    <>
      <GeneralHeader />
      {props.children}
    </>
  );
};

export default HomeLayout;
