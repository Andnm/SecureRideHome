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
  convertToVietnamTime,
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
import { Hint } from "@/src/components/Tooltip/Hint";

registerLocale("vi", vn);
setDefaultLocale("vi");

interface SupportTableProps {
  totalObject: any;
  dataTable: any[];
  setDataTable: React.Dispatch<React.SetStateAction<any[]>>;
  loadingBooking: boolean;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const TABLE_HEAD = [
  { name: "Khách hàng", key: "customer.userName" },
  { name: "Tài xế", key: "driver.name" },
  { name: "Nơi đặt", key: "pickupAddress" },
  { name: "Thời gian đặt", key: "pickUpTime" },
  { name: "Nơi trả khách", key: "dropOffAddress" },
  { name: "Thời gian trả khách", key: "dropOffTime" },
  { name: "Trạng thái", key: "status" },
  { name: "", key: "" },
];

const POPOVER_OPTION = [
  {
    name: "Chi tiết",
    icon: <BiDetail />,
    onClick: () => {},
  },
];

const BookingTable: React.FC<SupportTableProps> = ({
  totalObject,
  dataTable,
  setDataTable,
  loadingBooking,
  currentPage,
  onPageChange,
}) => {
  const dispatch = useAppDispatch();
  console.log("dataTable", dataTable);

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

          {dataTable?.map((booking: any, index) => {
            const isLast = index === dataTable.length - 1;

            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

            return (
              <tbody key={index}>
                <tr>
                  {/* customer */}
                  <td className={classes}>
                    <div className="flex items-center gap-3">
                      <Avatar
                        src={
                          booking?.searchRequest?.customer?.avatar
                            ? `data:image/png;base64,${booking?.searchRequest?.customer?.avatar}`
                            : generateFallbackAvatar(
                                booking?.searchRequest?.customer?.name ||
                                  booking?.searchRequest?.customer?.email
                              )
                        }
                        alt={booking?.searchRequest?.customer?.name}
                        size="sm"
                        className="object-cover"
                      />
                      <div className="flex flex-col">
                        <InfoText>
                          {booking?.searchRequest?.customer?.name}
                        </InfoText>

                        <InfoText>
                          {booking?.searchRequest?.customer?.phoneNumber}
                        </InfoText>

                        <InfoText className="opacity-70">
                          {truncateString(
                            booking?.searchRequest?.customer?.email,
                            35
                          )}
                        </InfoText>
                      </div>
                    </div>
                  </td>

                  {/* driver */}
                  <td className={classes}>
                    <div className="flex items-center gap-3">
                      <Avatar
                        src={
                          booking?.driver?.avatar
                            ? `data:image/png;base64,${booking?.driver?.avatar}`
                            : generateFallbackAvatar(
                                booking?.driver?.name || booking?.driver?.email
                              )
                        }
                        alt={booking?.driver?.name}
                        size="sm"
                        className="object-cover"
                      />
                      <div className="flex flex-col">
                        <InfoText>{booking?.driver?.name}</InfoText>

                        <InfoText>{booking?.driver?.phoneNumber}</InfoText>

                        <InfoText className="opacity-70">
                          {truncateString(booking?.driver?.email, 35)}
                        </InfoText>
                      </div>
                    </div>
                  </td>

                  <td className={classes}>
                    <Hint
                      sideOffset={10}
                      description={`${booking?.searchRequest?.pickupAddress}`}
                      side={"top"}
                    >
                      <InfoText>
                        {truncateString(
                          booking?.searchRequest?.pickupAddress,
                          15
                        )}
                      </InfoText>
                    </Hint>
                  </td>

                  <td className={classes}>
                    <InfoText>
                      {convertToVietnamTime(booking?.pickUpTime)}
                    </InfoText>
                  </td>

                  <td className={classes}>
                    <Hint
                      sideOffset={10}
                      description={`${booking?.searchRequest?.dropOffAddress}`}
                      side={"top"}
                    >
                      <InfoText>
                        {truncateString(
                          booking?.searchRequest?.dropOffAddress,
                          15
                        )}
                      </InfoText>
                    </Hint>
                  </td>

                  <td className={classes}>
                    <InfoText>
                      {convertToVietnamTime(booking?.dropOffTime)}
                    </InfoText>
                  </td>

                  <StatusCell status={booking?.status} classes={classes} />

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

      {loadingBooking && <SpinnerLoading />}
    </>
  );
};

export default BookingTable;
