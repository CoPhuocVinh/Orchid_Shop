import ProtoTypes from "prop-types";

function PBCard({ name, desc, children }: any) {
  return (
    <div className="relative p-6 bg-gray-100 dark:bg-darkblack-500 rounded-lg">
      <div className="flex gap-x-2 mb-5">{children}</div>
      <h4 className="text-base font-bold text-bgray-900 dark:text-white mb-2">
        {name}
      </h4>
      <p className="text-sm dark:text-bgray-50">{desc}</p>
      <button aria-label="none" className="absolute top-5 right-5">
        <svg
          className="stroke-bgray-600 dark:stroke-bgray-50 "
          width="24"
          height="25"
          viewBox="0 0 24 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 14.2037C10.8954 14.2037 10 13.3074 10 12.2019C10 11.0964 10.8954 10.2002 12 10.2002C13.1046 10.2002 14 11.0964 14 12.2019C14 13.3074 13.1046 14.2037 12 14.2037Z"
            strokeWidth="1.5"
          />
          <path
            d="M20 14.2037C18.8954 14.2037 18 13.3074 18 12.2019C18 11.0964 18.8954 10.2002 20 10.2002C21.1046 10.2002 22 11.0964 22 12.2019C22 13.3074 21.1046 14.2037 20 14.2037Z"
            strokeWidth="1.5"
          />
          <path
            d="M4 14.2037C2.89543 14.2037 2 13.3074 2 12.2019C2 11.0964 2.89543 10.2002 4 10.2002C5.10457 10.2002 6 11.0964 6 12.2019C6 13.3074 5.10457 14.2037 4 14.2037Z"
            strokeWidth="1.5"
          />
        </svg>
      </button>
    </div>
  );
}

PBCard.propTypes = {
  name: ProtoTypes.string,
  desc: ProtoTypes.string,
  children: ProtoTypes.node,
};

export default PBCard;
