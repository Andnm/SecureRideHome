import { useAppDispatch } from "@/src/redux/store";
import {
  changeStatusFromEnToVn,
  formatDate,
  generateFallbackAvatar,
  truncateString,
} from "@/src/utils/handleFunction";
import { Dialog, Transition } from "@headlessui/react";
import { X } from "lucide-react";
import { CSSProperties, Fragment } from "react";
import { FaPerson } from "react-icons/fa6";
import { GoPerson } from "react-icons/go";
import { RiProfileLine } from "react-icons/ri";

interface ModalProps {
  open: boolean;
  selectedAccount?: any;
  actionClose?: any;
}

export default function ModalAccountDetail({
  open,
  selectedAccount,
  actionClose,
}: ModalProps) {
  const closeByClickBackground = () => {
    if (actionClose) {
      actionClose();
    }
  };

  const styleOverlay: CSSProperties = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  };

  const dispatch = useAppDispatch();

  return (
    <>
      <Transition appear show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={closeByClickBackground}
        >
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
                  } transform overflow-hidden rounded-2xl bg-white  text-left align-middle transition-all`}
                >
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium pt-4 px-4 leading-6 bg-gray-100 text-gray-900 flex justify-end"
                  >
                    <X className="cursor-pointer" onClick={actionClose} />
                  </Dialog.Title>

                  <div className="bg-gray-100" style={{ minHeight: "fit-content" }}>
                    <div className="container mx-auto p-5">
                      <div className="md:flex no-wrap md:-mx-2 ">
                        <div className="w-full md:w-3/12 md:mx-2">
                          <div className="bg-white p-3 border-t-4 border-green-400">
                            <div className="w-full">
                              <img
                                className="h-auto w-full mx-auto"
                                src={
                                  selectedAccount?.avatar
                                    ? `data:image/png;base64,${selectedAccount?.avatar}`
                                    : generateFallbackAvatar(
                                      selectedAccount?.name || selectedAccount?.email
                                      )
                                }
                                alt="img"
                              />
                            </div>
                            <h1 className="text-gray-900 font-bold text-xl leading-8 my-1">
                              {selectedAccount?.name}
                            </h1>

                            <ul className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                              <li className="flex items-center py-3">
                                <span>Trạng thái</span>
                                <span className="ml-auto">
                                  {!selectedAccount?.is_ban ? (
                                    <span className="bg-green-500 py-1 px-2 rounded text-white text-sm">
                                      Đang hoạt động
                                    </span>
                                  ) : (
                                    <span className="bg-red-500 py-1 px-2 rounded text-white text-sm">
                                      Banned
                                    </span>
                                  )}
                                </span>
                              </li>
                              <li className="flex items-center py-3">
                                <span>Vai trò</span>
                                <span className="ml-auto">
                                  {changeStatusFromEnToVn(selectedAccount?.role)}
                                </span>
                              </li>
                            </ul>
                          </div>
                          <div className="my-4"></div>
                        </div>
                        <div className="w-full md:w-9/12 mx-2 h-64">
                          <div className="bg-white p-3 shadow-sm rounded-sm">
                            <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                              <span className="text-green-500">
                                <GoPerson />
                              </span>
                              <span className="tracking-wide">Thông tin</span>
                            </div>
                            <div className="text-gray-700">
                              <div className="grid md:grid-cols-2 text-sm">
                                <div className="grid grid-cols-2">
                                  <div className="px-4 py-2 font-semibold">
                                    Tên
                                  </div>
                                  <div className="px-4 py-2">
                                    {selectedAccount?.name}
                                  </div>
                                </div>

                                <div className="grid grid-cols-2">
                                  <div className="px-4 py-2 font-semibold">
                                    Số điện thoại
                                  </div>
                                  <div className="px-4 py-2">
                                    {selectedAccount?.phoneNumber
                                      ? selectedAccount?.phoneNumber
                                      : "(Chưa cập nhật)"}
                                  </div>
                                </div>
                                <div className="grid grid-cols-2">
                                  <div className="px-4 py-2 font-semibold">
                                    Địa chỉ
                                  </div>
                                  <div className="px-4 py-2">
                                    {selectedAccount?.address
                                      ? selectedAccount?.address
                                      : "(Chưa cập nhật)"}
                                  </div>
                                </div>

                                <div className="grid grid-cols-2">
                                  <div className="px-4 py-2 font-semibold">
                                    Email
                                  </div>
                                  <div className="px-4 py-2">
                                    <a
                                      className="text-blue-800"
                                      href="mailto:jane@example.com"
                                    >
                                      {selectedAccount?.email
                                        ? truncateString(
                                            selectedAccount?.email,
                                            50
                                          )
                                        : "(Chưa cập nhật)"}
                                    </a>
                                  </div>
                                </div>

                                <div className="grid grid-cols-2">
                                  <div className="px-4 py-2 font-semibold">
                                    Giới tính
                                  </div>
                                  <div className="px-4 py-2">
                                    {selectedAccount?.gender
                                      ? selectedAccount?.gender
                                      : "(Chưa cập nhật)"}
                                  </div>
                                </div>

                                <div className="grid grid-cols-2">
                                  <div className="px-4 py-2 font-semibold">
                                    Ngày sinh
                                  </div>
                                  <div className="px-4 py-2">
                                    {selectedAccount?.dob
                                      ? formatDate(selectedAccount?.dob)
                                      : "(Chưa cập nhật)"}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="my-4"></div>

                          {/* CCCD */}
                          <div className="bg-white p-3 shadow-sm rounded-sm">
                            <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                              <span className="text-green-500">
                                <RiProfileLine />
                              </span>
                              <span className="tracking-wide">
                                Căn cước công dân
                              </span>
                            </div>

                            <div className="text-gray-700"></div>
                          </div>
                        </div>
                      </div>
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
