"use client";

import React from "react";
import Select from "react-select";
import "./style.scss";
import ModalFormRecruitment from "@/src/components/Modal/ModalFormRecruitment";
import BodyRecruitment from "./_component/BodyRecruitment";
import { useAppDispatch } from "@/src/redux/store";
import { createSupport } from "@/src/redux/features/supportSlice";
import toast from "react-hot-toast";
import AdminSpinnerLoading from "@/src/components/loading/AdminSpinnerLoading/page";

const OPTION_HEADER = [
  {
    id: 1,
    nameItem: "ĐĂNG KÝ TRỰC TIẾP",
  },
  {
    id: 2,
    nameItem: "ĐĂNG KÝ ONLINE",
  },
];

const page = () => {
  const [selectedMenu, setSelectedMenu] = React.useState("ĐĂNG KÝ TRỰC TIẾP");
  const [isOpenModalForm, setIsOpenModalForm] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [formData, setFormData] = React.useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    identityCardNumber: "",
    birthPlace: "",
    address: "",
    drivingLicenseNumber: "",
    drivingLicenseType: "",
    msgContent: "",
    supportStatus: "New",
    supportType: "Recruitment",
  });

  const dispatch = useAppDispatch();

  const handleOnChange = (e: any) => {
    const { name, value } = e.target;

    if (
      name === "phoneNumber" ||
      name === "identityCardNumber" ||
      name === "drivingLicenseNumber"
    ) {
      if (/^\d*$/.test(value)) {
        setFormData({
          ...formData,
          [name]: value,
        });
      }
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSendRecruitmentSupport = () => {
    setIsLoading(true);
    dispatch(createSupport(formData)).then((resCreate) => {
      if (createSupport.fulfilled.match(resCreate)) {
        toast.success("Gửi đơn ứng tuyển thành công!");
        setIsOpenModalForm(false);
        setFormData({
          fullName: "",
          email: "",
          phoneNumber: "",
          identityCardNumber: "",
          birthPlace: "",
          address: "",
          drivingLicenseNumber: "",
          drivingLicenseType: "B2",
          msgContent: "",
          supportStatus: "New",
          supportType: "Recruitment",
        });
      } else {
        toast.error("Đã có lỗi xảy ra vui lòng thử lại sau!");
      }
      setIsLoading(false);
    });
  };

  const handleClickMenuItem = (nameItem: string) => {
    setSelectedMenu(nameItem);
  };

  const data = [
    {
      value: "TP. Hồ Chí Minh",
      label: "TP. Hồ Chí Minh",
    },
  ];

  return (
    <div className="container my-6">
      <h2 className="text-center text-2xl font-semibold mb-6">
        Cách thức ứng tuyển
      </h2>
      <h4 className="text-center">
        Ứng viên có thể mang hồ sơ và đăng ký trực tiếp <br /> tại địa điểm
        tuyển dụng hoặc có thể đăng ký thông qua form online.
      </h4>

      <div className="flex justify-between w-full mt-10">
        <div className="w-1/2 p-4 pt-8">
          <h2 className="text-center text-2xl font-semibold mb-6 text-blue-500">
            Lựa chọn địa điểm ứng tuyển
          </h2>

          <div className="mt-6">
            <p className="font-semibold">Lựa chọn Tỉnh/Thành phố</p>

            <div>
              <Select
                isClearable
                placeholder="Tỉnh/Thành Phố"
                className="select_option"
                options={data}
              />
            </div>
          </div>
        </div>

        <div className="w-1/2 p-6" style={{ backgroundColor: "#F6F6F9" }}>
          <div className="container general-management__menu">
            <ul className="">
              {OPTION_HEADER.map((item, index) => (
                <li key={index}>
                  <a
                    onClick={() => handleClickMenuItem(item.nameItem)}
                    className={
                      selectedMenu === `${item.nameItem}` ? "active" : ""
                    }
                  >
                    {item.nameItem}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="w-full mt-8">
            {selectedMenu === "ĐĂNG KÝ TRỰC TIẾP" ? (
              <>
                <p className="mb-8">
                  Ứng viên đến trực tiếp địa điểm phỏng vấn để được hướng dẫn
                  chi tiết
                </p>
                <div className="w-full h-fit bg-white p-4">
                  <p className="font-semibold">Đại học FPT Hồ Chí Minh</p>
                  <p className="mt-4">
                    Lô E2a-7, Đường D1, Đ. D1, Long Thạnh Mỹ, Thành Phố Thủ Đức,
                    Thành phố Hồ Chí Minh 700000
                  </p>
                </div>
              </>
            ) : (
              <>
                <p className="mb-8">
                  Ứng viên lựa chọn điền form để cung cấp trước một số thông tin
                </p>

                <div
                  className="flex items-center justify-center flex-col gap-4 cursor-pointer"
                  onClick={() => setIsOpenModalForm(true)}
                >
                  <img
                    src="https://cdn.xanhsm.com/2023/05/5f043081-vector.png"
                    alt="form"
                  />
                  <p className="text-orange-300 font-semibold">
                    Bấm vào đây để mở form
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {isOpenModalForm && (
        <ModalFormRecruitment
          open={isOpenModalForm}
          actionClose={() => setIsOpenModalForm(false)}
          buttonClose={"Hủy"}
          body={
            <BodyRecruitment
              formData={formData}
              setFormData={setFormData}
              handleOnChange={handleOnChange}
            />
          }
          actionConfirm={handleSendRecruitmentSupport}
          buttonConfirm={"Xác nhận"}
          status={"Pending"}
        />
      )}

      {isLoading && <AdminSpinnerLoading />}
    </div>
  );
};

export default page;
