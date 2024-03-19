"use client";

import * as React from "react";
import axios from "axios";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useModal } from "@/hooks/use-modal";
import { Button } from "../ui/button";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

import { api } from "@/lib/api-interceptor/api";
import { registerAttendAuction } from "@/lib/actions";

enum STEPS {
  INFO_AUCTION = 0,
  CONFIRM_TO_ATTEND = 1,
}

export const RegiterAuctionModal = () => {
  const router = useRouter();
  const { isOpen, onClose, type, data } = useModal();
  const { data: session } = useSession();
  const isOpenModal = isOpen && type === "registerAtendAction";

  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(STEPS.INFO_AUCTION);

  const onBack = () => {
    setStep((value) => value - 1);
  };

  const onNext = () => {
    setStep((value) => value + 1);
  };

  const onSubmit = async () => {
    if (step !== STEPS.CONFIRM_TO_ATTEND) {
      return onNext();
    }

    setIsLoading(true);

    try {
      const { success, error } = await registerAttendAuction(session?.user.id!, data.auction?.id.toString()!);
      if (success) {
        toast.success("Đăng kí đấu giá thành công");
        onClose();
      } else if (error) {
        toast.error(error);
      } else {
        toast.error('An unexpected error occurred during registration');
      }
    } catch (error) {
      toast.error('An unexpected error occurred');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const actionLabel = useMemo(() => {
    switch (step) {
      case STEPS.INFO_AUCTION:
        return "Đăng kí";
      case STEPS.CONFIRM_TO_ATTEND:
        return "Xác nhận";
      default:
        return "";
    }
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    return step === STEPS.INFO_AUCTION ? undefined : "Quay lại";
  }, [step]);

  let bodyContent = (
    <div className="flex flex-col gap-4">
      <div className="bg-gray-100 p-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-4">Thông tin buổi đấu giá</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-gray-600 mb-2">Tên buổi đấu giá:</p>
            <p className="font-semibold">{data.auction?.productName}</p>
          </div>
          <div>
            <p className="text-gray-600 mb-2">Ngày bắt đầu:</p>
            <p className="font-semibold">
              {data.auction?.startDate?.toString()}
            </p>
          </div>
          <div>
            <p className="text-gray-600 mb-2">Tiền cọc tham gia:</p>
            <p className="font-semibold">{data.auction?.startPrice}</p>
          </div>
          <div>
            <p className="text-gray-600 mb-2">Tên người đấu giá:</p>
            <p className="font-semibold">{session?.user.name}</p>
          </div>
        </div>
      </div>
    </div>
  );

  if (step === STEPS.CONFIRM_TO_ATTEND) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <p className="text-lg text-pink-700 font-bold ">
          Bạn có chắc là muốn tham gia buổi đấu giá không ?
        </p>
      </div>
    );
  }

  return (
    <Dialog open={isOpenModal} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-2 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Đăng kí tham gia buổi đấu giá
          </DialogTitle>
          <DialogDescription>
            <div className="mt-2 text-sm text-muted-foreground">
              {bodyContent}
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="bg-gray-100 px-6 py-4">
          <div className="flex items-center justify-end space-x-4  w-full">
            {secondaryActionLabel && (
              <Button type="button" onClick={onBack} disabled={isLoading}>
                {secondaryActionLabel}
              </Button>
            )}
            <Button
              type="submit"
              variant="primary"
              onClick={onSubmit}
              disabled={isLoading}
              className=""
            >
              {actionLabel}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
