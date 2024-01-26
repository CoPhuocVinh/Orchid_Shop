import Task from "./Task";

function TaskSummary() {
  return (
    <div className="flex-1 xl:block hidden">
      <div className="w-full rounded-lg px-5 py-6 bg-white dark:bg-darkblack-600 h-full">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-base xl:text-2xl text-bgray-900 dark:text-white font-bold">
            Task Summary
          </h2>
          <span>
            <svg
              width="14"
              height="4"
              viewBox="0 0 14 4"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.33317 2.66659C2.70136 2.66659 2.99984 2.36811 2.99984 1.99992C2.99984 1.63173 2.70136 1.33325 2.33317 1.33325C1.96498 1.33325 1.6665 1.63173 1.6665 1.99992C1.6665 2.36811 1.96498 2.66659 2.33317 2.66659Z"
                stroke="#64748B"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6.99967 2.66659C7.36786 2.66659 7.66634 2.36811 7.66634 1.99992C7.66634 1.63173 7.36786 1.33325 6.99967 1.33325C6.63148 1.33325 6.33301 1.63173 6.33301 1.99992C6.33301 2.36811 6.63148 2.66659 6.99967 2.66659Z"
                stroke="#64748B"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M11.6667 2.66659C12.0349 2.66659 12.3333 2.36811 12.3333 1.99992C12.3333 1.63173 12.0349 1.33325 11.6667 1.33325C11.2985 1.33325 11 1.63173 11 1.99992C11 2.36811 11.2985 2.66659 11.6667 2.66659Z"
                stroke="#64748B"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>
        <div className="flex space-x-3 mb-10">
          <Task
            title="Projects"
            value="40"
            className="bg-success-300"
            fontColor="dark:text-bgray-900  text-white"
          >
            <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                opacity="0.5"
                cx="20"
                cy="20"
                r="19.5"
                className="stroke-white dark:stroke-bgray-900"
              />
              <path
                opacity="0.4"
                d="M21 16.86L21 14.3567C21 13.2506 20.1046 12.354 19 12.354L17.6667 12.354C17.2339 12.354 16.8129 12.2135 16.4667 11.9535L15.5333 11.2526C15.1871 10.9926 14.7661 10.8521 14.3333 10.8521L13 10.8521C11.8954 10.8521 11 11.7487 11 12.8547L11 16.86C11 17.966 11.8954 18.8626 13 18.8626L19 18.8626C20.1046 18.8626 21 17.966 21 16.86Z"
                className="fill-white dark:fill-bgray-900"
              />
              <path
                opacity="0.4"
                d="M29 28.8758L29 26.3725C29 25.2665 28.1046 24.3699 27 24.3699L25.6667 24.3699C25.2339 24.3699 24.8129 24.2294 24.4667 23.9694L23.5333 23.2684C23.1871 23.0085 22.7661 22.8679 22.3333 22.8679L21 22.8679C19.8954 22.8679 19 23.7645 19 24.8706L19 28.8758C19 29.9819 19.8954 30.8785 21 30.8785L27 30.8785C28.1046 30.8785 29 29.9819 29 28.8758Z"
                className="fill-white dark:fill-bgray-900"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M22.25 14.8572C22.25 14.4424 22.5858 14.1062 23 14.1062L25 14.1062C26.5188 14.1062 27.75 15.339 27.75 16.8598L27.75 22.3671C27.75 22.7819 27.4142 23.1181 27 23.1181C26.5858 23.1181 26.25 22.7819 26.25 22.3671L26.25 16.8598C26.25 16.1686 25.6904 15.6082 25 15.6082L23 15.6082C22.5858 15.6082 22.25 15.272 22.25 14.8572ZM13 20.1141C13.4142 20.1141 13.75 20.4504 13.75 20.8651L13.75 24.8704C13.75 25.5617 14.3096 26.1221 15 26.1221L17 26.1221C17.4142 26.1221 17.75 26.4583 17.75 26.873C17.75 27.2878 17.4142 27.624 17 27.624L15 27.624C13.4812 27.624 12.25 26.3912 12.25 24.8704L12.25 20.8651C12.25 20.4504 12.5858 20.1141 13 20.1141Z"
                className="fill-white dark:fill-bgray-900"
              />
            </svg>
          </Task>
          <Task
            title="Assigned"
            value="79"
            className="bg-success-200"
            fontColor="dark:text-bgray-900  text-white"
          >
            <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                opacity="0.5"
                cx="20"
                cy="20"
                r="19.5"
                className="stroke-white dark:stroke-bgray-900"
              />
              <path
                opacity="0.4"
                d="M21 16.86L21 14.3567C21 13.2506 20.1046 12.354 19 12.354L17.6667 12.354C17.2339 12.354 16.8129 12.2135 16.4667 11.9535L15.5333 11.2526C15.1871 10.9926 14.7661 10.8521 14.3333 10.8521L13 10.8521C11.8954 10.8521 11 11.7487 11 12.8547L11 16.86C11 17.966 11.8954 18.8626 13 18.8626L19 18.8626C20.1046 18.8626 21 17.966 21 16.86Z"
                className="fill-white dark:fill-bgray-900"
              />
              <path
                opacity="0.4"
                d="M29 28.8758L29 26.3725C29 25.2665 28.1046 24.3699 27 24.3699L25.6667 24.3699C25.2339 24.3699 24.8129 24.2294 24.4667 23.9694L23.5333 23.2684C23.1871 23.0085 22.7661 22.8679 22.3333 22.8679L21 22.8679C19.8954 22.8679 19 23.7645 19 24.8706L19 28.8758C19 29.9819 19.8954 30.8785 21 30.8785L27 30.8785C28.1046 30.8785 29 29.9819 29 28.8758Z"
                className="fill-white dark:fill-bgray-900"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M22.25 14.8572C22.25 14.4424 22.5858 14.1062 23 14.1062L25 14.1062C26.5188 14.1062 27.75 15.339 27.75 16.8598L27.75 22.3671C27.75 22.7819 27.4142 23.1181 27 23.1181C26.5858 23.1181 26.25 22.7819 26.25 22.3671L26.25 16.8598C26.25 16.1686 25.6904 15.6082 25 15.6082L23 15.6082C22.5858 15.6082 22.25 15.272 22.25 14.8572ZM13 20.1141C13.4142 20.1141 13.75 20.4504 13.75 20.8651L13.75 24.8704C13.75 25.5617 14.3096 26.1221 15 26.1221L17 26.1221C17.4142 26.1221 17.75 26.4583 17.75 26.873C17.75 27.2878 17.4142 27.624 17 27.624L15 27.624C13.4812 27.624 12.25 26.3912 12.25 24.8704L12.25 20.8651C12.25 20.4504 12.5858 20.1141 13 20.1141Z"
                className="fill-white dark:fill-bgray-900"
              />
            </svg>
          </Task>
          <Task
            title="Completed"
            value="40"
            className="bg-bgray-50 dark:bg-darkblack-700"
          >
            <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle opacity="0.5" cx="20" cy="20" r="19.5" stroke="#CBD5E1" />
              <path
                opacity="0.4"
                d="M29 25V18C29 15.7909 27.2987 14 25.2 14H22.6667C21.8445 14 21.0444 13.7193 20.3867 13.2L18.6133 11.8C17.9556 11.2807 17.1555 11 16.3333 11H13.8C11.7013 11 10 12.7909 10 15V25C10 27.2091 11.7013 29 13.8 29H25.2C27.2987 29 29 27.2091 29 25Z"
                fill="#22C55E"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M23.4939 18.4356C23.8056 18.7083 23.8372 19.1822 23.5645 19.4939L20.6946 22.7738C20.0779 23.4786 19.0156 23.5729 18.2843 22.9879L16.5315 21.5857C16.2081 21.3269 16.1556 20.8549 16.4144 20.5315C16.6731 20.208 17.1451 20.1556 17.4685 20.4144L19.2214 21.8166C19.3258 21.9002 19.4776 21.8867 19.5657 21.786L22.4356 18.5061C22.7084 18.1944 23.1822 18.1628 23.4939 18.4356Z"
                fill="#22C55E"
              />
            </svg>
          </Task>
        </div>
        <div>
          <p className="text-xs text-bgray-500 dark:text-white mb-2">
            On-time Completion Rate
          </p>
          <div className="flex space-x-4 items-end">
            <span className="text-bgray-900 dark:text-white font-bold text-2xl leading-[30px]">
              95%
            </span>
            <span className="text-xs font-medium text-success-300">+2,5%</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskSummary;
