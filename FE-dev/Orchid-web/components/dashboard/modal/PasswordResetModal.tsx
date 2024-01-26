"use client";
import ProtoTypes from "prop-types";
import logoColor from "/public/static/images/logo/logo-color.svg";
import logoWhite from "/public/static/images/logo/logo-white.svg";
import Link from "next/link";
import Image from "next/image";

export const CrossBtn = ({ close }: any) => {
  return (
    <div className="absolute top-0 right-0 pt-5 pr-5">
      <button
        aria-label="none"
        type="button"
        onClick={close}
        id="step-1-cancel"
        className="rounded-md bg-white dark:bg-darkblack-500 focus:outline-none"
      >
        <span className="sr-only">Close</span>
        {/* Cross Icon  */}
        <svg
          className="stroke-darkblack-300"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6 6L18 18M6 18L18 6L6 18Z"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
};

export const HeadingLogo = () => {
  return (
    <Link href="/signin" className="block mb-7">
      <Image
        priority={true}
        height={logoColor.height}
        width={logoColor.width}
        src={logoColor.src}
        className="block dark:hidden"
        alt=""
      />
      <Image
        priority={true}
        height={logoWhite.height}
        width={logoWhite.width}
        src={logoWhite.src}
        className="hidden dark:block"
        alt=""
      />
    </Link>
  );
};

export const ResetPass = ({ close, handelModalData }:any) => {
  return (
    <div className="step-content step-1">
      {/* My Content  */}
      <div className="relative max-w-[492px] transform overflow-hidden rounded-lg bg-white dark:bg-darkblack-600 p-8 text-left transition-all">
        <CrossBtn close={close} />
        <div>
          <HeadingLogo />
          <h3 className="text-2xl font-bold text-bgray-900 dark:text-white mb-3">
            Reset your password
          </h3>
          <p className="text-base font-medium text-bgray-600 dark:text-darkblack-300 mb-7">
            Enter the email address associated with your account and well send
            you a link to reset your password.
          </p>
          <form action="">
            <div className="mb-8">
              <input
                type="text"
                className="rounded-lg bg-[#F5F5F5] dark:bg-darkblack-500 dark:text-white p-4 border-0 focus:border focus:ring-0 focus:border-success-300 w-full placeholder:font-medium text-base h-14"
                placeholder="Email"
              />
            </div>
            <Link
              href="/signin"
              className="block text-sm font-bold text-success-300 mb-8 underline"
            >
              Return to login
            </Link>
            <button
              aria-label="none"
              type="button"
              onClick={() => handelModalData("verify")}
              id="step-1-next"
              className="flex w-full py-4 text-white bg-success-300 hover:bg-success-400 transition-all justify-center text-base font-medium rounded-lg"
            >
              Continue
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export const CodeVerify = ({ close, handelModalData }:any) => {
  return (
    <div className="step-content step-2 ">
      <div className="relative max-w-lg transform overflow-hidden rounded-lg bg-white dark:bg-darkblack-600 p-8 text-left transition-all">
        <CrossBtn close={close} />
        <div>
          <HeadingLogo />
          <h3 className="text-2xl font-bold text-bgray-900 dark:text-white mb-3">
            Enter verification code
          </h3>
          <p className="text-base font-medium text-bgray-600 dark:text-darkblack-300 mb-7">
            We have just sent a verification code to ajoy*****@mail.com
          </p>
          <form>
            <div className="flex space-x-6 mb-8">
              <input
                type="text"
                className="px-5 py-3 rounded-xl text-2xl border border-transparent focus:ring-0 focus:border focus:border-success-300 font-bold text-bgray-900 bg-[#F5F5F5] dark:bg-darkblack-500 dark:text-white w-14 h-14"
                placeholder=""
              />
              <input
                type="text"
                className="px-5 py-3 rounded-xl text-2xl border border-transparent focus:ring-0 focus:border focus:border-success-300 font-bold text-bgray-900 bg-[#F5F5F5] dark:bg-darkblack-500 dark:text-white w-14 h-14"
                placeholder=""
              />
              <input
                type="text"
                className="px-5 py-3 rounded-xl text-2xl border border-transparent focus:ring-0 focus:border focus:border-success-300 font-bold text-bgray-900 bg-[#F5F5F5] dark:bg-darkblack-500 dark:text-white w-14 h-14"
                placeholder=""
              />
              <input
                type="text"
                className="px-5 py-3 rounded-xl text-2xl border border-transparent focus:ring-0 focus:border focus:border-success-300 font-bold text-bgray-900 bg-[#F5F5F5] dark:bg-darkblack-500 dark:text-white w-14 h-14"
                placeholder=""
              />
              <input
                type="text"
                className="px-5 py-3 rounded-xl text-2xl border border-transparent focus:ring-0 focus:border focus:border-success-300 font-bold text-bgray-900 bg-[#F5F5F5] dark:bg-darkblack-500 dark:text-white w-14 h-14"
                placeholder=""
              />
            </div>
            <button
              aria-label="none"
              className="block text-sm font-bold text-success-300 mb-8"
            >
              Send the code again
            </button>
            <button
              aria-label="none"
              type="button"
              onClick={() => handelModalData("newPass")}
              id="step-2-next"
              className="flex w-full py-4 text-white bg-success-300 transition-all justify-center text-base font-medium rounded-lg"
            >
              Verify
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export const NewPass = ({ close, handelModalData }: any) => {
  return (
    <div className="step-content step-3">
      {/* Step 3 Content Here */}
      <div className="relative  transform overflow-hidden rounded-lg bg-white dark:bg-darkblack-600 p-8 text-left transition-all">
        <CrossBtn close={close} />
        <div>
          <HeadingLogo />
          <h3 className="text-2xl font-bold text-bgray-900 dark:text-white mb-3">
            Create new password
          </h3>
          <p className="text-base font-medium text-bgray-600 dark:text-darkblack-300 mb-7">
            Please enter a new password. Your new password must be different
            from previous password.
          </p>
          <form action="">
            <div className="mb-6 relative">
              <input
                type="text"
                className="text-bgray-800 text-base border border-bgray-300 h-14 w-full
          focus:border focus:border-success-300 focus:ring-0 rounded-lg px-4 py-3.5 placeholder:text-bgray-500 placeholder:text-base dark:text-white dark:bg-darkblack-500 dark:border-0"
                placeholder="Password"
              />
              <button
                aria-label="none"
                className="absolute top-4 right-4 bottom-4"
              >
                <svg
                  width="22"
                  height="20"
                  viewBox="0 0 22 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 1L20 19"
                    stroke="#718096"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9.58445 8.58704C9.20917 8.96205 8.99823 9.47079 8.99805 10.0013C8.99786 10.5319 9.20844 11.0408 9.58345 11.416C9.95847 11.7913 10.4672 12.0023 10.9977 12.0024C11.5283 12.0026 12.0372 11.7921 12.4125 11.417"
                    stroke="#718096"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8.363 3.36506C9.22042 3.11978 10.1082 2.9969 11 3.00006C15 3.00006 18.333 5.33306 21 10.0001C20.222 11.3611 19.388 12.5241 18.497 13.4881M16.357 15.3491C14.726 16.4491 12.942 17.0001 11 17.0001C7 17.0001 3.667 14.6671 1 10.0001C2.369 7.60506 3.913 5.82506 5.632 4.65906"
                    stroke="#718096"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
            <div className="mb-8 relative">
              <input
                type="text"
                className="text-bgray-800 text-base border border-bgray-300 h-14 w-full focus:border-success-300 focus:ring-0 rounded-lg px-4 py-3.5 placeholder:text-bgray-500 placeholder:text-base dark:bg-darkblack-500 dark:border-0"
                placeholder="Confirm new Password"
              />
              <button
                aria-label="none"
                className="absolute top-4 right-4 bottom-4"
              >
                <svg
                  width="22"
                  height="20"
                  viewBox="0 0 22 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 1L20 19"
                    stroke="#718096"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9.58445 8.58704C9.20917 8.96205 8.99823 9.47079 8.99805 10.0013C8.99786 10.5319 9.20844 11.0408 9.58345 11.416C9.95847 11.7913 10.4672 12.0023 10.9977 12.0024C11.5283 12.0026 12.0372 11.7921 12.4125 11.417"
                    stroke="#718096"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8.363 3.36506C9.22042 3.11978 10.1082 2.9969 11 3.00006C15 3.00006 18.333 5.33306 21 10.0001C20.222 11.3611 19.388 12.5241 18.497 13.4881M16.357 15.3491C14.726 16.4491 12.942 17.0001 11 17.0001C7 17.0001 3.667 14.6671 1 10.0001C2.369 7.60506 3.913 5.82506 5.632 4.65906"
                    stroke="#718096"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
            <button
              aria-label="none"
              type="button"
              onClick={() => handelModalData("success")}
              id="step-2-next"
              className="flex w-full py-4 text-white bg-success-300 hover:bg-success-400 transition-all justify-center text-base font-medium rounded-lg"
            >
              Confirm Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export const SuccessFull = ({ close }:any) => {
  return (
    <div className="step-content step-4">
      <div className="relative  transform overflow-hidden rounded-lg bg-white dark:bg-darkblack-600 p-8 text-left transition-all">
        <CrossBtn close={close} />
        <div className="text-center mt-4">
          <h3 className="text-2xl font-bold text-bgray-900 dark:text-white mb-3">
            Your successfully changed your password
          </h3>
          <p className="text-base font-medium text-bgray-600 dark:text-darkblack-300 mb-7">
            Commodo gravida eget ultricies sed in lacus. Commodo, tellus duis
            eros pellentesque.
          </p>
          <Link
            href="/signin"
            onClick={close}
            id="step-4-cancel"
            className="flex w-full py-4 text-white bg-success-300 hover:bg-success-400 transition-all justify-center text-base font-semibold rounded-lg"
          >
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

function PasswordResetModal({
  isActive,
  modalData,
  handelModalData,
  handleActive,
}: any) {
  return (
    <div
      className={`modal fixed inset-0 z-50 overflow-y-auto flex items-center justify-center ${
        isActive ? "" : "hidden"
      }`}
      id="multi-step-modal"
    >
      <div className="modal-overlay absolute inset-0 bg-gray-500 opacity-75 dark:bg-bgray-900 dark:opacity-50"></div>
      <div className="modal-content w-full max-w-lg mx-auto px-4">
        {modalData === "verify" ? (
          <CodeVerify
            close={() => handleActive(false)}
            handelModalData={handelModalData}
          />
        ) : modalData === "newPass" ? (
          <NewPass
            close={() => handleActive(false)}
            handelModalData={handelModalData}
          />
        ) : modalData === "success" ? (
          <SuccessFull close={() => handleActive(false)} />
        ) : (
          <ResetPass
            close={() => handleActive(false)}
            handelModalData={handelModalData}
          />
        )}
      </div>
    </div>
  );
}

PasswordResetModal.propTypes = {
  isActive: ProtoTypes.bool,
  modalData: ProtoTypes.string,
  handelModalData: ProtoTypes.func,
  handleActive: ProtoTypes.func,
};
CrossBtn.propTypes = {
  close: ProtoTypes.func,
};
ResetPass.propTypes = {
  close: ProtoTypes.func,
  handelModalData: ProtoTypes.func,
};
CodeVerify.propTypes = {
  close: ProtoTypes.func,
  handelModalData: ProtoTypes.func,
};
NewPass.propTypes = {
  close: ProtoTypes.func,
  handelModalData: ProtoTypes.func,
};
SuccessFull.propTypes = {
  close: ProtoTypes.func,
};

export default PasswordResetModal;
