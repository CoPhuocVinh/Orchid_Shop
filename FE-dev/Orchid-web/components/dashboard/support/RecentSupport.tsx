import GreenBorderBtn from "../button/green-border-btn";
import GreenBtnV2 from "../button/green-btn-v2";
import WhiteBtn from "../button/white-btn";
import RecentSupportItem from "./RecentSupportItem";
import sa1 from "/public/static/images/avatar/sa-1.png";
import sa2 from "/public/static/images/avatar/sa-2.png";
import sa3 from "/public/static/images/avatar/sa-3.png";

function RecentSupport() {
  return (
    <div className="2xl:block hidden">
      <ul className="flex gap-4 mb-6">
        <GreenBtnV2 text="Your Inbox" />
        <GreenBorderBtn text="Done" />
        <GreenBorderBtn text="Saved" />
      </ul>
      <div className="border border-bgray-200 dark:border-darkblack-400 rounded-lg py-8 px-6 w-full">
        <div className="tab-panel">
          <h4 className="font-medium text-bgray-900 dark:text-white font-poppins text-lg mb-4">
            Recent Support
          </h4>
          <RecentSupportItem
            img={sa1}
            name="Joel Becker"
            time="12h"
            question="When is the Sketch version available for download?"
            answer={`" Love this so much! What tools do you use to create your 3d illustrations ? "`}
          />
          <RecentSupportItem
            img={sa2}
            name="Joel Becker"
            time="12h"
            question="When is the Sketch version available for download?"
            answer={`" Love this so much! What tools do you use to create your 3d illustrations ? "`}
            className="bg-success-300"
          />
          <RecentSupportItem
            img={sa3}
            name="Joel Becker"
            time="12h"
            question="When is the Sketch version available for download?"
            answer={`" Love this so much! What tools do you use to create your 3d illustrations ? "`}
          />
          <div className="flex justify-center">
            <WhiteBtn text="Load More" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecentSupport;
