"use client";
import ProtoTypes from "prop-types";
import flag from "/public/static/images/flag/us-sm.svg";
import Image from "next/image";
function AddWalletModal({ isActive, handleClose }: any) {
  return (
    <div
      className={`modal fixed inset-0 z-50 h-full overflow-y-auto flex items-center justify-center ${
        isActive ? "" : "hidden"
      }`}
      id="multi-step-modal"
    >
      <div className="modal-overlay absolute inset-0 bg-gray-500 opacity-75 dark:bg-bgray-900 dark:opacity-50"></div>
      <div className="modal-content md:w-full max-w-3xl px-4">
        <div className="step-content step-1">
          {/* My Content */}
          <div className="max-w-[750px] rounded-lg bg-white dark:bg-darkblack-600 p-6 pb-10 transition-all relative">
            <header>
              <div>
                <h3 className="font-bold text-bgray-900 dark:text-white text-2xl mb-1">
                  Add new card
                </h3>
                <p className="text-sm text-bgray-600 dark:text-darkblack-300">
                  Manage where you collect taxes and duties. Check with a tax
                  expert if youre unsure where you have a tax obligation.
                </p>
              </div>
              <div className="absolute top-0 right-0 pt-5 pr-5">
                <button
                  aria-label="none"
                  type="button"
                  onClick={() => handleClose(false)}
                  id="step-1-cancel"
                  className="rounded-md bg-white dark:bg-darkblack-500 focus:outline-none"
                >
                  <span className="sr-only">Close</span>
                  {/* Cross Icon  */}
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6 6L18 18M6 18L18 6L6 18Z"
                      stroke="#747681"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </header>
            <div className="pt-4 pb-10">
              <table className="min-w-full ">
                <thead className="border-t border-b border-bgray-300 dark:border-darkblack-500">
                  <tr className="dark:bg-darkblack-600">
                    <th
                      scope="col"
                      className="py-4 pl-4 pr-3 dark:text-white text-left text-sm font-medium text-bgray-600 sm:pl-6"
                    >
                      Country or region
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-4 dark:text-white text-left text-sm font-medium text-bgray-600"
                    >
                      Collecting
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-4 dark:text-white text-left text-sm font-medium text-bgray-600"
                    >
                      Percentage
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-darkblack-600">
                  <tr className="border-b border-bgray-300 dark:border-darkblack-400">
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                      <div className="flex gap-3 items-center">
                        <Image
                          priority={true}
                          height={flag.height}
                          width={flag.width}
                          src={flag.src}
                          alt=""
                        />
                        <span className="font-semibold text-sm text-bgray-900 dark:text-bgray-50 ">
                          United States
                        </span>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      <div className="flex gap-2 items-center">
                        <span className="font-semibold text-sm text-bgray-900 dark:text-white">
                          One time
                        </span>
                        <span>
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M7 10L12 14L17 10"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm">
                      <span className="font-semibold text-sm text-bgray-900 dark:text-white">
                        20%
                      </span>
                    </td>
                  </tr>
                  <tr className="border-b border-bgray-300 dark:border-darkblack-400">
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                      <div className="flex gap-3 items-center">
                        <svg
                          className="stroke-bgray-900 dark:stroke-bgray-500"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M13.7857 6L14.5807 8.00215C13.8273 7.57761 12.9442 7.33333 12 7.33333C9.23858 7.33333 7 9.42267 7 12C7 12.4149 7.058 12.8171 7.16686 13.2M10.2143 18L9.41931 15.9978C10.1727 16.4224 11.0558 16.6667 12 16.6667C14.7614 16.6667 17 14.5773 17 12C17 11.5851 16.942 11.1829 16.8331 10.8"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <circle cx="12" cy="12" r="10" strokeWidth="1.5" />
                        </svg>

                        <span className="font-semibold text-sm text-bgray-900 dark:text-white">
                          Rest of History
                        </span>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4">
                      <div className="flex gap-2 items-center ">
                        <span className="dark:text-white"> -</span>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4">
                      <span className="dark:text-white">-</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <form action="">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="chn"
                    className="block mb-3 text-base font-medium text-bgray-600 dark:text-darkblack-300"
                  >
                    Card Holder Name
                  </label>
                  <input
                    type="text"
                    className="bg-bgray-50 dark:bg-darkblack-500 dark:text-white w-full font-medium border-0 rounded-xl p-4 h-14 placeholder:text-bgray-900 dark:placeholder:text-white"
                    placeholder="Ajay Sarkar"
                  />
                </div>
                <div>
                  <label
                    htmlFor="chn"
                    className="block mb-3 text-base font-medium text-bgray-600 dark:text-darkblack-300"
                  >
                    Card Number
                  </label>
                  <input
                    type="text"
                    className="bg-bgray-50 dark:bg-darkblack-500 dark:text-white w-full font-medium border-0 rounded-xl p-4 h-14 placeholder:text-bgray-900 dark:placeholder:text-white"
                    placeholder="012 300 004 5641"
                  />
                </div>
                <div>
                  <label
                    htmlFor="chn"
                    className="block mb-3 text-base font-medium text-bgray-600 dark:text-darkblack-300"
                  >
                    Valid Date
                  </label>
                  <input
                    type="text"
                    className="bg-bgray-50 dark:bg-darkblack-500 dark:text-white w-full font-medium border-0 rounded-xl p-4 h-14 placeholder:text-bgray-900 dark:placeholder:text-white"
                    placeholder="03/23"
                  />
                </div>
                <div>
                  <label
                    htmlFor="chn"
                    className="block mb-3 text-base font-medium text-bgray-600 dark:text-darkblack-300"
                  >
                    Card Type
                  </label>
                  <input
                    type="text"
                    className="bg-bgray-50 dark:bg-darkblack-500 dark:text-white w-full font-medium border-0 rounded-xl p-4 h-14 placeholder:text-bgray-900 dark:placeholder:text-white"
                    placeholder="Visa"
                  />
                </div>
              </div>
              <div className="flex justify-center pt-11">
                <button
                  aria-label="none"
                  className="bg-success-300 hover:bg-success-400 text-white font-semibold text-sm py-4 flex justify-center items-center rounded-lg px-20"
                >
                  Confirmed
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

AddWalletModal.propTypes = {
  isActive: ProtoTypes.bool,
  handleClose: ProtoTypes.func,
};

export default AddWalletModal;
