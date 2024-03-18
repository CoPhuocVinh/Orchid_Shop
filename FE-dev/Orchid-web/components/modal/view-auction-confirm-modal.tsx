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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { toast } from "sonner";
import { updateStatusRejectAuction } from "@/lib/actions";

export const ViewConfirmModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const { data: session } = useSession();
  const isOpenModal =
    (isOpen && type === "confirmAuction") ||
    (isOpen && type === "rejectAuction");

  const ResonSchema = z.object({
    reasonReject: z.string().min(3, "Vui lòng nhập lý do từ chối"),
  });
  const form = useForm<z.infer<typeof ResonSchema>>({
    resolver: zodResolver(ResonSchema),
    defaultValues: {
      reasonReject: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof ResonSchema>) => {
    React.startTransition(() => {
      toast.promise(
        updateStatusRejectAuction({
          id: data.auction?.id,
          rejected: true,
          reasonReject: values.reasonReject,
        }),
        {
          loading: "Update...",
          success: () => "Auction update successfully.",
          error: () => "Dellete error",
        }
      );
    });

    form.reset();
    onClose();
  };

  const handleClose = () => {
    form.reset();
    onClose();
  };

  const isLoading = form.formState.isLoading;

  return (
    <Dialog open={isOpenModal} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {type === "confirmAuction" && (
              <span>Đơn từ chối lên buổi đấu giá</span>
            )}
            {type === "rejectAuction" && <span>Can thiệp buổi đấu giá</span>}
          </DialogTitle>
          <DialogDescription>
            Hành động này không thể quay lại nếu tiếp tục.
          </DialogDescription>
        </DialogHeader>

        <div>Lý do</div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="reasonReject"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      className="text-bgray-800 text-base border focus-visible:ring-0  focus-visible:ring-offset-0 border-bgray-300 dark:border-darkblack-400 dark:bg-darkblack-500 dark:text-white h-14 w-full focus:border-success-300 focus:ring-0 rounded-lg px-4 py-3.5 placeholder:text-bgray-500 placeholder:text-base"
                      placeholder="Nhập lý do bạn từ chối"
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>

        <div className="pt-6 space-x-2 flex items-center justify-end w-full">
          <Button type="button" variant="primary" onClick={handleClose}>
            Đóng
          </Button>
          <Button
            type="button"
            variant="destructive"
            disabled={isLoading}
            onClick={form.handleSubmit(onSubmit)}
          >
            Xác nhận
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
