import Image from "next/image";
import React from "react";

const LeftSideAuction = () => {
  return (
    <div className="w-full md:w-2/3">
      <div className="w-full h-[250px] md:h-[350px] mb-4 relative rounded-sm">
        <Image src="/images/boats/1.jpg" alt="Big Image" fill />
      </div>

      <div className="flex relative space-x-4">
        <div className="w-[30%] md:w-[20%] h-[100px] relative">
          <Image src="/images/boats/1.jpg" alt="Small Image 1" fill />
        </div>
        <div className="w-[30%] md:w-[20%] h-[100px] relative">
          <Image src="/images/boats/1.jpg" alt="Small Image 2" fill />
        </div>
        <div className="w-[30%] md:w-[20%] h-[100px] relative">
          <Image src="/images/boats/1.jpg" alt="Small Image 3" fill />
        </div>
      </div>
    </div>
  );
};

export default LeftSideAuction;
