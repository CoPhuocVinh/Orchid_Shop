"use client";

import * as React from "react";

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

import { addMoneyToWallet } from "@/lib/actions";
import { Icons } from "../icons";
import { cn, formatter } from "@/lib/utils";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { useGetWallet } from "@/lib/react-query/queries";
import { WalletSkeleton } from "../loader/wallet-loader";
import TestPageSuccess from "@/app/test-success/page";

enum STEPS {
  WALLET_INFO = 0,
  ADD_MONEY = 1,
  CONFIRM_BILL = 2,
  CONFIRM_TO_PAYMENT = 3,
}

const moneyCard = [
  {
    value: 10000,
    className: "bg-[#e3caa3] hover:bg-yellow-300",
  },
  {
    value: 20000,
    className: "bg-[#8aadd3] hover:bg-blue-400",
  },
  {
    value: 50000,
    className: "bg-[#eba8b6] hover:bg-pink-300",
  },
  {
    value: 100000,
    className: "bg-[#6e895d] hover:bg-green-700",
  },
  {
    value: 200000,
    className: "bg-[#b8b07f] hover:bg-orange-400",
  },
  {
    value: 500000,
    className: "",
  },
];

export const WalletModal = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { data: session } = useSession();
  const userId = session?.user.id;

  const { isOpen, onClose, type } = useModal();
  const isOpenModal = isOpen && type === "walletModal";

  const { data: wallet, isLoading: walletLoading } = useGetWallet(userId!);

  const WalletSchema = z.object({
    price: z.coerce.number().min(10000, "Vui lòng nhập mệnh giá 10000 trở lên"),
  });

  const form = useForm<z.infer<typeof WalletSchema>>({
    resolver: zodResolver(WalletSchema),
    defaultValues: {
      price: 0,
    },
  });

  const [step, setStep] = useState(STEPS.WALLET_INFO);

  const [selectedValue, setSelectedValue] = useState<number>(0);

  const onBack = () => {
    setStep((value) => value - 1);
  };

  const onNext = () => {
    setStep((value) => value + 1);
  };

  const onSubmit = async () => {
    if (step !== STEPS.CONFIRM_TO_PAYMENT) {
      return onNext();
    }

    const price = form.getValues("price");
    console.log(price)

    try {
      const paymentUrl = await addMoneyToWallet(userId!, price);

      console.log(paymentUrl);

      if (paymentUrl) {
        window.location.href = paymentUrl;
      } else {
        toast.error("Vui lòng nhập số tiền lớn hơn 10,000VNĐ để thanh toán.");
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred while adding money to your wallet.");
    }
  };

  const actionLabel = useMemo(() => {
    switch (step) {
      case STEPS.WALLET_INFO:
        return "Nạp tiền";
      case STEPS.ADD_MONEY:
        const price = form.getValues("price");
        return price >= 10000 ? "Tiếp tục" : "Tiếp tục";
      case STEPS.CONFIRM_BILL:
        return "Xác nhận";
      case STEPS.CONFIRM_TO_PAYMENT:
        return "Xác nhận";
      default:
        return "";
    }
  }, [step, form]);

  const secondaryActionLabel = useMemo(() => {
    return step === STEPS.WALLET_INFO ? undefined : "Quay lại";
  }, [step]);

  let bodyContent = null;

  switch (step) {
    case STEPS.WALLET_INFO:
      bodyContent = (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">
            Thông tin ví
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-100 rounded-lg p-4 flex flex-col">
              <div className="flex items-center mb-2">
                <Icons.walletUserIcon />
                <p className="text-gray-600 font-semibold">Số dư:</p>
              </div>
              <p className="text-3xl font-bold text-green-600">
                {formatter.format(wallet?.data?.balance!)}
              </p>
            </div>
            <div className="bg-gray-100 rounded-lg p-4 flex flex-col">
              <div className="flex items-center mb-2">
                <Icons.linkWalletIcon />
                <p className="text-gray-600 font-semibold">Mã ví:</p>
              </div>
              <p className="text-lg font-mono text-blue-600">
                0x123456789abcdef
              </p>
            </div>
          </div>
        </div>
      );
      break;
    case STEPS.ADD_MONEY:
      bodyContent = (
        <div className="flex flex-col gap-4">
          <div className="bg-gray-100 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Nạp tiền</h3>
            <div className="grid grid-cols-3 gap-4 font-bold text-black text-lg">
              {moneyCard.map((item, index) => (
                <Button
                  key={index}
                  variant="action"
                  className={cn(
                    `${item.className}`,
                    selectedValue === item.value
                      ? " border-darkblack-700 border-2 text-black"
                      : item.className
                  )}
                  onClick={() => {
                    setSelectedValue(item.value);
                    form.setValue("price", item.value);
                  }}
                >
                  {formatter.format(item.value)} đ
                </Button>
              ))}
            </div>
            <div className="mt-4">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            className="text-bgray-800 text-base border focus-visible:ring-0  focus-visible:ring-offset-0 border-bgray-300 dark:border-darkblack-400 dark:bg-darkblack-500 dark:text-white h-14 w-full focus:border-success-300 focus:ring-0 rounded-lg px-4 py-3.5 placeholder:text-bgray-500 placeholder:text-base"
                            placeholder="Nhập giá tiền của bạn"
                            disabled={isLoading}
                            type="number"
                            {...field}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />


                </form>
              </Form>
            </div>
          </div>
        </div>
      );
      break;
    case STEPS.CONFIRM_BILL:
      bodyContent = (
        <div className="flex flex-col gap-4">
          <div className="bg-gray-100 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Xác nhận thông tin</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600 mb-2">Số tiền:</p>
                <p className="font-semibold">{form.getValues("price")} đ</p>
              </div>
              <div>
                <p className="text-gray-600 mb-2">Tên người dùng:</p>
                <p className="font-semibold">{session?.user.name}</p>
              </div>
            </div>
          </div>
        </div>
      );
      break;
    case STEPS.CONFIRM_TO_PAYMENT:
      bodyContent = (
        <div className="flex flex-col gap-8">
          <p className="text-lg text-pink-700 font-bold text-center ">
            Bạn có chắc là muốn thanh toán hay không
          </p>
        </div>
      );
      break;
    default:
      break;
  }

  return (
    <>
      <Dialog open={isOpenModal} onOpenChange={onClose}>
        <DialogContent className="bg-white text-black p-0 overflow-hidden">
          <DialogHeader className="pt-2 px-6">
            <DialogTitle className="text-2xl text-center font-bold">
              Ví của bạn
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
                disabled={
                  isLoading ||
                  (step === STEPS.ADD_MONEY && form.getValues("price") < 10000)
                }
              >
                {actionLabel}
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
