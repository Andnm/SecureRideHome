"use client";

import SidebarAdmin from "@/src/components/Admin/SidebarAdmin"; 
import React from "react";
import { useAppDispatch } from "@/src/redux/store";
import { socketInstance } from "@/src/utils/socket/socket-provider";

const AdminLayout: React.FC<{ children: React.ReactNode }> = (props) => {
  const dispatch = useAppDispatch();

  return (
    <div className="flex layout-admin h-screen">
      <SidebarAdmin />

      <div
        className="main flex-1 overflow-x-hidden overflow-y-scroll pl-4"
        style={{ backgroundColor: "#f8fafc" }}
      >
        {props.children}
      </div>
    </div>
  );
};

export default AdminLayout;
