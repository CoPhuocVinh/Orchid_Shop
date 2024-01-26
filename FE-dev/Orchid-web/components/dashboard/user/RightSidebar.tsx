import user from "/public/static/images/avatar/user-1.png";
import groupImg1 from "/public/static/images/avatar/group-img-1.png";
import groupImg2 from "/public/static/images/avatar/group-img-2.png";
import groupImg3 from "/public/static/images/avatar/group-img.png";
import hr from "/public/static/images/avatar/hr.png";
import Image from "next/image";

function RightSidebar() {
  return (
    <aside className="2xl:w-[382px] w-full bg-white dark:bg-darkblack-600 rounded-lg px-12 pb-7">
      <header className="flex flex-col items-center text-center -mt-8 pb-7">
        <Image
          priority={true}
          height={user.height}
          width={user.width}
          src={user.src}
          className="rounded-lg"
          alt=""
        />
        <h3 className="text-xl font-bold text-bgray-700 dark:text-white mt-4">
          Abdur Rohman
        </h3>
        <p className="text-base font-medium text-bgray-500 dark:text-white">
          Finance managers • Jakarta, Indonesia • 2 days ago
        </p>
        <div className="mt-4 flex -space-x-2 overflow-hidden">
          <Image
            priority={true}
            height={groupImg1.height}
            width={groupImg1.width}
            className="inline-block h-8 w-8 rounded-full ring ring-white"
            src={groupImg1.src}
            alt=""
          />
          <Image
            priority={true}
            height={groupImg2.height}
            width={groupImg2.width}
            className="inline-block h-8 w-8 rounded-full ring ring-white"
            src={groupImg2.src}
            alt=""
          />
          <Image
            priority={true}
            height={groupImg3.height}
            width={groupImg3.width}
            className="inline-block h-8 w-8 rounded-full ring ring-white"
            src={groupImg3.src}
            alt=""
          />
          <div className="inline-flex justify-center h-8 w-8 rounded-full items-center text-gray-500 text-xs font-semibold bg-white">
            +5
          </div>
        </div>
        <div className="flex gap-4 mt-6">
          <button
            aria-label="none"
            className="w-10 h-10 group rounded-full bg-transparent hover:bg-success-300 hover:border-transparent inline-flex items-center justify-center border border-gray-500"
          >
            <svg
              className="stroke-bgray-500 group-hover:stroke-white"
              width="24"
              height="25"
              viewBox="0 0 24 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19 21.5659L12 16.5659L5 21.5659V5.56592C5 5.03548 5.21071 4.52678 5.58579 4.1517C5.96086 3.77663 6.46957 3.56592 7 3.56592H17C17.5304 3.56592 18.0391 3.77663 18.4142 4.1517C18.7893 4.52678 19 5.03548 19 5.56592V21.5659Z"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            aria-label="none"
            className="w-10 h-10 rounded-full group bg-transparent hover:bg-success-300 hover:border-transparent inline-flex items-center justify-center border border-gray-500"
          >
            <svg
              className="stroke-bgray-500 group-hover:stroke-white"
              width="20"
              height="21"
              viewBox="0 0 20 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 13.5659C5.65685 13.5659 7 12.2228 7 10.5659C7 8.90906 5.65685 7.56592 4 7.56592C2.34315 7.56592 1 8.90906 1 10.5659C1 12.2228 2.34315 13.5659 4 13.5659Z"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M16 7.56592C17.6569 7.56592 19 6.22277 19 4.56592C19 2.90906 17.6569 1.56592 16 1.56592C14.3431 1.56592 13 2.90906 13 4.56592C13 6.22277 14.3431 7.56592 16 7.56592Z"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M16 19.5659C17.6569 19.5659 19 18.2228 19 16.5659C19 14.9091 17.6569 13.5659 16 13.5659C14.3431 13.5659 13 14.9091 13 16.5659C13 18.2228 14.3431 19.5659 16 19.5659Z"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6.69995 9.26572L13.3 5.86572"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6.69995 11.8657L13.3 15.2657"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </header>
      <ul className="py-7 border-t border-b border-gray-200 dark:border-darkblack-400 space-y-6">
        <li className="flex justify-between">
          <span className="font-medium text-gray-500 text-sm dark:text-white">
            Experience
          </span>
          <span className="text-sm font-semibold text-bgray-900 dark:text-white">
            2-4 Years
          </span>
        </li>
        <li className="flex justify-between">
          <span className="font-medium text-gray-500 text-sm dark:text-white">
            Seniority Level
          </span>
          <span className="text-sm font-semibold text-bgray-900 dark:text-white">
            Senior Level
          </span>
        </li>
        <li className="flex justify-between">
          <span className="font-medium text-gray-500 text-sm dark:text-white">
            Employment
          </span>
          <span className="text-sm font-semibold text-bgray-900 dark:text-white">
            Full Time
          </span>
        </li>
        <li className="flex justify-between">
          <span className="font-medium text-gray-500 text-sm dark:text-white">
            Salary
          </span>
          <span className="text-sm font-semibold text-bgray-900 dark:text-white">
            $250-300
          </span>
        </li>
      </ul>
      <div className="py-6 border-b border-bgray-200 dark:border-darkblack-400">
        <h4 className="font-medium text-gray-500 text-sm dark:text-white mb-3">
          Files
        </h4>
        <ul className="space-y-2.5">
          <li className="bg-[#E4FDED] dark:bg-darkblack-500 py-3 px-2 pr-4 flex justify-between items-center rounded-lg">
            <div className="flex items-center gap-x-3">
              <span className="bg-white dark:bg-darkblack-600 w-10 h-10 rounded-lg inline-flex justify-center items-center">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.8334 2.74951V6.41618C12.8334 6.65929 12.93 6.89245 13.1019 7.06436C13.2738 7.23627 13.5069 7.33285 13.75 7.33285H17.4167"
                    stroke="#22C55E"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M15.5834 19.2495H6.41671C5.93048 19.2495 5.46416 19.0564 5.12034 18.7125C4.77653 18.3687 4.58337 17.9024 4.58337 17.4162V4.58285C4.58337 4.09661 4.77653 3.6303 5.12034 3.28648C5.46416 2.94267 5.93048 2.74951 6.41671 2.74951H12.8334L17.4167 7.33285V17.4162C17.4167 17.9024 17.2236 18.3687 16.8797 18.7125C16.5359 19.0564 16.0696 19.2495 15.5834 19.2495Z"
                    stroke="#22C55E"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8.25 8.24951H9.16667"
                    stroke="#22C55E"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8.25 11.916H13.75"
                    stroke="#22C55E"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8.25 15.583H13.75"
                    stroke="#22C55E"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <div className="flex flex-col">
                <h5 className="font-semibold text-bgray-900 dark:text-white text-sm">
                  Overview.pdf
                </h5>
                <span className="text-xs text-bgray-500">50 Kb</span>
              </div>
            </div>
            <button aria-label="none">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  className="stroke-bgray-900 dark:stroke-bgray-50"
                  d="M17.5 12.4995V15.8328C17.5 16.2749 17.3244 16.6988 17.0118 17.0114C16.6993 17.3239 16.2754 17.4995 15.8333 17.4995H4.16667C3.72464 17.4995 3.30072 17.3239 2.98816 17.0114C2.67559 16.6988 2.5 16.2749 2.5 15.8328V12.4995"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M5.83337 8.33301L10 12.4997L14.1667 8.33301"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M10 12.4995V2.49951"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </li>
          <li className="bg-[#E4FDED] dark:bg-darkblack-500 py-3 px-2 pr-4 flex justify-between items-center rounded-lg">
            <div className="flex items-center gap-x-3">
              <span className="bg-white dark:bg-darkblack-600 w-10 h-10 rounded-lg inline-flex justify-center items-center">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.8334 2.74951V6.41618C12.8334 6.65929 12.93 6.89245 13.1019 7.06436C13.2738 7.23627 13.5069 7.33285 13.75 7.33285H17.4167"
                    stroke="#22C55E"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M15.5834 19.2495H6.41671C5.93048 19.2495 5.46416 19.0564 5.12034 18.7125C4.77653 18.3687 4.58337 17.9024 4.58337 17.4162V4.58285C4.58337 4.09661 4.77653 3.6303 5.12034 3.28648C5.46416 2.94267 5.93048 2.74951 6.41671 2.74951H12.8334L17.4167 7.33285V17.4162C17.4167 17.9024 17.2236 18.3687 16.8797 18.7125C16.5359 19.0564 16.0696 19.2495 15.5834 19.2495Z"
                    stroke="#22C55E"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8.25 8.24951H9.16667"
                    stroke="#22C55E"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8.25 11.916H13.75"
                    stroke="#22C55E"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8.25 15.583H13.75"
                    stroke="#22C55E"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <div className="flex flex-col">
                <h5 className="font-semibold text-bgray-900 dark:text-white  text-sm">
                  Overview.pdf
                </h5>
                <span className="text-xs text-bgray-500">50 Kb</span>
              </div>
            </div>
            <button aria-label="none">
              <svg
                className="stroke-bgray-900 dark:stroke-bgray-50"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.5 12.4995V15.8328C17.5 16.2749 17.3244 16.6988 17.0118 17.0114C16.6993 17.3239 16.2754 17.4995 15.8333 17.4995H4.16667C3.72464 17.4995 3.30072 17.3239 2.98816 17.0114C2.67559 16.6988 2.5 16.2749 2.5 15.8328V12.4995"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M5.83337 8.33301L10 12.4997L14.1667 8.33301"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M10 12.4995V2.49951"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </li>
        </ul>
      </div>
      <div className="pt-6">
        <h4 className="font-medium text-gray-500 text-sm dark:text-white mb-4">
          Hiring Agent
        </h4>
        <div className="flex gap-x-4">
          <div>
            <Image
              priority={true}
              height={hr.height}
              width={hr.width}
              src={hr.src}
              alt=""
            />
          </div>
          <div>
            <h5 className="text-base font-semibold text-bgray-900 dark:text-white">
              Annette Black
            </h5>
            <span className="text-sm font-medium text-success-300">
              HR Specialist •
              <span className="text-bgray-500 dark:text-bgray-50">
                4 Yrs Exp
              </span>
            </span>
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-8">
        <button
          aria-label="none"
          data-target="#multi-step-modal"
          className="bg-success-300 hover:bg-success-400 transition duration-300 ease-in-out modal-open py-3 px-7 text-white rounded-lg font-medium"
        >
          Add a contact
        </button>
      </div>
    </aside>
  );
}

export default RightSidebar;
