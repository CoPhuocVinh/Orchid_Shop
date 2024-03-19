"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Label } from "@/components/ui/label";
const FailPAGE = () => {
  const pathname = usePathname();
  console.log(pathname, "test trang page");
  const router = useRouter();
  const [showDialog, setShowDialog] = useState(true);

  useEffect(() => {
    setShowDialog(true);
  }, []);
  if (!showDialog) {
    return null;
  }

  return (
    <div className="relative h-screen flex items-center justify-center">
      {/* Nội dung trang */}

      <Dialog open={true} onOpenChange={setShowDialog}>
        {/* DialogContent luôn được hiển thị */}
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader className="flex items-center justify-center">
            <Image
              src="/static/images/payments/vnpay-avt.png"
              alt="VNPAY"
              width={300} // Độ rộng mong muốn của hình ảnh
              height={300} // Độ cao mong muốn của hình ảnh
              className="h-40 w-40 rounded-lg"
              layout="fixed"
            />

            <div className="flex items-center">
              <DialogDescription className="mr-2 text-black">
                Thanh toán thất bại rồi
              </DialogDescription>
              <div className="animate-bounce w-5 h-5 text-green-500">
                {/* Animation "V" */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="red"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 items-center gap-4">
              {/* <Label htmlFor="name" className="text-center block">
                  Thông tin thanh toán
                </Label> */}
            </div>
            <div className="grid grid-cols-1 items-center gap-4">
              <Label htmlFor="name" className="text-center block ">
                Thanh toán có sự cố gì đó rồi bạn vui lòng quay lại trang chủ
                nhé
              </Label>
            </div>
          </div>
          <DialogFooter className="flex justify-center">
            {/* Căn giữa nội dung */}
            <Button
              onClick={() => {
                router.push("/");
              }}
            >
              Trở về trang chủ
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Hình nền */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/banner/hoa-lan-dau-gia.png"
          alt="Background image"
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
      </div>
    </div>
  );
};

export default FailPAGE;
