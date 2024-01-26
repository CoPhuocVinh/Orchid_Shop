function ContactInfo() {
  return (
    <div className="py-6">
      <div className="flex justify-between items-center mb-4">
        <h4 className="text-base font-bold text-bgray-900 dark:text-white">
          Contact Information
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
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5Z"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M3 7L12 13L21 7"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <p className="text-base font-medium text-bgray-600">
          markparker@mail.com
        </p>
      </div>
      <div className="flex space-x-3 py-2.5">
        <svg
          className="stroke-bgray-500 dark:stroke-white"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5 4H9L11 9L8.5 10.5C9.57096 12.6715 11.3285 14.429 13.5 15.5L15 13L20 15V19C20 19.5304 19.7893 20.0391 19.4142 20.4142C19.0391 20.7893 18.5304 21 18 21C14.0993 20.763 10.4202 19.1065 7.65683 16.3432C4.8935 13.5798 3.23705 9.90074 3 6C3 5.46957 3.21071 4.96086 3.58579 4.58579C3.96086 4.21071 4.46957 4 5 4"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <p className="text-base font-medium text-bgray-600">(671) 555-0110</p>
      </div>
    </div>
  );
}

export default ContactInfo;
