function SupportHeader() {
  return (
    <header className="justify-between mb-10 xl:flex hidden">
      <div className="grow">
        <button
          aria-label="none"
          className="rounded-lg bg-white dark:bg-darkblack-600 dark:text-white p-4 inline-flex items-center justify-center text-base text-bgray-600 border border-transparent hover:border-success-300 transition duration-300 ease-in-out"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 6L9 12L15 18"
              stroke="#A0AEC0"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span> Support Details</span>
        </button>
      </div>
      <div className="flex gap-x-4">
        <button
          aria-label="none"
          className="rounded-lg bg-white dark:bg-darkblack-600 dark:text-white gap-x-2 p-4 inline-flex items-center justify-center text-base text-bgray-600 border border-transparent hover:border-success-300 transition duration-300 ease-in-out"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17 17H19C19.5304 17 20.0391 16.7893 20.4142 16.4142C20.7893 16.0391 21 15.5304 21 15V11C21 10.4696 20.7893 9.96086 20.4142 9.58579C20.0391 9.21071 19.5304 9 19 9H5C4.46957 9 3.96086 9.21071 3.58579 9.58579C3.21071 9.96086 3 10.4696 3 11V15C3 15.5304 3.21071 16.0391 3.58579 16.4142C3.96086 16.7893 4.46957 17 5 17H7"
              stroke="#A0AEC0"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M17 9V5C17 4.46957 16.7893 3.96086 16.4142 3.58579C16.0391 3.21071 15.5304 3 15 3H9C8.46957 3 7.96086 3.21071 7.58579 3.58579C7.21071 3.96086 7 4.46957 7 5V9"
              stroke="#A0AEC0"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M15 13H9C7.89543 13 7 13.8954 7 15V19C7 20.1046 7.89543 21 9 21H15C16.1046 21 17 20.1046 17 19V15C17 13.8954 16.1046 13 15 13Z"
              stroke="#A0AEC0"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>Print order</span>
        </button>
        <button
          aria-label="none"
          className="rounded-lg bg-white dark:bg-darkblack-600 dark:text-white gap-x-2 p-4 inline-flex items-center justify-center text-base text-bgray-600 border border-transparent hover:border-success-300 transition duration-300 ease-in-out"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11 2L2 11L11 19.5V14C18 14 21 21.5 21 21.5C21 13 18.5 7.5 11 7.5V2Z"
              stroke="#A0AEC0"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <span>Refund amount</span>
        </button>
        <button
          aria-label="none"
          className="rounded-lg bg-white dark:bg-darkblack-600 dark:text-white p-4 gap-x-2 inline-flex items-center justify-center text-base text-bgray-600 border border-transparent hover:border-success-300 transition duration-300 ease-in-out"
        >
          <span>More actions</span>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 6L8 10L12 6"
              stroke="#A0AEC0"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </header>
  );
}

export default SupportHeader;
