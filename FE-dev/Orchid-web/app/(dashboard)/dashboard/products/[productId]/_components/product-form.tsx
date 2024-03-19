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

import { ICategoryForm, IProduct } from "@/types/dashboard";
import ImageUpload from "@/components/image-cloudinary-upload/image-upload";
import { Textarea } from "@/components/ui/textarea";

import { toast } from "sonner";
import { checkProductNameExits, createProduct, deleteProductByID, updateProductDetail} from "@/lib/actions";
import { AlertModal } from "@/components/modal/alert-modal";
import { Heading } from "@/components/dashboard-heading";
import { productSchema } from "@/lib/schemas";


export type ProductFormValues = z.infer<typeof productSchema>;

interface ProductFormProps {
  initialData: IProduct | null;
  categories: ICategoryForm[];
}

export const ProductForm: React.FC<ProductFormProps> = ({
  initialData,
  categories,
}) => {
  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? "Chỉnh sửa sản phẩm" : "Tạo sản phẩm";
  const description = initialData
    ? "chỉnh sửa một sản phẩm."
    : "Thêm một sản phẩm mới";
  const toastMessage = initialData
    ? "sản phẩm cập nhật thành công."
    : "sản phẩm được tạo thành công .";
  const action = initialData ? "Lưu thay đổi" : "Tạo";

  const defaultValues = initialData
    ? initialData
    : {
        productName: "",
        category_id: 0,
        quantity: 0,
        productImages: [],
        description: "",
      };

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues,
  });

  const onSubmit = async (data: ProductFormValues) => {
  console.log(data)

    // check productName
    const isProductNameExits = await checkProductNameExits(data.productName);
    if (isProductNameExits) {
      toast.error("Tên sản phẩm đã tồn tại ");
      return;
    }

    try {
      setLoading(true);
      if (initialData) {
        await updateProductDetail(params.productId as string, data)
      } else {
        await createProduct(data)
        form.reset()
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


        await deleteProductByID(params.productId as string)

        router.push(`/dashboard/products`);
        toast.success("Product deleted.");
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
            name="productImages"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hình ảnh</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value.map((image) => image.image_url)}
                    disabled={isLoading}
                    onChange={(image_url, image_code) =>
                      field.onChange([...field.value, { image_url, image_code, }])
                    }
                    onRemove={(image_url) =>
                      field.onChange([
                        ...field.value.filter(
                          (current) => current.image_url !== image_url
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
              name="productName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tên sản phẩm</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="vd: hoa lan"
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
                  <FormLabel>Số lượng</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={isLoading}
                      placeholder="vd: 100"
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
              name="category_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mã phân loại</FormLabel>
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
                          placeholder="Lựa một mã phân loại"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem
                          key={category.category_id}
                          value={category.category_id.toString()}
                        >
                          <span>{category.type}</span>
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
                    placeholder="vd: Mô tả sản phẩm"
                    {...field}
                    autoComplete="off"
                    className="bg-zinc-200/50 dark:bg-zinc-700/50 focus-visible:ring-0 text-black dark:text-white focus-visible:ring-offset-0"
                  />
                </FormControl>
                <FormMessage className="dark:text-yellow-300" />
              </FormItem>
            )}
          />
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
            onClick={() => router.push("/dashboard/products")}
          >
            Quay lại
          </Button>
          </div>
        </form>
      </Form>
    </>
  );
};
