"use client";
import * as z from "zod";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Separator } from "@/components/ui/separator";

import { IAuction, IProductForm } from "@/types/dashboard";
import { ImageUploadOne } from "@/components/image-cloudinary-upload/image-upload";

import { toast } from "sonner";
import {
  createAuction,
  deleteAuction,
  updateAuctionDetail,
} from "@/lib/actions";
import { AlertModal } from "@/components/modal/alert-modal";
import { Heading } from "@/components/dashboard-heading";
import { DateTimePicker } from "@/components/date-time-picker/date-time-picker";

const formSchema = z.object({
  startDate: z.date().refine(
    (date) => {
      const now = new Date();
      return date !== null && date >= now;
    },
    { message: "Vui lòng chọn không chọn ngày trong quá khứ" }
  ),
  endDate: z.date().refine(
    (date) => {
      const now = new Date();
      return date !== null && date >= now;
    },
    { message: "Vui lòng chọn không chọn ngày trong quá khứ" }
  ),
  remindAt: z.date().refine(
    (date) => {
      const now = new Date();
      return date !== null && date >= now;
    },
    { message: "Vui lòng chọn không chọn ngày trong quá khứ" }
  ),
  quantity: z.coerce
    .number()
    .min(1, { message: "Hãy nhập giá tiền khởi điểm" }),
  depositPrice: z.coerce
    .number()
    .min(1, { message: "Hãy nhập giá tiền depositPrice" }),
  startPrice: z.coerce
    .number()
    .min(1, { message: "Hãy nhập giá tiền startPrice" }),

  productID: z.coerce.number().min(1, { message: "Hãy chọn sản phẩm đấu giá" }),
  image_url: z.string().min(1, { message: "Hãy thêm ít nhất 1 ảnh" }),
});

export type AuctionFormValues = z.infer<typeof formSchema>;

interface AuctionFormProps {
  initialData: IAuction | null;
  products: IProductForm[];
}

export const AuctionForm: React.FC<AuctionFormProps> = ({
  initialData,
  products,
}) => {
  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? "Chỉnh sửa buổi đấu giá" : "Tạo buổi đấu giá";
  const description = initialData
    ? "chỉnh sửa buổi đấu giá."
    : "Thêm buổi đấu giá mới";
  const toastMessage = initialData
    ? "buổi đấu giá cập nhật thành công."
    : "buổi đấu giá được tạo thành công .";
  const action = initialData ? "Lưu thay đổi" : "Tạo";

  const defaultValues = initialData
    ? {
        ...initialData,

        startDate: initialData.startDate
          ? new Date(initialData.startDate)
          : undefined,
        endDate: initialData.endDate
          ? new Date(initialData.endDate)
          : undefined,
        remindAt: initialData.remindAt
          ? new Date(initialData.remindAt)
          : undefined,
      }
    : {
        startDate: undefined,
        endDate: undefined,
        remindAt: undefined,
        startPrice: 0,
        depositPrice: 0,
        quantity: 0,
        productID: 0,
        image_url: "",
      };

  const form = useForm<AuctionFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });
  console.log(typeof initialData?.startDate);
  const onSubmit = async (data: AuctionFormValues) => {

    const startDateFormat = data.startDate
      ? new Date(data.startDate).toISOString().replace("Z", "")
      : undefined;

    const endDateFormat = data.endDate
      ? new Date(data.endDate).toISOString().replace("Z", "")
      : undefined;
    const remindAtFormtat = data.remindAt
      ? new Date(data.endDate).toISOString().replace("Z", "")
      : undefined;

    const value = {
      ...data,
      startDate: startDateFormat,
      endDate: endDateFormat,
      remindAt: remindAtFormtat,
    };
    // console.log({
    //   ...data,
    //   startDate: startDateFormat,
    //   endDate: endDateFormat,
    //   remindAt: remindAtFormtat,
    // });

    try {
      setLoading(true);
      if (initialData) {
        await updateAuctionDetail(params.auctionId as string, value);
      } else {
        await createAuction(value);
        form.reset();
      }

      toast.success(toastMessage);
    } catch (error: any) {
      toast.error("Đã có lỗi.", error);
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    if (initialData)
      try {
        setLoading(true);

        await deleteAuction(params.auctionId as string);

        router.push(`/dashboard/auctions`);
        toast.success("auctions deleted.");
      } catch (error: any) {
        toast.error("Đã có lỗi.");
      } finally {
        setLoading(false);
        setOpen(false);
      }
    else return;
  };

  const isLoading = form.formState.isSubmitting;

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            disabled={loading}
            variant="destructive"
            size="sm"
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <FormField
            control={form.control}
            name="image_url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hình ảnh</FormLabel>
                <FormControl>
                  <ImageUploadOne
                    value={field.value}
                    disabled={isLoading}
                    onChange={(imageUrl) => field.onChange(imageUrl)}
                    onRemove={() => field.onChange(null)}
                  />
                </FormControl>
                <FormMessage className="dark:text-yellow-300" />
              </FormItem>
            )}
          />
          <div className="md:grid md:grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="datetime">Start time</FormLabel>
                  <FormControl>
                    <DateTimePicker
                      granularity="minute"
                      jsDate={field.value ? new Date(field.value) : null}
                      onJsDateChange={field.onChange}
                      aria-label="Time Field"
                      // isDisabled={
                      //   field.value && new Date(field.value) < new Date()
                      // }
                    />
                  </FormControl>
                  <FormMessage className="dark:text-yellow-300" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="endDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="datetime">End time</FormLabel>
                  <FormControl>
                    <DateTimePicker
                      granularity="minute"
                      jsDate={field.value ? new Date(field.value) : null}
                      onJsDateChange={field.onChange}
                      aria-label="Time Field"
                    />
                  </FormControl>
                  <FormMessage className="dark:text-yellow-300" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="remindAt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="datetime">Remind time</FormLabel>
                  <FormControl>
                    <DateTimePicker
                      granularity="minute"
                      jsDate={field.value ? new Date(field.value) : null}
                      onJsDateChange={field.onChange}
                      aria-label="Time Field"
                    />
                  </FormControl>
                  <FormMessage className="dark:text-yellow-300" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="productID"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Chọn sản phẩm</FormLabel>
                  <Select
                    disabled={isLoading}
                    onValueChange={field.onChange}
                    value={field.value.toString()}
                    defaultValue={field.value.toString()}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value.toString()}
                          placeholder="Lựa chọn sản phẩm đấu giá"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {products.map((product) => (
                        <SelectItem
                          key={product.productID}
                          value={product.productID.toString()}
                        >
                          <span>{product.productName}</span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage className="dark:text-yellow-300" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Số lượng</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={isLoading}
                      placeholder="0"
                      {...field}
                      className="bg-zinc-200/50 dark:bg-zinc-700/50 focus-visible:ring-0 text-black dark:text-white focus-visible:ring-offset-0"
                    />
                  </FormControl>
                  <FormMessage className="dark:text-yellow-300" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="startPrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Giá bắt đầu</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={isLoading}
                      placeholder="0"
                      {...field}
                      className="bg-zinc-200/50 dark:bg-zinc-700/50 focus-visible:ring-0 text-black dark:text-white focus-visible:ring-offset-0"
                    />
                  </FormControl>
                  <FormMessage className="dark:text-yellow-300" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="depositPrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>depositPrice</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={isLoading}
                      placeholder="0"
                      {...field}
                      className="bg-zinc-200/50 dark:bg-zinc-700/50 focus-visible:ring-0 text-black dark:text-white focus-visible:ring-offset-0"
                    />
                  </FormControl>
                  <FormMessage className="dark:text-yellow-300" />
                </FormItem>
              )}
            />
          </div>

          <div className="space-x-4">
            <Button
              disabled={isLoading}
              variant="action"
              className="ml-auto"
              type="submit"
            >
              {action}
            </Button>
            <Button
              disabled={isLoading}
              variant="outline"
              className="ml-auto"
              type="button"
              onClick={() => router.push("/dashboard/auctions")}
            >
              Quay lại
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};
