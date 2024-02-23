import { IProduct } from "@/types/dashboard";
import { SearchParams } from "@/types/table";
import axios from "axios";

export async function productFakeData(
  searchParams: SearchParams
): Promise<{ data: IProduct[]; pageCount: number }> {
  try {
    const { page, per_page, productName, sort } = searchParams;

    const res = await axios.get("http://localhost:3001/products");

    const data = await res.data;
    const fakeData: IProduct[] = data;
    const pageAsNumber = Number(page);
    const fallbackPage =
      isNaN(pageAsNumber) || pageAsNumber < 1 ? 1 : pageAsNumber;
    const perPageAsNumber = Number(per_page);
    const limit = isNaN(perPageAsNumber) ? 10 : perPageAsNumber;
    const offset = fallbackPage > 0 ? (fallbackPage - 1) * limit : 0;
    // Extracting sorting parameters
    const [sortColumn, sortOrder] = (sort?.toString().split(".") as [
      keyof IProduct | undefined,
      "asc" | "desc" | undefined
    ]) ?? ["productName", "asc"];
    let filteredData = fakeData;

    if (productName) {
      filteredData = filteredData.filter((filter) =>
        filter.productName.includes(productName.toString())
      );
    }

    if (sortColumn) {
      filteredData.sort((a, b) => {
        const aValue = a[sortColumn];
        const bValue = b[sortColumn];

        if (typeof aValue === "undefined" || typeof bValue === "undefined") {
          // Handle case where either aValue or bValue is undefined
          // For example, you might want to place undefined values at the end or beginning
          return 0; // Adjust this logic based on your requirements
        }

        if (aValue < bValue) {
          return sortOrder === "asc" ? -1 : 1;
        } else if (aValue > bValue) {
          return sortOrder === "asc" ? 1 : -1;
        } else {
          return 0;
        }
      });
    }

    const pageCount = Math.ceil(filteredData.length / limit);

    const paginatedData = filteredData.slice(offset, offset + limit);

    return { data: paginatedData, pageCount };
  } catch (error) {
    return { data: [], pageCount: 0 };
  }
}
