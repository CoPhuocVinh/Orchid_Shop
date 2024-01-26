import img from "/public/static/images/avatar/purple-a.png";
import Image from "next/image";
function CustomerInfo() {
  return (
    <div>
      <h4 className="font-bold text-bgray-900 dark:text-white text-xl mb-4">
        Customer
      </h4>
      <div className="flex items-center justify-between pb-6">
        <div className="flex space-x-4">
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
            <h4 className="font-semibold text-bgray-900 dark:text-white text-base">
              Darcel Ballentine
            </h4>
            <span className="text-sm text-bgray-600 dark:text-bgray-50 font-medium">
              10 orders
            </span>
          </div>
        </div>
        <div>
          <button aria-label="none">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5Z"
                stroke="#0CAF60"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M3 7L12 13L21 7"
                stroke="#0CAF60"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default CustomerInfo;
