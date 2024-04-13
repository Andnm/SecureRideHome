"use client";

import React, { Fragment } from "react";
import "@/src/styles/admin/manage-project.scss";
import { MdOutlinePersonRemove } from "react-icons/md";
import { BiCheck, BiDetail } from "react-icons/bi";
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
import { IoIosArrowUp, IoMdPersonAdd } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { GrTransaction } from "react-icons/gr";
import { FaBan } from "react-icons/fa6";
import ModalCreateDriverAccount from "@/src/components/Modal/ModalCreateDriverAccount";

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
  { name: "Loại hỗ trợ", key: "supportType" },
  { name: "Trạng thái", key: "supportStatus" },
  { name: "Ngày tạo", key: "createdAt" },
  { name: "", key: "" },
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
  const [selectedSupport, setSelectedSupport] = React.useState<any | null>(
    null
  );
  const [isOpenModalCreateDriverAccount, setIsOpenModalCreateDriverAccount] =
    React.useState(false);

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

          {dataTable?.map((support: any, index) => {
            const isLast = index === dataTable.length - 1;

            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

            const POPOVER_OPTION = [
              {
                name: "Chi tiết",
                icon: <BiDetail />,
                onClick: () => {},
              },
            ];

            if (
              support.supportType === "Recruitment" &&
              support.supportStatus === "New"
            ) {
              POPOVER_OPTION.push({
                name: "Tạo tài khoản",
                icon: <IoMdPersonAdd />,
                onClick: () => {
                  setIsOpenModalCreateDriverAccount(true)
                },
              });
            }

            if (support.supportStatus === "New") {
              POPOVER_OPTION.push({
                name: "Đang tiến hành",
                icon: <GrTransaction />,
                onClick: () => {},
              });
            } else if (support.supportStatus === "InProcess") {
              POPOVER_OPTION.push(
                {
                  name: "Đánh dấu hoàn thành",
                  icon: <BiCheck />,
                  onClick: () => {},
                },
                {
                  name: "Đánh dấu không thể giải quyết",
                  icon: <FaBan />,
                  onClick: () => {},
                }
              );
            }

            return (
              <tbody key={index}>
                <tr>
                  <td className={classes}>
                    <div className="flex items-center gap-3">
                      <div className="flex flex-col">
                        <InfoText>{support?.fullName}</InfoText>

                        <InfoText className="opacity-70">
                          {truncateString(support?.email, 35)}
                        </InfoText>
                      </div>
                    </div>
                  </td>
                  <td className={classes}>
                    <InfoText>{support?.phoneNumber}</InfoText>
                  </td>

                  <td className={classes}>
                    <InfoText>
                      {translateStatusIntoVn(support?.supportType)}
                    </InfoText>
                  </td>

                  <StatusCell
                    status={support?.supportStatus}
                    classes={classes}
                  />

                  <td className={classes}>
                    <InfoText>{formatDate(support?.dateCreated)}</InfoText>
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

      {isOpenModalCreateDriverAccount && (
        <ModalCreateDriverAccount
          open={isOpenModalCreateDriverAccount}
          actionClose={() => setIsOpenModalCreateDriverAccount(false)}
          buttonClose={"Hủy"}
          body={'body'}
          actionConfirm={() => setIsOpenModalCreateDriverAccount(false)}
          buttonConfirm={"Xác nhận"}
          status={"Pending"}
        />
      )}
      {loadingUser && <SpinnerLoading />}
    </>
  );
};

export default SupportTable;
