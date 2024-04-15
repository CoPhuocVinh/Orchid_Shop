import { getCategories } from "@/lib/actions/category";
import { ProductForm } from "./_components/product-form";
import { getProductByID } from "@/lib/actions";
import { ICategoryForm } from "@/types/dashboard";

const ProductPage = async ({ params }: { params: { productId: string } }) => {
  // const product = await getProductByID(params.productId);
  // const categories = await getCategories();

  // optimize
  const [product, categories] = await Promise.all([
    getProductByID(params.productId),
    getCategories(),
  ]);

  const fotmatCategories: ICategoryForm[] = categories.data.map((item) => ({
    category_id: item.id,
    type: item.type,
  }));

  return (
    <div className="w-full h-full xl:px-[48px] px-6 pb-6 xl:pb-[48px] sm:pt-[20px] dark:bg-darkblack-700 pt-[10px]">
      <div className="">
        <ProductForm
          initialData={product?.data}
          categories={fotmatCategories}
        />
      </div>
    </div>
  );
};

export default ProductPage;
