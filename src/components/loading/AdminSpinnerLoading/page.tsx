import React from "react";
import './style.scss'

const AdminSpinnerLoading = () => {
  return (
    <div className="w-full height-setting flex justify-center items-center">
      <div className="admin-loader">
        <li className="ball"></li>
        <li className="ball"></li>
        <li className="ball"></li>
      </div>
    </div>
  );
};

export default AdminSpinnerLoading;
