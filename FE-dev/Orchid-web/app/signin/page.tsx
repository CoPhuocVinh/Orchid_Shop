

import LeftSide from "@/components/dashboard/signin/LeftSide";
import signinImg from "/public/static/images/illustration/signin.svg";
import RightSide from "@/components/dashboard/signin/RightSide";

function SignIn() {
  return (
    <section className="bg-white dark:bg-darkblack-500">
      <div className="flex flex-col lg:flex-row justify-between min-h-screen">
        <LeftSide />
        <RightSide img={signinImg} />
      </div>
    </section>
  );
}

export default SignIn;
