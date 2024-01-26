import ProtoTypes from "prop-types";
import resetPass from "/public/static/images/illustration/reset-password.svg";
import Image from "next/image";
import PasswordChange from "../forms/password-change";

function Security({ name, activeTab }: any) {
  return (
    <div id="tab6" className={`tab-pane ${name === activeTab && "active"}`}>
      <div className="flex flex-col gap-10 xl:flex-row xl:items-center">
        <div className="grow max-w-[614px]">
          <h3 className="text-2xl font-bold text-bgray-900 dark:text-white mb-3">
            Password
          </h3>
          <p className="text-sm fotn-medium text-bgray-500 dark:text-bgray-50">
            Change or view your password.
          </p>
          <PasswordChange />
        </div>
        <div className="mx-auto pt-10 hidden xl:block">
          <Image
            priority={true}
            height={resetPass.height}
            width={resetPass.width}
            src={resetPass.src}
            alt=""
          />
        </div>
      </div>
    </div>
  );
}

Security.propTypes = {
  name: ProtoTypes.string,
  activeTab: ProtoTypes.string,
};

export default Security;
