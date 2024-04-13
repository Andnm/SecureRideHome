import { Dialog, Transition } from "@headlessui/react";
import { X } from "lucide-react";
import { CSSProperties, Fragment } from "react";

interface ModalProps {
  open: boolean;
  actionClose?: any;
  actionConfirm?: any;
  buttonClose?: string;
  buttonConfirm?: string;
  status?: any;
  body?: any;
}

export default function ModalFormRecruitment({
  open,
  actionClose,
  buttonClose,
  actionConfirm,
  buttonConfirm,
  status,
  body,
}: ModalProps) {
  // const closeByClickBackground = () => {
  //   if (actionClose) {
  //     actionClose();
  //   }
  // };

  const styleOverlay: CSSProperties = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  };

  return (
    <>
      <Transition appear show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => {}}>
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
                  } transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle transition-all`}
                >
                  <Dialog.Title
                    as="h2"
                    className="text-2xl font-medium leading-6 text-gray-900 flex justify-between"
                  >
                    Thông tin ứng viên Tài xế Taxi tại SecureRideHome
                    <X className="cursor-pointer" onClick={actionClose} />
                  </Dialog.Title>

                  <div className="my-6">
                    <div className="container">
                      <div>
                        <p>
                          Cảm ơn bạn đã tham gia ứng tuyển cho vị trí Tài xế của
                          SecureRideHome.
                          <br />
                          <span className="font-semibold">
                            SAU KHI HOÀN TẤT FORM NÀY, BẠN CÓ THỂ ĐẾN THAM GIA
                            PHỎNG VẤN TRỰC TIẾP TẠI VĂN PHÒNG ĐỘI XE TỪ THỨ 2
                            ĐẾN THỨ 7
                          </span>
                          <br />
                          <span className="font-semibold">
                            - Thời gian phỏng vấn: Sáng từ 08h30-11h00, chiều từ
                            13h30- 16h30
                          </span>
                          <br />
                          <span className="font-semibold">
                            - Vui lòng mang theo CCCD và Bằng lái xe bản gốc,
                            mặc áo ngắn tay có cổ, đi giầy và mang theo bút viết
                            khi tham gia phỏng vấn
                          </span>
                          <br />
                          Hẹn gặp lại bạn tại buổi phỏng vấn.
                        </p>
                      </div>

                     {body}
                    </div>
                  </div>

                  {status === "Pending" && (
                    <div className="mt-4 flex gap-4 justify-end">
                      {buttonClose && (
                        <button
                          type="button"
                          className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                          onClick={actionClose}
                          style={{ borderRadius: "10px" }}
                        >
                          {buttonClose}
                        </button>
                      )}

                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={actionConfirm}
                        style={{ borderRadius: "10px" }}
                      >
                        {buttonConfirm}
                      </button>
                    </div>
                  )}
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
