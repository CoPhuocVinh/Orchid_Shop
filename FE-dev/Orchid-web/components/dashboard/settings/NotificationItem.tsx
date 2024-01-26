"use client";
import ProtoTypes from "prop-types";

function NotificationItem({
  name,
  desc,
  activeNotification,
  handleNotification,
  children,
}: any) {
  const isActive = activeNotification[name];
  return (
    <div className="flex sm:flex-row flex-col sm:items-center items-end justify-between pb-5 border-b border-bgray-300 dark:border-darkblack-400">
      <div className="flex gap-x-4">
        <span>{children}</span>
        <div className="flex-1">
          <h4
            className="text-lg font-bold text-bgray-900 dark:text-white"
            id="availability-label"
          >
            {name}
          </h4>
          <p
            className="text-base text-bgray-500 dark:text-darkblack-300"
            id="availability-description"
          >
            {desc}
          </p>
        </div>
      </div>
      {/* Enabled: "bg-success-300", Not Enabled: "bg-[#9AA2B1]"  */}
      <button
        aria-label="none"
        type="button"
        onClick={() => handleNotification(name)}
        className={`switch-btn text-center relative inline-flex h-5 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
          isActive ? "bg-success-300 active" : "bg-[#9AA2B1]"
        }`}
        style={{ background: isActive && "#22C55E" }}
        role="switch"
        aria-checked="false"
        aria-labelledby="availability-label"
        aria-describedby="availability-description"
      >
        {/* Enabled: "translate-x-5", Not Enabled: "translate-x-0"  */}
        <span
          aria-hidden="true"
          className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
            isActive ? "translate-x-5 active" : "translate-x-0"
          }`}
        ></span>
      </button>
    </div>
  );
}
NotificationItem.propTypes = {
  name: ProtoTypes.string,
  desc: ProtoTypes.string,
  activeNotification: ProtoTypes.object,
  handleNotification: ProtoTypes.func,
  children: ProtoTypes.node,
};
export default NotificationItem;
