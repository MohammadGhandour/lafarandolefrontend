import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react';
import ErrorMessage from '../Components/ErrorMessage';
import Loader from '../Components/Loader';
import { api } from '../Config/Config';
import { headers } from '../Config/Headers';
import { useAdminContext } from '../Hooks/useAdminContext';
import styles from "../styles";
import { useInfiniteQuery } from "react-query";
import { useSearchParams } from "react-router-dom";
import AllSalesThead from "../Components/AllSales/AllSalesThead";
import OneDayStats from "../Components/AllSales/OneDayStats";
import SearchInput from "../Components/AllProducts/SearchInput";


export const orderIdClass = "w-[100px] max-w-[100px] min-w-[100px] whitespace-nowrap truncate text-center";

function AllSales() {

    const { admin } = useAdminContext();

    // eslint-disable-next-line
    const [sortBy, setSortBy] = useState('default');

    const [searchParams] = useSearchParams();
    const query = searchParams.get("q");
    const [filter, setFilter] = useState("last_added");

    const limit = 50;

    async function fetchOrders(pageParam) {
        const data = await axios.get(`${api}/orders`, {
            headers: headers,
            params: {
                limit,
                page: pageParam,
                searchParams: query,
                filter: filter
            }
        });
        return data.data;
    }

    const { isLoading: isLoadingForTable, data, hasNextPage, fetchNextPage, isFetchingNextPage, isError } = useInfiniteQuery(
        ["products", query, filter],
        ({ pageParam = 1 }) => fetchOrders(pageParam),
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

    const groupOrdersByDay = (orders) => {
        const groupedOrders = [];

        orders.forEach((order) => {
            const orderDate = new Date(order.createdAt).toDateString();
            const lastGroup = groupedOrders[groupedOrders.length - 1];

            if (lastGroup && lastGroup.date === orderDate) {
                lastGroup.orders.push(order);
            } else {
                groupedOrders.push({
                    date: orderDate,
                    orders: [order],
                });
            }
        });

        return groupedOrders;
    };

    const groupedData = useMemo(() => {
        if (data) {
            const allOrders = data.pages.flatMap((page) => page.rows);
            return groupOrdersByDay(allOrders);
        }
        return [];
    }, [data]);



    if (isError) {
        return (
            <div className='full-page'>
                <ErrorMessage classes='general-error'>An error happened</ErrorMessage>
            </div>
        )
    } else {
        return (
            <div className="w-full">

                <SearchInput placeholder="Search by id, name or phone number" />

                <div className="flex justify-end my-4">
                    <select
                        name="sortby"
                        id="sortby"
                        className={`${styles.inputClasses} max-w-[180px]`}
                        onChange={(e) => setFilter(e.target.value)}>
                        <option value="last_added">Last added</option>
                        <option value="Instagram Delivery">Instagram Delivery</option>
                        <option value="Ghaziyeh Store">Ghaziyeh Store</option>
                    </select>
                </div>

                <div className="w-full overflow-x-auto">
                    <div className="w-full flex-col flex mt-4 min-w-[1100px]">
                        <AllSalesThead admin={admin} orderIdClass={orderIdClass} />
                        {isLoadingForTable ? <Loader /> : groupedData && groupedData.length > 0 ?
                            <div className={`w-full flex flex-col ${query ? "gap-1" : "gap-12"}`}>
                                {groupedData.map(day => (
                                    <OneDayStats key={day.date} day={day} admin={admin} orderIdClass={orderIdClass} query={query} />
                                ))}
                            </div>
                            :
                            ""
                        }
                    </div>
                </div>
                {isFetchingNextPage && <Loader />}
            </div>
        )
    }
}

export default AllSales;
