"use client";

import React, { Fragment } from "react";
import "@/src/styles/admin/manage-project.scss";
import { MdOutlinePersonRemove } from "react-icons/md";
import { BiDetail } from "react-icons/bi";
import { MdOutlinePlaylistRemove } from "react-icons/md";
import { Popover, Transition } from "@headlessui/react";
import {
  Typography,
  Button,
  CardBody,
  CardFooter,
  Avatar,
} from "@material-tailwind/react";
import {
  formatDate,
  generateFallbackAvatar,
  getColorByProjectStatus,
  sortData,
  translateStatusIntoVn,
  truncateString,
} from "@/src/utils/handleFunction";
import InfoText from "@/src/components/Admin/InfoText";
import StatusCell from "@/src/components/Admin/StatusCell";
import "@/src/styles/admin/manage-project.scss";
import { useAppDispatch } from "@/src/redux/store";
import toast from "react-hot-toast";
import SpinnerLoading from "@/src/components/loading/SpinnerLoading/page";
import Pagination from "@/src/components/Pagination";
import DatePicker, { registerLocale, setDefaultLocale } from "react-datepicker";
import vn from "date-fns/locale/vi";
import PopoverOption from "@/src/components/Popover/PopoverOption";
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { GrTransaction } from "react-icons/gr";

registerLocale("vi", vn);
setDefaultLocale("vi");

interface SupportTableProps {
  totalObject: any;
  dataTable: any[];
  setDataTable: React.Dispatch<React.SetStateAction<any[]>>;
  loadingUser: boolean;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const TABLE_HEAD = [
  { name: "Người gửi", key: "fullname" },
  { name: "Số điện thoại", key: "phoneNumber" },
  { name: "Giới tính", key: "gender" },
  { name: "Ngày sinh", key: "dob" },
  { name: "Trạng thái", key: "supportStatus" },
  { name: "Vai trò", key: "role" },
  { name: "", key: "" },
];

const POPOVER_OPTION = [
  {
    name: "Chi tiết",
    icon: <BiDetail />,
    onClick: () => {},
  },

  {
    name: "Xóa tài khoản",
    icon: <MdOutlinePersonRemove />,
    onClick: () => {},
  },
];

const SupportTable: React.FC<SupportTableProps> = ({
  totalObject,
  dataTable,
  setDataTable,
  loadingUser,
  currentPage,
  onPageChange,
}) => {
  const dispatch = useAppDispatch();
  console.log("dataTable", dataTable);
  //quản lý thông tin hiện ra
  const [selectedSupport, setSelectedSupport] = React.useState<any | null>(
    null
  );

  return (
    <>
      <CardBody className="px-0">
        <table className="mt-4 w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head, index) => (
                <th
                  key={index}
                  className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                >
                  <InfoText className="flex items-center gap-2 leading-none opacity-70">
                    {head.name}
                    {index !== TABLE_HEAD.length - 1 && (
                      <span
                        className="flex flex-col"
                        style={{ position: "relative", zIndex: "9999" }}
                      >
                        <IoIosArrowUp
                          className="h-4 w-4 transition duration-300 transform hover:shadow-md hover:scale-150"
                          onClick={() =>
                            sortData(head.key, "desc", dataTable, setDataTable)
                          }
                        />
                        <IoIosArrowDown
                          className="h-4 w-4 transition duration-300 transform hover:shadow-md hover:scale-150"
                          onClick={() =>
                            sortData(head.key, "asc", dataTable, setDataTable)
                          }
                        />
                      </span>
                    )}
                  </InfoText>
                </th>
              ))}
            </tr>
          </thead>

          {dataTable?.map((user: any, index) => {
            const isLast = index === dataTable.length - 1;

            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

            return (
              <tbody key={index}>
                <tr>
                  <td className={classes}>
                    <div className="flex items-center gap-3">
                      <Avatar
                        src={
                          user?.avatar
                            ? `data:image/png;base64,${user?.avatar}`
                            : generateFallbackAvatar(user?.name || user?.email)
                        }
                        alt={user?.name}
                        size="sm"
                      />
                      <div className="flex flex-col">
                        <InfoText>{user?.name}</InfoText>

                        <InfoText className="opacity-70">
                          {truncateString(user?.email, 35)}
                        </InfoText>
                      </div>
                    </div>
                  </td>

                  <td className={classes}>
                    <InfoText>{user?.phoneNumber}</InfoText>
                  </td>

                  <td className={classes}>
                    {user?.gender ? (
                      <InfoText>{translateStatusIntoVn(user?.gender)}</InfoText>
                    ) : (
                      <InfoText>(Chưa cập nhập)</InfoText>
                    )}
                  </td>

                  <td className={classes}>
                    <InfoText>{formatDate(user?.dob)}</InfoText>
                  </td>

                  <StatusCell status={"Active"} classes={classes} />

                  <td className={classes}>
                    <InfoText>{user?.role}</InfoText>
                  </td>

                  <td className={classes}>
                    <PopoverOption solutions={POPOVER_OPTION} />
                  </td>
                </tr>
              </tbody>
            );
          })}
        </table>
      </CardBody>

      <Pagination
        currentPage={currentPage}
        totalItems={totalObject}
        onPageChange={onPageChange}
      />

      {loadingUser && <SpinnerLoading />}
    </>
  );
};

export default SupportTable;
