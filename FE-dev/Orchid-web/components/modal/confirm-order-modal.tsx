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
import { confirmOrderDelivery, registerAttendAuction } from "@/lib/actions";

enum STEPS {
  INFO_ORDER = 0,
  CONFIRM_TO_DELIVERY = 1,
}

export const ConfirmOrderModal = () => {
  const router = useRouter();
  const { isOpen, onClose, type, data } = useModal();
  const { data: session } = useSession();
  const isOpenModal = isOpen && type === "confirmOrder";

  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(STEPS.INFO_ORDER);

  const onBack = () => {
    setStep((value) => value - 1);
  };

  const onNext = () => {
    setStep((value) => value + 1);
  };

  const onSubmit = async () => {
    if (step !== STEPS.CONFIRM_TO_DELIVERY) {
      return onNext();
    }

    setIsLoading(true);

    try {
      React.startTransition(() => {
        toast.promise(
          confirmOrderDelivery({
            orderId: data.order?.id,
            confirmed: true,
          }),
          {
            loading: "Cập nhật...",
            success: () => "Confirm đơn hàng thành công.",
            error: () => "Dellete error",
          }
        );
      });

      onClose();
    } catch (error) {
      toast.error("An unexpected error occurred");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const actionLabel = useMemo(() => {
    switch (step) {
      case STEPS.INFO_ORDER:
        return "Xác thực đơn hàng";
      case STEPS.CONFIRM_TO_DELIVERY:
        return "Xác nhận";
      default:
        return "";
    }
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    return step === STEPS.INFO_ORDER ? undefined : "Quay lại";
  }, [step]);

  let bodyContent = (
    <div className="flex flex-col gap-4">
      <div className="bg-gray-100 p-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-4">Thông tin đơn hàng</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-gray-600 mb-2">Mã đơn hàng:</p>
            <p className="font-semibold">{data.order?.id}</p>
          </div>
          <div>
            <p className="text-gray-600 mb-2">Trạng thái:</p>
            <p className="font-semibold">{data.order?.status}</p>
          </div>
          <div>
            <p className="text-gray-600 mb-2">Phương thức thanh toán:</p>
            <p className="font-semibold">{data.order?.paymentMethod}</p>
          </div>
          <div>
            <p className="text-gray-600 mb-2">Tổng tiền:</p>
            <p className="font-semibold">{data.order?.total}</p>
          </div>
          <div>
            <p className="text-gray-600 mb-2">Số điện thoại:</p>
            <p className="font-semibold">{data.order?.phone}</p>
          </div>
          <div>
            <p className="text-gray-600 mb-2">Địa chỉ:</p>
            <p className="font-semibold">{data.order?.address}</p>
          </div>
          <div>
            <p className="text-gray-600 mb-2">Tên sản phẩm:</p>
            <p className="font-semibold">{data.order?.productName}</p>
          </div>
          <div>
            <p className="text-gray-600 mb-2">Mã sản phẩm:</p>
            <p className="font-semibold">{data.order?.productCode}</p>
          </div>
          <div>
            <p className="text-gray-600 mb-2">Số lượng:</p>
            <p className="font-semibold">{data.order?.quantity}</p>
          </div>
          <div>
            <p className="text-gray-600 mb-2">Ghi chú:</p>
            <p className="font-semibold">{data.order?.note}</p>
          </div>
        </div>
      </div>
    </div>
  );

  if (step === STEPS.CONFIRM_TO_DELIVERY) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <p className="text-lg text-pink-700 font-bold ">Xác nhận đơn hàng</p>
      </div>
    );
  }

  return (
    <Dialog open={isOpenModal} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-2 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Đơn hàng
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
              <Button
                type="button"
                variant="destructive"
                onClick={onBack}
                disabled={isLoading}
              >
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
