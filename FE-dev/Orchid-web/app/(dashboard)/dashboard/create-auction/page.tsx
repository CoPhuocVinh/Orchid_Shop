"use client";
import { DateTimePicker } from "@/components/date-time-picker/date-time-picker";
import ImageUpload from "@/components/image-cloudinary-upload/image-upload";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type Category = {
  product_id: string;
  name: string;
};

const categories: Category[] = [
  {
    product_id: "1",
    name: "A - Product 1",
  },
  {
    product_id: "2",
    name: "B - Product 2",
  },
  {
    product_id: "3",
    name: "C - Product 3",
  },
];

const CreateAuction = () => {
  // const formSchema = z.object({
  //   productName: z.string().min(1, { message: "Hãy nhập tên sản phẩm" }),
  //   quantity: z.coerce.number().min(1, { message: "Hãy nhập giá tiền" }),
  //   description: z.string().min(1, { message: "Hãy nhập mô tả" }),
  //   category_id: z.string().min(1, { message: "Hãy chọn thể loại" }),
  //   images: z
  //     .object({ url: z.string() })
  //     .array()
  //     .min(1, { message: "Hãy nhập ít nhất 1 ảnh" }),
  //     startDate: z.date().refine((date) => date !== null, {
  //       message: "Hãy chọn ngày giờ bắt đầu",
  //     }),
  //     endDate: z.date().refine((date) => date !== null, {
  //       message: "Hãy ngày giờ kết thúc",
  //     }),
  // });

  const formSchema = z.object({
    productName: z.string().min(1, { message: "Hãy nhập tên sản phẩm" }),
    quantity: z.coerce
      .number()
      .min(1, { message: "Hãy nhập giá tiền khởi điểm" }),
    description: z.string().min(1, { message: "Hãy nhập mô tả" }),
    product_id: z.string().min(1, { message: "Hãy chọn sản phẩm đấu giá" }),
    images: z
      .array(z.object({ url: z.string() }))
      .min(1, { message: "Hãy nhập ít nhất 1 ảnh" }),
    startDate: z.date().refine(
      (date) => {
        const now = new Date();
        return date !== null && date >= now; // Start date should be from now to future
      },
      { message: "Vui lòng chọn không chọn ngày trong quá khứ" }
    ),
    endDate: z.date().refine(
      (date) => {
        const now = new Date();
        return date !== null && date >= now; // Start date should be from now to future
      },
      { message: "Vui lòng chọn không chọn ngày trong quá khứ" }
    ),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productName: "",
      product_id: "",
      quantity: 0,
      images: [],
      description: "",
      startDate: undefined,
      endDate: undefined,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const formattedDatetime = values.startDate
      ? new Date(values.startDate).toISOString().replace("Z", "")
      : null;
    const formattedDatetime1 = values.endDate
      ? new Date(values.endDate).toISOString().replace("Z", "")
      : null;

    console.log({
      ...values,
      startDate: formattedDatetime,
      endDate: formattedDatetime1,
    });
    // try {
    //   setLoading(true);
    //   if (initialData) {
    //     await axios.patch(`/api/products/${params.productId}`, data);
    //   } else {
    //     await axios.post(`/api/products`, data);
    //   }
    //   router.refresh();
    //   router.push(`/products`);
    //   toast.success(toastMessage);
    // } catch (error: any) {
    //   toast.error("Đã có lỗi.");
    // } finally {
    //   setLoading(false);
    // }
  };

  const isLoading = form.formState.isSubmitting;

  return (
    <main className="w-full h-full xl:px-[48px] px-6 pb-6 xl:pb-[48px] sm:pt-[156px] dark:bg-darkblack-700 pt-[100px]">
      <div className="gap-3 bg lg:gap-4 xl:gap-6">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 w-full"
          >
            <FormField
              control={form.control}
              name="images"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hình ảnh</FormLabel>
                  <FormControl>
                    <ImageUpload
                      value={field.value.map((image) => image.url)}
                      disabled={isLoading}
                      onChange={(url) =>
                        field.onChange([...field.value, { url }])
                      }
                      onRemove={(url) =>
                        field.onChange([
                          ...field.value.filter(
                            (current) => current.url !== url
                          ),
                        ])
                      }
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
                        jsDate={field.value}
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
                name="endDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="datetime">End time</FormLabel>
                    <FormControl>
                      <DateTimePicker
                        granularity="minute"
                        jsDate={field.value}
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
                name="productName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tên buổi đấu giá</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        placeholder="vd: Đấu giá phong lan"
                        {...field}
                        className="bg-zinc-200/50 dark:bg-zinc-700/50 focus-visible:ring-0 text-black dark:text-white focus-visible:ring-offset-0"
                        autoComplete="off"
                      />
                    </FormControl>
                    <FormMessage className="dark:text-yellow-300" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Giá khởi điểm</FormLabel>
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
                name="product_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mã sản phẩm</FormLabel>
                    <Select
                      disabled={isLoading}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            defaultValue={field.value}
                            placeholder="Lựa một mã phân loại"
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem
                            key={category.product_id}
                            value={category.product_id}
                          >
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage className="dark:text-yellow-300" />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mô tả</FormLabel>
                  <FormControl>
                    <Textarea
                      disabled={isLoading}
                      placeholder="vd: Mô tả buổi đấu giá"
                      {...field}
                      autoComplete="off"
                      className="bg-zinc-200/50 dark:bg-zinc-700/50 focus-visible:ring-0 text-black dark:text-white focus-visible:ring-offset-0"
                    />
                  </FormControl>
                  <FormMessage className="dark:text-yellow-300" />
                </FormItem>
              )}
            />
            <Button
              disabled={isLoading}
              variant="action"
              className="ml-auto"
              type="submit"
            >
              Create
            </Button>
          </form>
        </Form>
      </div>
    </main>
  );
};

export default CreateAuction;
