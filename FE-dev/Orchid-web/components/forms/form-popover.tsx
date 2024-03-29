"use client";

import React, { ElementRef, useRef } from "react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverClose,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useSession } from "next-auth/react";
import { addMoneyToWallet } from "@/lib/actions/wallet";
interface FormPopoverProps {
  children: React.ReactNode;
  side?: "left" | "right" | "top" | "bottom";
  align?: "start" | "center" | "end";
  sideOffset?: number;
}

const FormPopover = ({
  children,
  side = "bottom",
  align,
  sideOffset = 0,
}: FormPopoverProps) => {
  const router = useRouter();
  const closeRef = useRef<ElementRef<"button">>(null);
  const { data: session } = useSession();
  const userId = session?.user.id

  const WalletSchema = z.object({
    price: z.coerce.number().min(10000, "Vui lòng nhập mệnh giá 10000 trở lên"),
  });

  const form = useForm<z.infer<typeof WalletSchema>>({
    resolver: zodResolver(WalletSchema),
    defaultValues: {
      price: 0,
    },
  });

  const onSubmit = async (values: z.infer<typeof WalletSchema>) => {

    try {
      const paymentUrl = await addMoneyToWallet(
        userId!,
        values.price
      );

      console.log(paymentUrl)
      if (paymentUrl) {
        window.location.href = paymentUrl;
      } else {
        toast.error("An error occurred while initiating the payment process.");
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred while adding money to your wallet.");
    }
  };

  const isLoading = form.formState.isSubmitting;

  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent
        align={align}
        className="w-80 pt-3"
        side={side}
        sideOffset={sideOffset}
      >
        <div className="text-sm font-medium text-center text-neutral-600 pb-4">
          Thêm tiền vào ví
        </div>
        <PopoverClose ref={closeRef} asChild>
          <Button
            className="h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600"
            variant="ghost"
          >
            <X className="h-4 w-4" />
          </Button>
        </PopoverClose>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      className="text-bgray-800 text-base border focus-visible:ring-0  focus-visible:ring-offset-0 border-bgray-300 dark:border-darkblack-400 dark:bg-darkblack-500 dark:text-white h-14 w-full focus:border-success-300 focus:ring-0 rounded-lg px-4 py-3.5 placeholder:text-bgray-500 placeholder:text-base"
                      placeholder="EX: 10000"
                      disabled={isLoading}
                      type="number"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={isLoading}
              variant="action"
              className="py-3.5 flex items-center justify-center text-white font-bold bg-success-300 hover:bg-success-400 transition-all rounded-lg w-full"
            >
              Nạp tiền
            </Button>
          </form>
        </Form>
      </PopoverContent>
    </Popover>
  );
};

export default FormPopover;
