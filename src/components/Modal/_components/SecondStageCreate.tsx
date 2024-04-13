import React from "react";

interface SecondStageProps {
  formIdentityData: any;
  setFormIdentityData: any;
  formIdentityFrontImageData: any;
  setFormIdentityFrontImageData: any;
  formIdentityBehindImageData: any;
  setFormIdentityBehindImageData: any;
}

const SecondStageCreate: React.FC<SecondStageProps> = ({
  formIdentityData,
  setFormIdentityData,
  formIdentityFrontImageData,
  setFormIdentityFrontImageData,
  formIdentityBehindImageData,
  setFormIdentityBehindImageData,
}) => {
  return (
    <div className="stage-container flex flex-col justify-center items-center"></div>
  );
};

export default SecondStageCreate;
