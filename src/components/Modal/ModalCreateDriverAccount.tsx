import { Dialog, Transition } from "@headlessui/react";
import { X } from "lucide-react";
import { CSSProperties, Fragment, useEffect, useState } from "react";
import FirstStageCreate from "./_components/FirstStageCreate";
import SecondStageCreate from "./_components/SecondStageCreate";
import ThirdStageCreate from "./_components/ThirdStageCreate";
import SpinnerLoading from "../loading/SpinnerLoading/page";

import "./style.scss";
import { useAppDispatch } from "@/src/redux/store";
import { createDriverAccountByAdmin } from "@/src/redux/features/userSlice";
import toast from "react-hot-toast";
import AdminSpinnerLoading from "../loading/AdminSpinnerLoading/page";
import {
  createIdentityCardByAdmin,
  createIdentityCardImageByAdmin,
} from "@/src/redux/features/identityCardSlice";
import {
  createDrivingLicenseForDriverByAdmin,
  createDrivingLicenseImgForDriver,
} from "@/src/redux/features/drivingLicenseSlice";
import { convertToVietnamDate } from "@/src/utils/handleFunction";

interface ModalProps {
  open: boolean;
  actionClose?: any;
  actionConfirm?: any;
  buttonClose?: string;
  buttonConfirm?: string;
  status?: any;
  body?: any;
  dataSelected?: any;
  setDataTable?: any;
  selectedSupport?: any;
}

export default function ModalCreateDriverAccount({
  open,
  actionClose,
  buttonClose,
  actionConfirm,
  buttonConfirm,
  status,
  body,
  dataSelected,
  setDataTable,
  selectedSupport,
}: ModalProps) {
  // const closeByClickBackground = () => {
  //   if (actionClose) {
  //     actionClose();
  //   }
  // };

  const styleOverlay: CSSProperties = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  };

  console.log("selectedSupport", selectedSupport);

  //   Tạo dữ liệu
  const [formInfoData, setFormInfoData] = useState({
    name: selectedSupport?.fullName ? selectedSupport.fullName : "",
    email: selectedSupport?.email ? selectedSupport.email : "",
    phoneNumber: selectedSupport?.phoneNumber ? selectedSupport.phoneNumber : "",
    address: selectedSupport?.address ? selectedSupport.address : "",
    gender: "Male",
    dob: "",
    file: "",
  });

  const [formIdentityData, setFormIdentityData] = useState({
    fullName: selectedSupport?.fullName ? selectedSupport.fullName : "",
    dob: "",
    gender: "Male",
    nationality: "",
    placeOrigin: "",
    placeResidence: selectedSupport?.address ? selectedSupport.address : "",
    personalIdentification: "",
    identityCardNumber: selectedSupport?.identityCardNumber ? selectedSupport.identityCardNumber : "",
    expiredDate: "",
  });

  const [formIdentityFrontImageData, setFormIdentityFrontImageData] = useState({
    identityCardId: "",
    isFront: true,
    file: "",
  });

  const [formIdentityBehindImageData, setFormIdentityBehindImageData] =
    useState({
      identityCardId: "",
      isFront: false,
      file: "",
    });

  const [formDlcData, setFormDlcData] = useState({
    drivingLicenseNumber: selectedSupport?.drivingLicenseNumber ? selectedSupport.drivingLicenseNumber : "",
    type: "",
    issueDate: "",
    expriedDate: "",
  });

  const [formDlcFrontImgData, setFormDlcFrontImgData] = useState({
    drivingLicenseId: "",
    isFront: true,
    file: "",
  });

  const [formDlcBehindImgData, setFormDlcBehindImgData] = useState({
    drivingLicenseId: "",
    isFront: false,
    file: "",
  });

  const [stageEnabled, setStageEnabled] = useState<Record<number, boolean>>({
    1: true,
    2: false,
    3: false,
  });

  const dispatch = useAppDispatch();

  const [currentStage, setCurrentStage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const handleStageClick = (stage: any) => {
    setCurrentStage(stage);
  };

  const handleBackStage = () => {
    setCurrentStage(currentStage - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleContinueStage = () => {
    setStageEnabled((prevState) => ({
      ...prevState,
      [currentStage + 1]: true,
    }));

    setCurrentStage(currentStage + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getStageName = (stage: any) => {
    switch (stage) {
      case 1:
        return "Thông tin tài xế";
      case 2:
        return "CCCD";
      case 3:
        return "Bằng lái xe";
      default:
        return "";
    }
  };

  const getStageContent = (stage: any) => {
    switch (stage) {
      case 1:
        return (
          <FirstStageCreate
            formInfoData={formInfoData}
            setFormInfoData={setFormInfoData}
          />
        );
      case 2:
        return (
          <SecondStageCreate
            formIdentityData={formIdentityData}
            setFormIdentityData={setFormIdentityData}
            formIdentityFrontImageData={formIdentityFrontImageData}
            setFormIdentityFrontImageData={setFormIdentityFrontImageData}
            formIdentityBehindImageData={formIdentityBehindImageData}
            setFormIdentityBehindImageData={setFormIdentityBehindImageData}
          />
        );
      case 3:
        return (
          <ThirdStageCreate
            formDlcData={formDlcData}
            setFormDlcData={setFormDlcData}
            formDlcFrontImgData={formDlcFrontImgData}
            setFormDlcFrontImgData={setFormDlcFrontImgData}
            formDlcBehindImgData={formDlcBehindImgData}
            setFormDlcBehindImgData={setFormDlcBehindImgData}
          />
        );
      default:
        return null;
    }
  };

  const handleCallApiCreateDriverAccountFlow = async () => {
    console.log("come here");

    setIsLoading(true);

    try {
      const dataCreateInfo = {
        ...formInfoData,
        userName: formInfoData.email,
        dob: convertToVietnamDate(formInfoData.dob),
      };

      console.log("dataCreateInfo", dataCreateInfo);
      const resCreateInfo = await dispatch(
        createDriverAccountByAdmin(dataCreateInfo)
      );
      console.log("resCreateInfo", resCreateInfo);

      if (createDriverAccountByAdmin.rejected.match(resCreateInfo)) {
        console.log("error bước 1", resCreateInfo.payload);
        toast.error("Có lỗi xảy ra ở bước 1");
        return;
      }

      //identity card
      const dataCreateIdentity = {
        driverId: resCreateInfo.payload.id,
        dataBody: {
          ...formIdentityData,
          dob: convertToVietnamDate(formIdentityData.dob),
          expiredDate: convertToVietnamDate(formIdentityData.expiredDate),
        },
      };

      const resCreateIdentity = await dispatch(
        createIdentityCardByAdmin(dataCreateIdentity)
      );
      console.log("resCreateIdentity", resCreateIdentity);

      const dataCreateIdentityFrontImage = {
        ...formIdentityFrontImageData,
        identityCardId: resCreateIdentity.payload,
      };

      const resCreateIdentityFrontImage = await dispatch(
        createIdentityCardImageByAdmin(dataCreateIdentityFrontImage)
      );
      console.log("resCreateIdentityFrontImage", resCreateIdentityFrontImage);

      const dataCreateIdentityBehindImage = {
        ...formIdentityBehindImageData,
        identityCardId: resCreateIdentity.payload,
      };

      const resCreateIdentityBehindImage = await dispatch(
        createIdentityCardImageByAdmin(dataCreateIdentityBehindImage)
      );
      console.log("resCreateIdentityBehindImage", resCreateIdentityBehindImage);

      // //driving license
      const dataCreateDrivingLicense = {
        driverId: resCreateInfo.payload.id,
        dataBody: {
          ...formDlcData,
          issueDate: convertToVietnamDate(formDlcData.issueDate),
          expriedDate: convertToVietnamDate(formDlcData.expriedDate),
        },
      };

      const resCreateDrivingLicense = await dispatch(
        createDrivingLicenseForDriverByAdmin(dataCreateDrivingLicense)
      );
      console.log("resCreateDrivingLicense", resCreateDrivingLicense);

      const dataCreateDlcFrontImage = {
        ...formDlcFrontImgData,
        drivingLicenseId: resCreateDrivingLicense.payload,
      };

      const resCreateDlcFrontImage = await dispatch(
        createDrivingLicenseImgForDriver(dataCreateDlcFrontImage)
      );
      console.log("resCreateDlcFrontImage", resCreateDlcFrontImage);

      const dataCreateDlcBehindImage = {
        ...formDlcBehindImgData,
        drivingLicenseId: resCreateDrivingLicense.payload,
      };

      const resCreateDlcBehindImage = await dispatch(
        createDrivingLicenseImgForDriver(dataCreateDlcBehindImage)
      );
      console.log("resCreateDlcBehindImage", resCreateDlcBehindImage);

      toast.success("Tạo tài khoản thành công!");
    } catch (error) {
      console.error("Error occurred:", error);
      toast.error("Có lỗi xảy ra khi tạo tài khoản!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Transition appear show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => {}}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25 blur-sm opacity-20" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center relative z-50">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel
                  className={`relative z-40 w-full max-w-6xl
                  } transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle transition-all`}
                >
                  <Dialog.Title
                    as="h2"
                    className="text-2xl font-medium leading-6 text-gray-900 flex justify-between"
                  >
                    Form tạo tài khoản cho Driver
                    <X className="cursor-pointer" onClick={actionClose} />
                  </Dialog.Title>

                  <div className="mt-2">
                    <div className="container">
                      <div className="stage-header">
                        {[1, 2, 3].map((stageNum) => (
                          <button
                            key={stageNum}
                            className={`stage btn ${
                              stageEnabled[stageNum] ? "" : "disabled"
                            } ${currentStage === stageNum ? "active" : ""}`}
                            onClick={() => handleStageClick(stageNum)}
                          >
                            {stageNum}. {getStageName(stageNum)}
                          </button>
                        ))}
                      </div>

                      <div className="container py-4">
                        {getStageContent(currentStage)}
                      </div>

                      <div
                        className="flex justify-end gap-5"
                        style={{ marginRight: "50px" }}
                      >
                        {currentStage > 1 && (
                          <button
                            className="font-semibold btn-cancel px-4 py-2"
                            onClick={handleBackStage}
                          >
                            Quay lại
                          </button>
                        )}

                        {currentStage < 3 && (
                          <button
                            className="font-semibold btn-continue px-4 py-2"
                            onClick={handleContinueStage}
                          >
                            Tiếp tục
                          </button>
                        )}

                        {currentStage === 3 && (
                          <button
                            className="font-semibold btn-continue px-4 py-2"
                            onClick={handleCallApiCreateDriverAccountFlow}
                          >
                            Xác nhận
                          </button>
                        )}
                      </div>

                      {isLoading && <AdminSpinnerLoading />}
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
              <div className="overlay" style={styleOverlay}></div>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
