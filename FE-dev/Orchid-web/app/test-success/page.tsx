"use client";

import { usePathname, useRouter } from "next/navigation";

const TestPage = () => {

  const pathname = usePathname();
// const router = useRouter();
  console.log(pathname)
  // console.log(router)


  //[{link : home}, ]


  // ----------------  home -----------auction --------- cart
  //  classname =  isActive =    pathname                  
//          router.link  === pathmane -> active ? "bgshdjfs" : "" 
  return (
    <div>
      THANH TOÁN THÀNH CÔNG UI
    </div>
  );
};

export default TestPage;
