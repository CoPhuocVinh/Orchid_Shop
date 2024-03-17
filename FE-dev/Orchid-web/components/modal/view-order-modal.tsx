"use client";

import * as React from "react";
import { useSession } from "next-auth/react";

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

export const ViewOrderModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const { data: session } = useSession();
  const isOpenModal = isOpen && type === "viewInfoOrder";

  return (
    <Dialog open={isOpenModal} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-2 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Thông tin đơn hàng
          </DialogTitle>
          <DialogDescription>
            <div className="mt-2 text-sm text-muted-foreground">
              <div className="bg-gray-100 p-6 rounded-lg">
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
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="bg-gray-100 px-6 py-4">
          <div className="flex items-center justify-end space-x-4  w-full">
            <Button type="button" variant="primary" onClick={onClose}>
              Đóng
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};