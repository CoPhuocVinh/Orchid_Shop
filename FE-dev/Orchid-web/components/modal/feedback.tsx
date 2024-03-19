"use client";

import * as React from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
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
import { Textarea } from "../ui/textarea";
import { toast } from "sonner";
import { feedbackAuctionLive } from "@/lib/actions";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";

export const FeedBackModal = () => {
  const { isOpen, onClose, type } = useModal();

  const isOpenModal = isOpen && type === "feedBack";
  const { data: session } = useSession();

  const params = useParams();
  const router = useRouter();

  const [isLoading, setIsLoading] = React.useState(false);

  const ResonSchema = z.object({
    content: z.string().min(1, "Vui lòng nhập feedback").max(250),
  });
  const form = useForm<z.infer<typeof ResonSchema>>({
    resolver: zodResolver(ResonSchema),
    defaultValues: {
      content: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof ResonSchema>) => {
    try {
      setIsLoading(true);
      await feedbackAuctionLive(
        session?.user.id.toString()!,
        params.auctionId.toString(),
        values.content
      );
      toast.success("Feed back thành công");
      onClose();
      form.reset();
      router.refresh();
    } catch (error) {
      toast.error("Có lỗi trong quá trình feedback");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    form.reset();
    onClose();
  };

  // const isLoading = form.formState.isLoading;

  return (
    <Dialog open={isOpenModal} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nhập feedback của bạn</DialogTitle>
          <DialogDescription>
            Feedback của bạn là niềm hân hạnh của chúng tôi
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      className="text-bgray-800 text-base border focus-visible:ring-0  focus-visible:ring-offset-0 border-bgray-300 dark:border-darkblack-400 dark:bg-darkblack-500 dark:text-white h-24 w-full focus:border-success-300 focus:ring-0 rounded-lg px-4 py-3.5 placeholder:text-bgray-500 placeholder:text-base"
                      placeholder="feedback của bạn"
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
          <Button type="button" variant="destructive" onClick={handleClose}>
            Đóng
          </Button>
          <Button
            type="button"
            variant="primary"
            disabled={isLoading}
            onClick={form.handleSubmit(onSubmit)}
          >
            Gửi feedback
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
