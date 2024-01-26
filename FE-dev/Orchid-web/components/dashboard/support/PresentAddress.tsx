function PresentAddress() {
  return (
    <div className="py-6">
      <div className="flex justify-between items-center mb-4">
        <h4 className="text-base font-bold text-bgray-900 dark:text-white">
          Present Address
        </h4>
        <button
          aria-label="none"
          className="text-sm font-medium text-success-300"
        >
          Edit
        </button>
      </div>
      <div className="flex space-x-3 py-2.5">
        <svg
          className="stroke-bgray-500 dark:stroke-white"
          width="18"
          height="21"
          viewBox="0 0 18 21"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9 12C10.6569 12 12 10.6569 12 9C12 7.34315 10.6569 6 9 6C7.34315 6 6 7.34315 6 9C6 10.6569 7.34315 12 9 12Z"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M14.657 14.6572L10.414 18.9002C10.039 19.2748 9.53059 19.4853 9.0005 19.4853C8.47042 19.4853 7.96202 19.2748 7.587 18.9002L3.343 14.6572C2.22422 13.5384 1.46234 12.1129 1.15369 10.5611C0.845043 9.00922 1.00349 7.40071 1.60901 5.93893C2.21452 4.47714 3.2399 3.22774 4.55548 2.3487C5.87107 1.46967 7.41777 1.00049 9 1.00049C10.5822 1.00049 12.1289 1.46967 13.4445 2.3487C14.7601 3.22774 15.7855 4.47714 16.391 5.93893C16.9965 7.40071 17.155 9.00922 16.8463 10.5611C16.5377 12.1129 15.7758 13.5384 14.657 14.6572V14.6572Z"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <p className="text-base font-medium text-bgray-600">
          2715 Ash Dr. San Jose, South Dakota 83475
        </p>
      </div>
    </div>
  );
}

export default PresentAddress;
