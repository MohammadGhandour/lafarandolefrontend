import axios from 'axios';
import { NavLink, useSearchParams } from 'react-router-dom';
import SearchInput from '../Components/AllProducts/SearchInput';
import { api } from '../Config/Config';
import { headers } from '../Config/Headers';
import { useAdminContext } from '../Hooks/useAdminContext';
import Filters from "../Components/AllProducts/Filters";
import { productCategories } from "../Arrays/Products/productsCategories";
import { brands } from "../Arrays/Products/productsBrands";
import styles from "../styles";
import { useInfiniteQuery } from "react-query";
import ProductsTable from "../Components/AllProducts/ProductsTable";
import { sizes } from "../Arrays/Sizes/sizes";

function Products() {

    const { admin } = useAdminContext();

    const realFilters = [
        {
            type: "checkbox",
            filterBy: "category",
            title: "Category",
            options: productCategories.map(category => ({ key: category, value: category }))
        },
        {
            type: "checkbox",
            filterBy: "gender",
            title: "Gender",
            options: [
                { key: "Boy", value: "Boy" },
                { key: "Girl", value: "Girl" },
                { key: "Women", value: "Women" },
                { key: "Unisex", value: "Unisex" },
            ]
        },
        {
            type: "checkbox",
            filterBy: "size",
            title: "Size",
            options: sizes

        },
        {
            type: "checkbox",
            filterBy: "brand",
            title: "Brand",
            options: brands.sort((a, b) => a.localeCompare(b)).map(brand => ({ key: brand, value: brand }))
        },
    ];

    const [searchParams] = useSearchParams();
    const query = searchParams.get("q");
    const filtersQ = searchParams.get("filters") || "";

    const limit = 50;
    async function fetchProducts(pageParam) {
        const data = await axios.get(`${api}/products`, {
            headers: headers,
            params: {
                limit,
                page: pageParam,
                searchParams: query,
                filters: filtersQ
            }
        });
        return data.data;
    };

    const { isLoading: isLoadingForTable, data: tableData, hasNextPage, fetchNextPage, isFetchingNextPage, isError } = useInfiniteQuery(
        ["products", query, filtersQ],
        ({ pageParam = 1 }) => fetchProducts(pageParam),
        {
            refetchOnWindowFocus: false,
            getNextPageParam: (lastPage, allPages) => {
                const remainingItems = lastPage.count - allPages.length * limit;
                if (remainingItems <= 0) {
                    return undefined;
                }
                const nextPage = allPages.length + 1;
                return nextPage;
            }
        }
    );

    if (isError) {
        return (
            <div className='full-page'>
                {/* <ErrorMessage classes='general-error'>{error}</ErrorMessage> */}
            </div>
        )
    } else {
        return (
            <div className="w-full">
                <section className="w-full flex lg:justify-between flex-col items-start gap-4 lg:flex-row lg:items-center">
                    <SearchInput placeholder="Search by barcode or name" />
                    <div className="flex items-center gap-4 flex-wrap lg:flex-nowrap">
                        <Filters filters={realFilters} />
                        {admin && <NavLink to='/add-product' query={{ prevPath: window.location.pathname }} className={`${styles.blackButton}`}>Add product</NavLink>}
                    </div>
                </section>

                <div className="w-full overflow-x-auto">
                    <div className="w-full flex-col flex mt-4 min-w-[800px]">
                        <ProductsTable
                            isLoading={isLoadingForTable}
                            data={tableData}
                            hasNextPage={hasNextPage}
                            isFetchingNextPage={isFetchingNextPage}
                            fetchNextPage={fetchNextPage}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default Products;
