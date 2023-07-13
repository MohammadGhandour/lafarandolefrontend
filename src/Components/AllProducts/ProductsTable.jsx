import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { logo } from "../../assets";
import { formatCurrency } from "../../functions/formatCurrency";
import Loader from "../Loader";

function ProductsTable({ isLoading, data, hasNextPage, fetchNextPage, isFetchingNextPage }) {
    const borderColor = "border-black/0";

    useEffect(() => {
        let fetching = false;
        const onScroll = async (event) => {
            const { scrollHeight, scrollTop, clientHeight } = event.target.scrollingElement;
            if (!fetching && scrollHeight - scrollTop <= clientHeight * 2 && data?.pages.length > 0) {
                fetching = true;
                if (data) {
                    if (hasNextPage) await fetchNextPage();
                }
                fetching = false;
            }
        };

        window.addEventListener("scroll", onScroll);
        window.addEventListener("touchmove", onScroll);

        return () => {
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("touchmove", onScroll);
        };
    }, [data, fetchNextPage, hasNextPage]);

    const [isFixed, setIsFixed] = useState(false);

    const theadTopPosition = 250;

    useEffect(() => {
        function handleScroll() {
            if (window.scrollY > theadTopPosition) {
                setIsFixed(true);
            } else {
                setIsFixed(false);
            }
        }

        window.addEventListener("scroll", handleScroll);
        window.addEventListener("touchmove", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("touchmove", handleScroll);
        };
    }, [isFixed]);

    return (
        <>
            <div className={`w-full flex mb-4 ${isFixed ? "lg:fixed top-0 right-0 bg-white py-4" : ""}`}>
                {isFixed && <div className="w-[5.5rem]"></div>}
                <div className="w-14">Photo</div>
                <div className="w-[300px] mx-4">Name</div>
                <div className="flex-1 text-center">Brand</div>
                <div className="flex-1 text-center">Category</div>
                <div className="flex-1 text-center">Size</div>
                <div className="flex-1 text-center">Quantity</div>
                <div className="flex-1 text-center">Price</div>
            </div>
            {isLoading ? <Loader /> : (data?.pages?.length > 0 && data?.pages[0]?.rows?.length > 0) ?
                <div className="w-full flex flex-col gap-1">
                    {data.pages.map(page =>
                        page.rows.map((product, idx) => (
                            <Link key={product.id} to={`/product/${product.id}`} className={`w-full flex items-center hover:bg-[#eee] rounded-md  hover:text-black transition-all overflow-hidden ${product.inStock === 0 ? "bg-crimson text-white" : product.discount ? "bg-yellow-500" : "bg-custom-gray"}`}>
                                <img src={product.photo ? product.photo : logo} alt={product.name} className="w-14 aspect-square object-cover" />
                                <div className="w-[300px] whitespace-nowrap truncate mx-4">{product.name}</div>
                                <div className={`flex-1 text-center border-x whitespace-nowrap truncate px-1 ${borderColor}`}>{product.brand.toUpperCase()}</div>
                                <div className={`flex-1 text-center`}>{product.category}</div>
                                <div className={`flex-1 text-center border-x ${borderColor}`}>{product.size}</div>
                                <div className={`flex-1 text-center`}>{product.quantity}</div>
                                <div className={`flex-1 text-center border-l ${borderColor}`}>{formatCurrency(product.priceAfterDiscount)}</div>
                            </Link>
                        )))}
                </div>
                :
                ""
            }
        </>
    );
}

export default ProductsTable;
