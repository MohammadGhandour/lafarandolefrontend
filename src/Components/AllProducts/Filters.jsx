import React, { useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import FiltersModal from "./FiltersModal";

function Filters({ filters }) {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeFilterModal, setActiveFilterModal] = useState(null);

    const oldParams = useLocation().search;
    const [searchParams, setSearchParams] = useSearchParams();
    const searchParamsVar = new URLSearchParams(oldParams);

    const isFilterExists = (filterBy) => {
        const selectedFilters = JSON.parse(searchParams.get("filters"));
        let index = -1;
        if (searchParams && selectedFilters && selectedFilters.length > 0) {
            index = selectedFilters.findIndex(obj => obj.key === filterBy);
        }
        return index !== -1;
    }

    function clearFilter(e, filterBy) {
        e.stopPropagation();
        const selectedFilters = JSON.parse(searchParamsVar.get("filters"));
        const newArrayWithoutCurrentFilter = selectedFilters.filter(filter => filter.key !== filterBy);
        if (newArrayWithoutCurrentFilter.length < 1) {
            searchParamsVar.delete("filters");
        } else {
            searchParamsVar.set("filters", JSON.stringify(newArrayWithoutCurrentFilter));
        }
        setSearchParams(searchParamsVar);
    }

    return (
        <div className="flex items-center gap-4 w-full group">
            <div className="flex items-center gap-4">
                {filters.map((filter) => (
                    <button className={`flex items-center justify-center flex-nowrap gap-2 py-2 px-4 focus:outline-none w-max disabled:cursor-not-allowed rounded-xl transition-all bg-white dark:bg-bg-dark-hover`} key={filter.title} onClick={() => {
                        setActiveFilterModal(filter);
                        setIsModalOpen(true);
                    }}>
                        <span className="whitespace-nowrap">{filter.title}</span>
                        {isFilterExists(filter.filterBy) && <div className="i fa-solid fa-times text-xs w-4 min-w-[1rem] aspect-square flex items-center justify-center bg-[#eee] rounded-full dark:bg-bg-light text-text-light dark:text-bg-dark-hover" onClick={(e) => clearFilter(e, filter.filterBy)}></div>}
                    </button>
                ))}
            </div>
            <FiltersModal
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                activeFilterModal={activeFilterModal}
                setActiveFilterModal={setActiveFilterModal}
                filters={filters}
            />
        </div>
    );
}

export default Filters;
