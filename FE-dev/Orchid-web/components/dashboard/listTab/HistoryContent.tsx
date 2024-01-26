import Image from "next/image";
import ProtoTypes from "prop-types";

function HistoryContent({ history }: any) {
  const { img, name, date, amount, payment, status } = history;
  return (
    <tr className="border-b border-bgray-300 dark:border-darkblack-400">
      <td className="">
        <label className="text-center">
          <input
            type="checkbox"
            className="h-5 w-5 cursor-pointer rounded-full border border-bgray-400 text-success-300 focus:outline-none focus:ring-0 dark:border-darkblack-400 dark:bg-darkblack-600"
          />
        </label>
      </td>
      <td className="px-6 py-5 xl:px-0">
        <div className="flex w-full items-center space-x-2.5">
          <div className="h-10 w-10 overflow-hidden rounded-full">
            <Image
              priority={true}
              height={img.height}
              width={img.width}
              src={img.src}
              alt="avatar"
              className="h-full w-full object-cover"
            />
          </div>
          <p className="text-base font-semibold text-bgray-900 dark:text-white">
            {name}
          </p>
        </div>
      </td>
      <td className="px-6 py-5 xl:px-0">
        <p className="text-base font-medium text-bgray-900 dark:text-white">
          {date}
        </p>
      </td>
      <td className="px-6 py-5 xl:px-0">
        <p className="text-base font-medium text-bgray-900 dark:text-white">
          {amount}
        </p>
      </td>
      <td className="px-6 py-5 xl:w-[165px] xl:px-0">
        <div className="flex w-full items-center">
          <span
            className={`block rounded-md bg-success-50 px-4 py-1.5 text-sm font-semibold leading-[22px] ${
              payment === "Paid" ? "text-success-400" : "text-[#FF4747]"
            }  dark:bg-darkblack-500`}
          >
            {payment}
          </span>
        </div>
      </td>
      <td className="px-6 py-5 xl:w-[165px] xl:px-0">
        <div className="flex w-full items-center">
          <span className="block rounded-md bg-[#FDF9E9] px-4 py-1.5 text-sm font-semibold leading-[22px] text-warning-300 dark:bg-darkblack-500">
            {status}
          </span>
        </div>
      </td>
      <td className="py-5">
        <div className="flex justify-center">
          <button aria-label="none" type="button">
            <svg
              width="18"
              height="4"
              viewBox="0 0 18 4"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8 2.00024C8 2.55253 8.44772 3.00024 9 3.00024C9.55228 3.00024 10 2.55253 10 2.00024C10 1.44796 9.55228 1.00024 9 1.00024C8.44772 1.00024 8 1.44796 8 2.00024Z"
                stroke="#A0AEC0"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M1 2.00024C1 2.55253 1.44772 3.00024 2 3.00024C2.55228 3.00024 3 2.55253 3 2.00024C3 1.44796 2.55228 1.00024 2 1.00024C1.44772 1.00024 1 1.44796 1 2.00024Z"
                stroke="#A0AEC0"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M15 2.00024C15 2.55253 15.4477 3.00024 16 3.00024C16.5523 3.00024 17 2.55253 17 2.00024C17 1.44796 16.5523 1.00024 16 1.00024C15.4477 1.00024 15 1.44796 15 2.00024Z"
                stroke="#A0AEC0"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </td>
    </tr>
  );
}

HistoryContent.propTypes = {
  history: ProtoTypes.object,
};

export default HistoryContent;
