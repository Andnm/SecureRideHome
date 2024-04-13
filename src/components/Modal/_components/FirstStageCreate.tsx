import React, { useState } from "react";

interface FirstStageProps {
  formInfoData: any;
  setFormInfoData: any;
}

const FirstStageCreate: React.FC<FirstStageProps> = ({
  formInfoData,
  setFormInfoData,
}) => {
  return (
    <div className="stage-container flex flex-col justify-center items-center"></div>
  );
};

export default FirstStageCreate;
