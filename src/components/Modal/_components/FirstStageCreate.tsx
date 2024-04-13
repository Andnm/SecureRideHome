import React, { useState } from "react";
import InputTextField from "../../InputTextField/page";
import DatePicker, { registerLocale, setDefaultLocale } from "react-datepicker";
import { MdDeleteOutline } from "react-icons/md";
import { useDropzone } from "react-dropzone";

interface FirstStageProps {
  formInfoData: any;
  setFormInfoData: any;
}

const FirstStageCreate: React.FC<FirstStageProps> = ({
  formInfoData,
  setFormInfoData,
}) => {
  const handleOnChange = (e: any) => {
    const { name, value } = e.target;

    if (name === "phoneNumber") {
      if (/^\d*$/.test(value)) {
        setFormInfoData({
          ...formInfoData,
          [name]: value,
        });
      }
    } else {
      setFormInfoData({
        ...formInfoData,
        [name]: value,
      });
    }
  };

  // xử lý file
  const [imageFront, setSupportImage] = useState<any>();

  const handleOnDrop = (acceptedFiles: any) => {
    const file = acceptedFiles[0];
    setFormInfoData({
      ...formInfoData,
      file: file,
    });
    previewImage(file);
  };

  const {
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject,
    acceptedFiles,
    fileRejections,
  } = useDropzone({
    onDrop: handleOnDrop,
  });

  const previewImage = (file: any) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      if (e.target) {
        const imageUrl = e.target.result as string;

        setSupportImage({
          ...file,
          previewUrl: imageUrl,
        });
      }
    };
  };

  const removeImage = () => {
    setSupportImage("");
    setFormInfoData({
      ...formInfoData,
      file: "",
    });
  };

  return (
    <div className="stage-container flex flex-col justify-center items-center">
      <div className="grid grid-cols-2 w-9/12 gap-8">
        <div className="w-full">
          <InputTextField
            label="Họ và tên"
            name="name"
            value={formInfoData.name}
            handleOnChange={handleOnChange}
            required={true}
          />
        </div>

        <div className="w-full">
          <InputTextField
            label="Email"
            name="email"
            value={formInfoData.email}
            handleOnChange={handleOnChange}
            required={true}
          />
        </div>

        <div className="w-full">
          <InputTextField
            label="Số điện thoại"
            name="phoneNumber"
            value={formInfoData.phoneNumber}
            handleOnChange={handleOnChange}
            required={true}
          />
        </div>

        <div className="w-full">
          <InputTextField
            label="Địa chỉ"
            name="address"
            value={formInfoData.address}
            handleOnChange={handleOnChange}
            required={true}
          />
        </div>

        <div className="">
          <p className="relative left-3 top-3 z-20 bg-white w-fit px-2">
            Ngày sinh <span className="text-red-700">*</span>
          </p>
          <DatePicker
            className="cursor-pointer border"
            showIcon
            selected={formInfoData.dob}
            dateFormat="yyyy-MM-dd"
            onChange={(date) =>
              setFormInfoData({
                ...formInfoData,
                dob: date,
              })
            }
            placeholderText=" "
            yearDropdownItemNumber={10} 
            scrollableYearDropdown={true} 
          />
        </div>
      </div>

      <div className="w-9/12 relative mt-6">
        <p className=" text-left w-fit absolute -top-1 left-0 right-[300px] bg-white pt-0 pr-2 pb-0 pl-2 mr-0 mb-0 ml-2 font-medium text-gray-600">
          Ảnh đại diện <span className="text-red-700">*</span>
        </p>
        <div className="flex items-center justify-center w-full mt-2">
          <label
            {...getRootProps({
              isFocused,
              isDragAccept,
              isDragReject,
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
                            <MdDeleteOutline onClick={() => removeImage()} />
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
                    <span className="text-sm">Kéo / thả ảnh </span> <br /> hoặc
                    là <span className="text-blue-500">bấm vào đây</span> để tải
                    ảnh lên từ thiết bị
                  </p>
                </div>
              </>
            )}
          </label>
        </div>
      </div>
    </div>
  );
};

export default FirstStageCreate;
