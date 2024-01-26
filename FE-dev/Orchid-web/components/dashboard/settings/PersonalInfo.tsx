import ProtoTypes from "prop-types";
import profileImg from "/public/static/images/avatar/profile.png";
import coverImg from "/public/static/images/others/cover.jpg";
import Image from "next/image";
import PersonalInfoFrom from "../forms/personal-info-form";

function PersonalInfo({ name, activeTab }: any) {
  return (
    <div id="tab1" className={`tab-pane ${name === activeTab && "active"}`}>
      <div className="xl:grid grid-cols-12 gap-12 flex 2xl:flex-row flex-col-reverse">
        <PersonalInfoFrom />
        <div className="2xl:col-span-4 xl:col-span-5 2xl:mt-24">
          <header className="mb-8">
            <h4 className="font-bold text-lg text-bgray-800 dark:text-white mb-2">
              Update Profile
            </h4>
            <p className="mb-4 text-bgray-500">
              Profile of at least Size
              <span className="text-bgray-900 dark:text-darkblack-300">
                300x300.
              </span>{" "}
              Gifs work too.
              <span className="text-bgray-900">Max 5mb.</span>
            </p>
            <div className="text-center m-auto w-40 h-40 relative">
              <Image
                priority={true}
                height={profileImg.height}
                width={profileImg.width}
                src={profileImg.src}
                alt=""
              />
              <button aria-label="none" className="absolute right-4 bottom-1">
                <svg
                  width="29"
                  height="29"
                  viewBox="0 0 29 29"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="14.2414"
                    cy="14.2414"
                    r="14.2414"
                    fill="#22C55E"
                  />
                  <path
                    d="M14.6994 10.2363C15.7798 11.3167 16.8434 12.3803 17.9171 13.454C17.7837 13.584 17.6403 13.7174 17.5036 13.8574C15.5497 15.8114 13.5924 17.7653 11.6385 19.7192C11.5118 19.8459 11.3884 19.9726 11.2617 20.0927C11.2317 20.1193 11.185 20.1427 11.145 20.1427C10.1281 20.146 9.11108 20.1427 8.0941 20.146C8.02408 20.146 8.01074 20.1193 8.01074 20.0593C8.01074 19.049 8.01074 18.0354 8.01408 17.0251C8.01408 16.9784 8.03742 16.9217 8.06743 16.8917C9.26779 15.688 10.4682 14.4876 11.6685 13.2873C12.6655 12.2903 13.6591 11.2967 14.6561 10.2997C14.6761 10.2797 14.6861 10.253 14.6994 10.2363Z"
                    fill="white"
                  />
                  <path
                    d="M18.6467 12.7197C17.573 11.646 16.506 10.579 15.4424 9.51537C15.6324 9.31864 15.8292 9.11858 16.0259 8.91852C16.256 8.68845 16.4894 8.45838 16.7228 8.22831C17.0162 7.93822 17.4197 7.93822 17.7097 8.22831C18.4466 8.9552 19.1802 9.68542 19.9171 10.4123C20.2038 10.6957 20.2138 11.0992 19.9371 11.3859C19.5136 11.8261 19.0868 12.2629 18.6634 12.703C18.66 12.7097 18.65 12.7163 18.6467 12.7197Z"
                    fill="white"
                  />
                </svg>
              </button>
            </div>
          </header>
          <div>
            <h4 className="font-bold text-lg text-bgray-800 dark:text-white mb-2">
              Update Cover
            </h4>
            <p className="mb-4 text-bgray-500 dark:text-bgray-50">
              Cover of at least Size
              <span className="text-bgray-900">1170x920 </span>
            </p>
            <div className="relative w-full">
              <Image
                priority={true}
                height={coverImg.height}
                width={coverImg.width}
                src={coverImg.src}
                className="w-full"
                alt=""
              />
              <button aria-label="none" className="absolute right-2 bottom-2">
                <svg
                  width="29"
                  height="29"
                  viewBox="0 0 29 29"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="14.2414"
                    cy="14.2414"
                    r="14.2414"
                    fill="#22C55E"
                  />
                  <path
                    d="M14.6994 10.2363C15.7798 11.3167 16.8434 12.3803 17.9171 13.454C17.7837 13.584 17.6403 13.7174 17.5036 13.8574C15.5497 15.8114 13.5924 17.7653 11.6385 19.7192C11.5118 19.8459 11.3884 19.9726 11.2617 20.0927C11.2317 20.1193 11.185 20.1427 11.145 20.1427C10.1281 20.146 9.11108 20.1427 8.0941 20.146C8.02408 20.146 8.01074 20.1193 8.01074 20.0593C8.01074 19.049 8.01074 18.0354 8.01408 17.0251C8.01408 16.9784 8.03742 16.9217 8.06743 16.8917C9.26779 15.688 10.4682 14.4876 11.6685 13.2873C12.6655 12.2903 13.6591 11.2967 14.6561 10.2997C14.6761 10.2797 14.6861 10.253 14.6994 10.2363Z"
                    fill="white"
                  />
                  <path
                    d="M18.6467 12.7197C17.573 11.646 16.506 10.579 15.4424 9.51537C15.6324 9.31864 15.8292 9.11858 16.0259 8.91852C16.256 8.68845 16.4894 8.45838 16.7228 8.22831C17.0162 7.93822 17.4197 7.93822 17.7097 8.22831C18.4466 8.9552 19.1802 9.68542 19.9171 10.4123C20.2038 10.6957 20.2138 11.0992 19.9371 11.3859C19.5136 11.8261 19.0868 12.2629 18.6634 12.703C18.66 12.7097 18.65 12.7163 18.6467 12.7197Z"
                    fill="white"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

PersonalInfo.propTypes = {
  name: ProtoTypes.string,
  activeTab: ProtoTypes.string,
};

export default PersonalInfo;
