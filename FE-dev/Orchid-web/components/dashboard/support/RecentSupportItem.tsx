import Image from "next/image";

function RecentSupportItem({ img, name, time, question, answer, className }: any) {
  return (
    <div
      className={`flex space-x-6 px-4 py-8  rounded-xl ${
        className ? className : "bg-white dark:bg-darkblack-600"
      }`}
    >
      <div>
        <Image
          priority={true}
          height={img.height}
          width={img.width}
          src={img.src}
          alt=""
        />
      </div>
      <div>
        <h4 className="font-semibold text-sm text-bgray-600 dark:text-white mb-2">
          {name} <span>{time}</span>
        </h4>
        <p className="font-semibold text-base text-bgray-600 dark:text-bgray-50 mb-3">
          {question}
        </p>
        <p className="text-sm text-bgray-600 dark:text-bgray-50 mb-4">
          {answer}
        </p>
        <ul className="flex gap-4">
          <li>
            <button
              aria-label="none"
              className="w-8 h-8 rounded-full transform translate-y-0 hover:-translate-y-1 transition duration-300 ease-in-out border border-bgray-300 inline-flex items-center justify-center"
            >
              <svg
                className="fill-bgray-900 dark:fill-bgray-50"
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  opacity="0.4"
                  d="M6 0C2.7 0 0 2.325 0 5.25C0 8.175 2.7 10.5 6 10.5C6.3 10.5 6.6 10.5 6.825 10.425L10.5 12V8.7C11.4 7.8 12 6.6 12 5.25C12 2.325 9.3 0 6 0Z"
                />
              </svg>
            </button>
          </li>
          <li>
            <button
              aria-label="none"
              className="w-8 h-8 rounded-full transform translate-y-0 hover:-translate-y-1 transition duration-300 ease-in-out border border-bgray-300 inline-flex items-center justify-center"
            >
              <svg
                className="fill-bgray-900 dark:fill-bgray-50"
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  opacity="0.4"
                  d="M11.358 4.0787L8.12095 3.60845L6.6727 0.675203C6.4192 0.162953 5.5807 0.162953 5.3272 0.675203L3.8797 3.60845L0.64195 4.0787C0.0292003 4.16795 -0.21905 4.92395 0.22645 5.35895L2.56945 7.64195L2.0167 10.8662C1.91245 11.4767 2.55445 11.9455 3.10495 11.6567L5.99995 10.135L8.8957 11.6575C9.4417 11.9432 10.089 11.482 9.98395 10.867L9.4312 7.6427L11.7742 5.3597C12.219 4.92395 11.9707 4.16795 11.358 4.0787Z"
                />
              </svg>
            </button>
          </li>
          <li>
            <button
              aria-label="none"
              className="w-8 h-8 rounded-full transform translate-y-0 hover:-translate-y-1 transition duration-300 ease-in-out border border-bgray-300 inline-flex items-center justify-center"
            >
              <svg
                className="fill-bgray-900 dark:fill-bgray-50"
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle opacity="0.4" cx="6" cy="6" r="1.5" />
                <circle opacity="0.4" cx="1.5" cy="6" r="1.5" />
                <circle opacity="0.4" cx="10.5" cy="6" r="1.5" />
              </svg>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}



export default RecentSupportItem;
