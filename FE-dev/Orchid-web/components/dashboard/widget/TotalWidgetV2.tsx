import TotalWIdgetCardV2 from "./TotalWIdgetCardV2";
import earn from "/public/static/images/icons/total-earn.svg";
import member from "/public/static/images/avatar/members-2.png";

function TotalWidgetV2() {
  return (
    <div className="xl:w-66 w-full">
      <div className="grid sm:grid-cols-2 sm:gap-[24px] gap-3">
        <TotalWIdgetCardV2 logo={earn} activeMember={member} />
        <TotalWIdgetCardV2 logo={earn} activeMember={member} />
        <TotalWIdgetCardV2 logo={earn} activeMember={member} />
        <TotalWIdgetCardV2 logo={earn} activeMember={member} />
      </div>
    </div>
  );
}

export default TotalWidgetV2;
