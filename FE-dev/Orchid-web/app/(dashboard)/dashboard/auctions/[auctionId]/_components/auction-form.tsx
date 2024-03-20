"use client";
import * as z from "zod";
import { useRef, useState } from "react";
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
import {
  DateTimePicker,
  DateTimePickerRef,
} from "@/components/date-time-picker/date-time-picker";
import { adjustTimeZoneOffset } from "@/hooks/use-countdown-time";
import { auctionSchema } from "@/lib/schemas";

export type AuctionFormValues = z.infer<typeof auctionSchema>;

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

  const dateTimePickerRef = useRef<DateTimePickerRef>(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const waitingStatus = initialData?.status === "WAITING";
  const comingStatus = initialData?.status === "COMING";
  const liveStatus = initialData?.status === "LIVE";
  const endStatus = initialData?.status === "END";

  const notPermissionAlowEdit = liveStatus || endStatus;
  const comingNotPermissionEdit = comingStatus;

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
        title: "",
      };

  const form = useForm<AuctionFormValues>({
    resolver: zodResolver(auctionSchema),
    defaultValues,
  });

  const onSubmit = async (data: AuctionFormValues) => {
    const startDateFormat = adjustTimeZoneOffset(data.startDate, 7);
    const endDateFormat = adjustTimeZoneOffset(data.endDate, 7);
    const remindAtFormtat = adjustTimeZoneOffset(data.remindAt, 7);

    const value = {
      ...data,
      startDate: startDateFormat,
      endDate: endDateFormat,
      remindAt: remindAtFormtat,
    };

    // console.log(value);

    try {
      setLoading(true);
      if (initialData) {
        await updateAuctionDetail(params.auctionId as string, value);
      } else {
        await createAuction(value);
        router.push("/dashboard/auctions");
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
                    disabled={isLoading || notPermissionAlowEdit}
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
                  <FormLabel htmlFor="datetime">Ngày bắt đầu</FormLabel>
                  <FormControl>
                    <DateTimePicker
                      granularity="minute"
                      jsDate={field.value ? new Date(field.value) : null}
                      onJsDateChange={field.onChange}
                      aria-label="Time Field"
                      // isDisabled={
                      //   field.value && new Date(field.value) < new Date()
                      // }
                      isDisabled={notPermissionAlowEdit}
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
                  <FormLabel htmlFor="datetime">Ngày kết thúc</FormLabel>
                  <FormControl>
                    <DateTimePicker
                      granularity="minute"
                      jsDate={field.value ? new Date(field.value) : null}
                      onJsDateChange={field.onChange}
                      aria-label="Time Field"
                      isDisabled={notPermissionAlowEdit}
                    />
                  </FormControl>
                  {form.formState.errors.endDateInValid && (
                    <FormField
                      control={form.control}
                      name="endDateInValid"
                      render={() => (
                        <FormItem>
                          <FormMessage className="dark:text-yellow-300" />
                        </FormItem>
                      )}
                    />
                  )}
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="remindAt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="datetime">Ngày remindAt</FormLabel>
                  <FormControl>
                    <DateTimePicker
                      granularity="minute"
                      jsDate={field.value ? new Date(field.value) : null}
                      onJsDateChange={field.onChange}
                      aria-label="Time Field"
                      isDisabled={notPermissionAlowEdit}
                    />
                  </FormControl>
                  {form.formState.errors.remindAtDateInValid && (
                    <FormField
                      control={form.control}
                      name="remindAtDateInValid"
                      render={() => (
                        <FormItem>
                          <FormMessage className="dark:text-yellow-300" />
                        </FormItem>
                      )}
                    />
                  )}
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      autoComplete="off"
                      disabled={isLoading || notPermissionAlowEdit}
                      placeholder="vd: đấu giá lan..."
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
              name="productID"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Chọn sản phẩm</FormLabel>
                  <Select
                    disabled={isLoading}
                    onValueChange={field.onChange}
                    value={field.value === 0 ? "" : field.value.toString()}
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
                          disabled={
                            notPermissionAlowEdit || comingNotPermissionEdit
                          }
                        >
                          <span>
                            {product.productName
                              ? product.productName
                              : "Lựa chọn sản phẩm đấu giá"}
                          </span>
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
                      disabled={isLoading || notPermissionAlowEdit}
                      placeholder="Nhập khối lượng"
                      {...field}
                      value={field.value || ""}
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
                      placeholder="Nhập giá bắt đầu"
                      disabled={
                        isLoading ||
                        notPermissionAlowEdit ||
                        comingNotPermissionEdit
                      }
                      {...field}
                      value={field.value || ""}
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
                  <FormLabel>Bước nhảy giá</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Nhập bước nhảy giá"
                      disabled={
                        isLoading ||
                        notPermissionAlowEdit ||
                        comingNotPermissionEdit
                      }
                      {...field}
                      value={field.value || ""}
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
              disabled={isLoading || notPermissionAlowEdit}
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
