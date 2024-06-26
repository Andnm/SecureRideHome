"use client";
import React from "react";
import "@/src/styles/admin/manage-project.scss";
import { Card } from "@material-tailwind/react";
import { useAppDispatch, useAppSelector } from "@/src/redux/store";
import AdminSpinnerLoading from "@/src/components/loading/AdminSpinnerLoading/page";
import { getAllUserByAdmin } from "@/src/redux/features/userSlice";
import toast from "react-hot-toast";
import ManageAccountHeader from "./_components/header";
import AccountTable from "./_components/table";

const ManageAccount = () => {
  const dispatch = useAppDispatch();
  const [dataTable, setDataTable] = React.useState<any[]>([]);
  const [originalDataTable, setOriginalDataTable] = React.useState<any[]>([]);
  const [totalObject, setTotalObject] = React.useState(1);
  const { loadingUser } = useAppSelector((state) => state.user);

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
    dispatch(getAllUserByAdmin(dataBody)).then((result) => {
      if (getAllUserByAdmin.rejected.match(result)) {
        toast.error(`${result.payload}`);
      } else if (getAllUserByAdmin.fulfilled.match(result)) {
        setTotalObject(result.payload.totalSize);
        setDataTable(result.payload.data);
        setOriginalDataTable(result.payload.data);
      }
    });
  }, [currentPage]);

  return (
    <Card className="p-4 manager-project">
      <ManageAccountHeader />

      {loadingUser ? (
        <AdminSpinnerLoading />
      ) : (
        <>
          <AccountTable
            currentPage={currentPage}
            onPageChange={onPageChange}
            totalObject={totalObject}
            dataTable={dataTable}
            setDataTable={setDataTable}
            loadingUser={loadingUser}
          />
        </>
      )}
    </Card>
  );
};

export default ManageAccount;
