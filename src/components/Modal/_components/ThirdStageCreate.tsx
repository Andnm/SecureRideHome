"use client";

import { truncateString } from "@/src/utils/handleFunction";
import React from "react";
import { useDropzone } from "react-dropzone";
import { FiUploadCloud } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";

interface ThirdStageProps {
  formDlcData: any;
  setFormDlcData: any;
  formDlcFrontImgData: any;
  setFormDlcFrontImgData: any;
  formDlcBehindImgData: any;
  setFormDlcBehindImgData: any;
}

const ThirdStageCreate: React.FC<ThirdStageProps> = ({
  formDlcData,
  setFormDlcData,
  formDlcFrontImgData,
  setFormDlcFrontImgData,
  formDlcBehindImgData,
  setFormDlcBehindImgData,
}) => {
  return (
    <div className="stage-container flex flex-col justify-center items-center"></div>
  );
};

export default ThirdStageCreate;
