"use client";

import { truncateString } from "@/src/utils/handleFunction";
import DatePicker, { registerLocale, setDefaultLocale } from "react-datepicker";
import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { FiUploadCloud } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import InputTextField from "../../InputTextField/page";

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
  const handleOnChange = (e: any) => {
    const { name, value } = e.target;

    if (name === "identityCardNumber") {
      if (/^\d*$/.test(value)) {
        setFormDlcData({
          ...formDlcData,
          [name]: value,
        });
      }
    } else {
      setFormDlcData({
        ...formDlcData,
        [name]: value,
      });
    }
  };

  // xử lý ảnh mặt trước
  const [imageFront, setImageFront] = useState<any>();

  const handleOnDropFrontImage = (acceptedFiles: any) => {
    const file = acceptedFiles[0];
    setFormDlcFrontImgData({
      ...formDlcFrontImgData,
      file: file,
    });
    previewFrontImage(file);
  };

  const {
    getRootProps: getRootPropsFrontImage,
    getInputProps: getInputPropsFrontImage,
    isFocused: isFocusedFrontImage,
    isDragAccept: isDragAcceptFrontImage,
    isDragReject: isDragRejectFrontImage,
    acceptedFiles: acceptedFilesFrontImage,
    fileRejections: fileRejectionsFrontImage,
  } = useDropzone({
    onDrop: handleOnDropFrontImage,
  });

  const previewFrontImage = (file: any) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      if (e.target) {
        const imageUrl = e.target.result as string;

        setImageFront({
          ...file,
          previewUrl: imageUrl,
        });
      }
    };
  };

  const removeFrontImage = () => {
    setImageFront("");
    setFormDlcFrontImgData({
      ...formDlcFrontImgData,
      file: "",
    });
  };

  // xử lý ảnh mặt sau
  const [imageBehind, setImageBehind] = useState<any>();

  const handleOnDropBehindImage = (acceptedFiles: any) => {
    const file = acceptedFiles[0];
    setFormDlcBehindImgData({
      ...formDlcBehindImgData,
      file: file,
    });
    previewBehindImage(file);
  };

  const {
    getRootProps: getRootPropsBehindImage,
    getInputProps: getInputPropsBehindImage,
    isFocused: isFocusedBehindImage,
    isDragAccept: isDragAcceptBehindImage,
    isDragReject: isDragRejectBehindImage,
    acceptedFiles: acceptedFilesBehindImage,
    fileRejections: fileRejectionsBehindImage,
  } = useDropzone({
    onDrop: handleOnDropBehindImage,
  });

  const previewBehindImage = (file: any) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      if (e.target) {
        const imageUrl = e.target.result as string;

        setImageBehind({
          ...file,
          previewUrl: imageUrl,
        });
      }
    };
  };

  const removeBehindImage = () => {
    setImageBehind("");
    setFormDlcBehindImgData({
      ...formDlcBehindImgData,
      file: "",
    });
  };

  return (
    <div className="stage-container flex flex-col justify-center items-center">
      <div className="w-1/2">
        <InputTextField
          label="Hạng bằng lái xe"
          name="type"
          value={formDlcData.type}
          handleOnChange={handleOnChange}
          required={true}
        />
      </div>

      <div className="grid grid-cols-2 w-9/12 gap-8 mt-6">
        <div className="relative">
          <p className="absolute left-3 -top-3 z-20 bg-white w-fit px-2">
            Ngày cấp <span className="text-red-700">*</span>
          </p>
          <DatePicker
            className="cursor-pointer border"
            showIcon
            selected={formDlcData.issueDate}
            dateFormat="yyyy-MM-dd"
            onChange={(date) =>
              setFormDlcData({
                ...formDlcData,
                issueDate: date,
              })
            }
            placeholderText=" "
          />
        </div>

        <div className="relative">
          <p className="absolute left-3 -top-3 z-20 bg-white w-fit px-2">
            Ngày hết hạn <span className="text-red-700">*</span>
          </p>
          <DatePicker
            className="cursor-pointer border"
            showIcon
            selected={formDlcData.expriedDate}
            dateFormat="yyyy-MM-dd"
            onChange={(date) =>
              setFormDlcData({
                ...formDlcData,
                expriedDate: date,
              })
            }
            placeholderText=" "
          />
        </div>
      </div>

      <div className="grid grid-cols-2 w-9/12 gap-8">
        <div className="w-full relative mt-6">
          <p className=" text-left w-[139px] absolute -top-1 left-0 right-[300px] bg-white pt-0 pr-2 pb-0 pl-2 mr-0 mb-0 ml-2 font-medium text-gray-600">
            Ảnh mặt trước <span className="text-red-700">*</span>
          </p>
          <div className="flex items-center justify-center w-full mt-2">
            <label
              {...getRootPropsFrontImage({
                isFocusedFrontImage,
                isDragAcceptFrontImage,
                isDragRejectFrontImage,
              })}
              className="bg-white flex flex-col rounded-lg border-4 border-dashed w-full h-fit p-6 group text-center"
            >
              {imageFront ? (
                <div className="form-group mb-0">
                  <div className="photo-uploaded">
                    <p className="font-semibold text-sm text-center">
                      Ảnh đã chọn
                    </p>

                    <ul className="list-photo flex flex-wrap gap-1 justify-center">
                      {imageFront && (
                        <li key={imageFront.path}>
                          <div
                            className="photo-item relative overflow-hidden"
                            style={{
                              width: "130px",
                              height: "72px",
                              borderRadius: "4px",
                            }}
                          >
                            {imageFront.previewUrl ? (
                              <img
                                src={imageFront.previewUrl}
                                alt={imageFront.path}
                                className="block w-full h-full object-cover"
                              />
                            ) : (
                              <p>Loading...</p>
                            )}
                            <div className="delete-item">
                              <MdDeleteOutline
                                onClick={() => removeFrontImage()}
                              />
                            </div>
                          </div>
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
              ) : (
                <>
                  <div className="cursor-pointer w-full text-center flex flex-col items-center justify-center  ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-10 h-10 text-blue-400 group-hover:text-blue-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>

                    <p className="pointer-none text-gray-500 ">
                      <span className="text-sm">Kéo / thả ảnh </span> <br />{" "}
                      hoặc là <span className="text-blue-500">bấm vào đây</span>{" "}
                      để tải ảnh lên từ thiết bị
                    </p>
                  </div>
                </>
              )}
            </label>
          </div>
        </div>

        <div className="w-full relative mt-6">
          <p className=" text-left w-[135px] absolute -top-1 left-0 right-[300px] bg-white pt-0 pr-2 pb-0 pl-2 mr-0 mb-0 ml-2 font-medium text-gray-600">
            Ảnh mặt sau <span className="text-red-700">*</span>
          </p>
          <div className="flex items-center justify-center w-full mt-2">
            <label
              {...getRootPropsBehindImage({
                isFocusedBehindImage,
                isDragAcceptBehindImage,
                isDragRejectBehindImage,
              })}
              className="bg-white flex flex-col rounded-lg border-4 border-dashed w-full h-fit p-6 group text-center"
            >
              {imageBehind ? (
                <div className="form-group mb-0">
                  <div className="photo-uploaded">
                    <p className="font-semibold text-sm text-center">
                      Ảnh đã chọn
                    </p>

                    <ul className="list-photo flex flex-wrap gap-1 justify-center">
                      {imageBehind && (
                        <li key={imageBehind.path}>
                          <div
                            className="photo-item relative overflow-hidden"
                            style={{
                              width: "130px",
                              height: "72px",
                              borderRadius: "4px",
                            }}
                          >
                            {imageBehind.previewUrl ? (
                              <img
                                src={imageBehind.previewUrl}
                                alt={imageBehind.path}
                                className="block w-full h-full object-cover"
                              />
                            ) : (
                              <p>Loading...</p>
                            )}
                            <div className="delete-item">
                              <MdDeleteOutline
                                onClick={() => removeBehindImage()}
                              />
                            </div>
                          </div>
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
              ) : (
                <>
                  <div className="cursor-pointer w-full text-center flex flex-col items-center justify-center  ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-10 h-10 text-blue-400 group-hover:text-blue-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>

                    <p className="pointer-none text-gray-500 ">
                      <span className="text-sm">Kéo / thả ảnh </span> <br />{" "}
                      hoặc là <span className="text-blue-500">bấm vào đây</span>{" "}
                      để tải ảnh lên từ thiết bị
                    </p>
                  </div>
                </>
              )}
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThirdStageCreate;
