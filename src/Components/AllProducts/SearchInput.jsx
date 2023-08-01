import { useSearchParams } from "react-router-dom";
import styles from "../../styles";
import { useEffect, useMemo, useState } from "react";

function SearchInput({ placeholder }) {

    function useDebounceValue(value, time = 500) {
        const [debounceValue, setDebounceValue] = useState(value);

        useEffect(() => {
            const timeout = setTimeout(() => {
                setDebounceValue(value);
            }, time);

            return () => {
                clearTimeout(timeout);
            }
        }, [value, time]);

        return debounceValue;
    };

    const [searchParams, setSearchParams] = useSearchParams();
    const searchParamsVar = useMemo(() => {
        return new URLSearchParams(window.location.search)
    }, []);
    const [searchQuery, setSearchQuery] = useState(searchParamsVar.get("q") || "");
    const debounceQuery = useDebounceValue(searchQuery);

    useMemo(() => {
        searchParamsVar.set("q", debounceQuery);
        setSearchParams(searchParamsVar);
        if (debounceQuery === "") {
            searchParamsVar.delete("q");
            setSearchParams(searchParamsVar);
        }
    }, [debounceQuery, setSearchParams, searchParamsVar]);

    return (
        <div className="flex-items-center justify-between w-full xl:w-[40%] min-w-[250px]">
            <div className="relative group w-full">
                <input
                    type="text"
                    name="searchValue"
                    id="searchValue"
                    autoFocus
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={placeholder}
                    className={`${styles.inputClasses} w-full pr-10`}
                />
                {searchParams.get("q") !== null ?
                    <label htmlFor="searchValue" className="cursor-pointer absolute top-0 right-0 text-black/50 aspect-square flex items-center justify-center h-full" onClick={() => setSearchQuery("")}>
                        <i className="fa-solid fa-times text-xl"></i>
                    </label>
                    :
                    <label htmlFor="searchValue" className="cursor-pointer absolute top-0 right-0 text-black/50 aspect-square flex items-center justify-center group-focus-within:hidden h-full">
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </label>
                }
            </div>
        </div>
    );
}

export default SearchInput;
