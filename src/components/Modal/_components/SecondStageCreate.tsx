import React, { useState } from "react";
import DatePicker, { registerLocale, setDefaultLocale } from "react-datepicker";
import InputTextField from "../../InputTextField/page";
import { useDropzone } from "react-dropzone";
import { MdDeleteOutline } from "react-icons/md";

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
  const handleOnChange = (e: any) => {
    const { name, value } = e.target;

    if (name === "identityCardNumber") {
      if (/^\d*$/.test(value)) {
        setFormIdentityData({
          ...formIdentityData,
          [name]: value,
        });
      }
    } else {
      setFormIdentityData({
        ...formIdentityData,
        [name]: value,
      });
    }
  };

  // xử lý ảnh mặt trước
  const [imageFront, setImageFront] = useState<any>();

  const handleOnDropFrontImage = (acceptedFiles: any) => {
    const file = acceptedFiles[0];
    setFormIdentityFrontImageData({
      ...formIdentityFrontImageData,
      // file: file,
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
    setFormIdentityFrontImageData({
      ...formIdentityFrontImageData,
      // file: "",
    });
  };

  // xử lý ảnh mặt sau
  const [imageBehind, setImageBehind] = useState<any>();

  const handleOnDropBehindImage = (acceptedFiles: any) => {
    const file = acceptedFiles[0];
    setFormIdentityBehindImageData({
      ...formIdentityBehindImageData,
      // file: file,
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
    setFormIdentityBehindImageData({
      ...formIdentityBehindImageData,
      // file: "",
    });
  };

  return (
    <div className="stage-container flex flex-col justify-center items-center">
      <div className="grid grid-cols-2 w-9/12 gap-8">
        <div className="w-full">
          <InputTextField
            label="Số CCCD"
            name="identityCardNumber"
            value={formIdentityData.identityCardNumber}
            handleOnChange={handleOnChange}
            required={true}
          />
        </div>

        <div className="w-full">
          <InputTextField
            label="Họ và tên"
            name="fullName"
            value={formIdentityData.fullName}
            handleOnChange={handleOnChange}
            required={true}
          />
        </div>

        <div className="w-full">
          <InputTextField
            label="Quốc tịch"
            name="nationality"
            value={formIdentityData.nationality}
            handleOnChange={handleOnChange}
            required={true}
          />
        </div>

        <div className="w-full">
          <InputTextField
            label="Số điện thoại"
            name="phoneNumber"
            value={formIdentityData.phoneNumber}
            handleOnChange={handleOnChange}
            required={true}
          />
        </div>

        <div className="w-full">
          <InputTextField
            label="Quê quán"
            name="placeOrigin"
            value={formIdentityData.placeOrigin}
            handleOnChange={handleOnChange}
            required={true}
          />
        </div>

        <div className="w-full">
          <InputTextField
            label="Nơi thường trú"
            name="placeResidence"
            value={formIdentityData.placeResidence}
            handleOnChange={handleOnChange}
            required={true}
          />
        </div>

        <div className="w-full">
          <InputTextField
            label="Đặc điểm nhận dạng"
            name="personalIdentification"
            value={formIdentityData.personalIdentification}
            handleOnChange={handleOnChange}
            required={true}
          />
        </div>

        <div className="relative">
          <p className="absolute left-3 -top-3 z-20 bg-white w-fit px-2">
            Ngày sinh <span className="text-red-700">*</span>
          </p>
          <DatePicker
            className="cursor-pointer border"
            showIcon
            selected={formIdentityData.dob}
            dateFormat="yyyy-MM-dd"
            onChange={(date) =>
              setFormIdentityData({
                ...formIdentityData,
                dob: date,
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
            selected={formIdentityData.expiredDate}
            dateFormat="yyyy-MM-dd"
            onChange={(date) =>
              setFormIdentityData({
                ...formIdentityData,
                expiredDate: date,
              })
            }
            placeholderText=" "
          />
        </div>
      </div>

      <div className="grid grid-cols-2 w-9/12 gap-8">
        <div className="w-full relative mt-6">
          <p className=" text-left w-[135px] absolute -top-1 left-0 right-[300px] bg-white pt-0 pr-2 pb-0 pl-2 mr-0 mb-0 ml-2 font-medium text-gray-600">
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

export default SecondStageCreate;
