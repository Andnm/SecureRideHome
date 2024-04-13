import InputTextField from "@/src/components/InputTextField/page";
import React from "react";

interface BodyRecruitmentProps {
  formData: any;
  setFormData: any;
  handleOnChange: any;
}

const BodyRecruitment: React.FC<BodyRecruitmentProps> = ({
  formData,
  setFormData,
  handleOnChange,
}) => {
  return (
    <div className="mt-10">
      <p>
        <span className="text-red-700">*</span> Những ô bắt buộc
      </p>
      <div className="form grid grid-cols-2 gap-6 mt-6">
        <InputTextField
          label="Họ và tên"
          name="fullName"
          value={formData.fullName}
          handleOnChange={handleOnChange}
          required={true}
        />
        <InputTextField
          label="Email"
          name="email"
          value={formData.email}
          handleOnChange={handleOnChange}
          required={true}
        />
        <InputTextField
          label="Số điện thoại"
          name="phoneNumber"
          value={formData.phoneNumber}
          handleOnChange={handleOnChange}
          required={true}
        />
        <InputTextField
          label="Số CCCD"
          name="identityCardNumber"
          value={formData.identityCardNumber}
          handleOnChange={handleOnChange}
          required={true}
        />
        <InputTextField
          label="Nơi sinh"
          name="birthPlace"
          value={formData.birthPlace}
          handleOnChange={handleOnChange}
          required={true}
        />
        <InputTextField
          label="Địa chỉ thường trú"
          name="address"
          value={formData.address}
          handleOnChange={handleOnChange}
          required={true}
        />
        <InputTextField
          label="Số bằng lái xe"
          name="drivingLicenseNumber"
          value={formData.drivingLicenseNumber}
          handleOnChange={handleOnChange}
          required={true}
        />

        <InputTextField
          label="Nội dung nhắn khác"
          name="msgContent"
          value={formData.msgContent}
          handleOnChange={handleOnChange}
          required={false}
        />
      </div>
    </div>
  );
};

export default BodyRecruitment;
