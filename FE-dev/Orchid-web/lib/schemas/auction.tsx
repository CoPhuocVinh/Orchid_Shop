import { z } from "zod";

const MIN_PRODUCT_QUANTITY = 1;
const MIN_DEPOSIT_PRICE = 50000;
const MIN_START_PRICE = 10000;
const MIN_IMAGE_URL_LENGTH = 1;

export const auctionSchema = z
  .object({
    startDate: z.date().refine((date) => date !== null && date >= new Date(), {
      message: "Vui lòng không chọn ngày trong quá khứ",
    }),
    endDate: z.date(),
    remindAt: z.date(),
    quantity: z.coerce.number().min(MIN_PRODUCT_QUANTITY, {
      message: `Hãy nhập số lượng sản phẩm ít nhất là ${MIN_PRODUCT_QUANTITY}`,
    }),
    depositPrice: z.coerce.number().min(MIN_DEPOSIT_PRICE, {
      message: `Hãy nhập bước nhảy của giá ít nhất là ${MIN_DEPOSIT_PRICE}`,
    }),
    startPrice: z.coerce.number().min(MIN_START_PRICE, {
      message: `Hãy nhập giá khởi điểm của sản phẩm đấu giá lớn hơn ${MIN_START_PRICE}`,
    }),
    productID: z.coerce.number().min(1, {
      message: "Hãy chọn sản phẩm đấu giá",
    }),
    image_url: z.string().min(MIN_IMAGE_URL_LENGTH, {
      message: "Hãy thêm ít nhất 1 ảnh",
    }),
    title: z
    .string()
    .min(3, { message: "Hãy nhập title cho buổi đấu giá" })
    .max(60, "Tên quá dài"),
    endDateInValid: z.any().nullish(),
    remindAtDateInValid: z.any().nullish(),
  })
  .refine((data) => data.startDate <= data.endDate, {
    path: ["endDateInValid"],
    params: { empty: "empty" },
    message: "Hãy nhập ngày kết thúc lớn hơn hoặc bằng ngày bắt đầu",
  })
  .refine((data) => data.startDate > data.remindAt && data.remindAt > new Date(), {
    path: ["remindAtDateInValid"],
    params: { empty: "empty" },
    message: "Hãy nhập lời nhắc trước khi buổi đấu giá bắt đầu",
  });
