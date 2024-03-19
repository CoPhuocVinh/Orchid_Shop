import * as z from "zod";

export const productSchema = z.object({
  productName: z
    .string()
    .min(3, { message: "Hãy nhập tên sản phẩm có ít nhất 3 chữ cái" })
    .max(50, "Tên quá dài"),
  quantity: z.coerce
    .number()
    .min(1, { message: "Hãy nhập số lượng tối thiếu 1" })
    .max(1000, "Tối đa chỉ có 1000 sản phẩm"),
  description: z
    .string()
    .min(80, { message: "Hãy nhập mô tả thật chi tiết cho khách cỡ 80 từ" })
    .max(5000, "Tối đa 5000 thôi nhé"),
  category_id: z.coerce.number().min(1, { message: "Hãy chọn thể loại" }),
  productImages: z
    .object({ image_url: z.string(), image_code: z.string() })
    .array()
    .min(1, { message: "Hãy nhập ít nhất 1 ảnh" }),
});
