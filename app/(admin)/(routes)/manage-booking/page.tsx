"use client";
import React from "react";
import "@/src/styles/admin/manage-project.scss";
import { Card } from "@material-tailwind/react";
import { useAppDispatch, useAppSelector } from "@/src/redux/store";
import AdminSpinnerLoading from "@/src/components/loading/AdminSpinnerLoading/page";
import { getAllBookingForAdmin } from "@/src/redux/features/bookingSlice";
import toast from "react-hot-toast";
import ManageBookingHeader from "./_components/header";
import SupportTable from "./_components/table";

const ManageBooking = () => {
  const dispatch = useAppDispatch();
  const [dataTable, setDataTable] = React.useState<any[]>([]);
  const [originalDataTable, setOriginalDataTable] = React.useState<any[]>([]);
  const [totalObject, setTotalObject] = React.useState(1);
  const { loadingSupport } = useAppSelector((state) => state.support);

  //pagination
  const [currentPage, setCurrentPage] = React.useState(1);
  const onPageChange = (newPage: any) => {
    setCurrentPage(newPage);
  };

  // console.log("dataTable1", dataTable);

  React.useEffect(() => {
    const dataBody = {
      pageIndex: currentPage,
      pageSize: 10,
    };
    dispatch(getAllBookingForAdmin(dataBody)).then((result) => {
      if (getAllBookingForAdmin.rejected.match(result)) {
        toast.error(`${result.payload}`);
      } else if (getAllBookingForAdmin.fulfilled.match(result)) {
        setTotalObject(result.payload.totalSize);
        setDataTable(result.payload.data);
        setOriginalDataTable(result.payload.data);
      }
    });
  }, [currentPage]);

  return (
    <Card className="p-4 manager-project">
      <ManageBookingHeader />

      {loadingSupport ? (
        <AdminSpinnerLoading />
      ) : (
        <>
          <SupportTable
            currentPage={currentPage}
            onPageChange={onPageChange}
            totalObject={totalObject}
            dataTable={dataTable}
            setDataTable={setDataTable}
            loadingUser={loadingSupport}
          />
        </>
      )}
    </Card>
  );
};

export default ManageBooking;
