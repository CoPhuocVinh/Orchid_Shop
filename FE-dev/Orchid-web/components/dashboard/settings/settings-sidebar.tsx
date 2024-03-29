import TabBtn from "../button/tab-btn";
import Progressbar from "../chart/progress-bar";

function SettingsSidebar({ activeTab, handleActiveTab }: any) {
  return (
    <aside className="col-span-3 border-r border-bgray-200 dark:border-darkblack-400">
      {/* Sidebar Tabs */}

      <div className="px-4 py-6">
        <TabBtn
          activeTab={activeTab}
          handleTabActive={handleActiveTab}
          name="personalInfo"
          title="Personal Informations"
          text="Est arcu pharetra proin pellentesque"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <ellipse
              cx="12"
              cy="17.5"
              rx="7"
              ry="3.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            <circle
              cx="12"
              cy="7"
              r="4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
          </svg>
        </TabBtn>

      </div>
      {/* Progressbar  */}
      <div className="px-8">
        <Progressbar className="bg-bgray-200 dark:bg-darkblack-500 p-7 rounded-xl" />
      </div>
    </aside>
  );
}

export default SettingsSidebar;
