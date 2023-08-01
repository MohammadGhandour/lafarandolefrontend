import React, { useEffect, useRef, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import styles from "../../styles";

function CheckBoxInputFilter({ filter, option, selectedFilters, setSelectedFilters }) {

    function handleChange(event) {
        const value = event.target.value;

        const objToStudy = { key: filter.filterBy, value };
        const index = selectedFilters.findIndex(obj => obj.key === objToStudy.key && obj.value === objToStudy.value);
        const includesObj = index !== -1;

        if (includesObj) {
            setSelectedFilters(selectedFilters.filter((filter) => filter.value !== value));
        } else {
            setSelectedFilters([...selectedFilters, { key: filter.filterBy, value }]);
        }
    };

    const isItChecked = () => {
        const objToStudy = { key: filter.filterBy, value: option.value };
        const index = selectedFilters.findIndex(obj => obj.key === objToStudy.key && obj.value === objToStudy.value);
        return index !== -1;
    }

    return (
        <div className="flex gap-2 w-full px-2 py-2 z-20">
            <input
                type="checkbox"
                name={filter.filterBy}
                id={option.value}
                className="w-4 h-4"
                value={option.value}
                checked={isItChecked()}
                onChange={(e) => handleChange(e)} />
            <label htmlFor={option.value} className="flex-1 cursor-pointer capitalize">{option.key}</label>
        </div>
    )
};

function FiltersModal({ isModalOpen, setIsModalOpen, activeFilterModal, setActiveFilterModal, filters }) {
    const backdropRef = useRef(null);
    const [selectedFilters, setSelectedFilters] = useState([]);

    useEffect(() => {
        if (isModalOpen) {
            document.body.classList.add('modal-open');
        } else {
            document.body.classList.remove('modal-open');
        }
        return () => {
            document.body.classList.remove('modal-open');
        };
    }, [isModalOpen]);

    function outsideClickCloseNav(e) {
        if (backdropRef.current === e.target) {
            fetchFilteredData();
        }
    };

    useEffect(() => {
        if (JSON.parse(searchParamsVar.get("filters")) === null) {
            setSelectedFilters([]);
        } else {
            setSelectedFilters(JSON.parse(searchParamsVar.get("filters")))
        }
        // eslint-disable-next-line
    }, [])

    const oldParams = useLocation().search;
    // eslint-disable-next-line
    const [searchParams, setSearchParams] = useSearchParams();
    const searchParamsVar = new URLSearchParams(oldParams);

    const isActive = (filter) => { return activeFilterModal === filter };
    const activeFilterRef = useRef(null);
    useEffect(() => {
        if (activeFilterRef.current !== null) {
            activeFilterRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [activeFilterModal]);

    function fetchFilteredData() {
        if (selectedFilters.length > 0) {
            searchParamsVar.set("filters", JSON.stringify(selectedFilters));
            setSearchParams(searchParamsVar);
        } else {
            searchParamsVar.delete("filters");
            setSearchParams(searchParamsVar);
        }
        setIsModalOpen(false);
    }

    if (isModalOpen) {
        return (
            <article className={`scrollable-modal`} ref={backdropRef} onClick={outsideClickCloseNav}>
                <div className="max-w-lg w-[80%] mx-auto my-auto bg-white rounded-3xl flex flex-col justify-between h-max">
                    <div className="overflow-hidden w-full">
                        <div className="flex items-center justify-between w-full px-8 py-6 pb-4 border-b border-black">
                            <h3 className="text-xl font-bold text-center w-full">Filters</h3>
                            <i className="fa-solid fa-times text-3xl sm:text-3xl cursor-pointer" onClick={() => fetchFilteredData()}></i>
                        </div>
                        <div className="flex flex-col px-8 pt-4 w-full" style={{ maxHeight: "calc(100% - 4rem)" }}>
                            {filters.map(filter => (
                                <div className="flex flex-col w-full" key={filter.filterBy}>
                                    <div className="flex flex-col w-full border-b border-black py-2.5 my-0.5 px-2" ref={isActive(filter) ? activeFilterRef : null}>
                                        <button className="w-full flex justify-between items-center" onClick={() => setActiveFilterModal(prev => prev === filter ? null : filter)}>
                                            <h2 className="text-lg font-bold">{filter.title}</h2>
                                            <div className={`fa-solid ${isActive(filter) ? "fa-chevron-up" : "fa-chevron-down"}`}></div>
                                        </button>
                                    </div>
                                    {filter.type === "checkbox" &&
                                        <div className={`${isActive(filter) ? "flex flex-col w-full" : "hidden"} py-6 px-4`}>
                                            {filter.options.map((option) => (
                                                <CheckBoxInputFilter
                                                    key={option.key}
                                                    filter={filter}
                                                    option={option}
                                                    selectedFilters={selectedFilters}
                                                    setSelectedFilters={setSelectedFilters}
                                                />
                                            ))}
                                        </div>
                                    }
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="py-4 opacity-0"></div>
                    <div className="flex justify-between items-end w-full sm:flex-row sm:items-center px-8 gap-4 pb-6">
                        {selectedFilters.length > 0 &&
                            <>
                                <button className={`${styles.secondaryButton} hidden xsm:flex items-center gap-2`} onClick={() => {
                                    setSelectedFilters([]);
                                    searchParamsVar.delete("filters");
                                    setSearchParams(searchParamsVar);
                                    setIsModalOpen(false);
                                }}>
                                    <i className="i fa-solid fa-times bg-light-gray hover:bg-darker-gray dark:bg-bg-dark-hover rounded-full w-6 aspect-square text-sm flex items-center justify-center"></i>
                                    Remove all filters
                                </button>
                                <button className={`${styles.secondaryButton} flex xsm:hidden items-center gap-2`} onClick={() => {
                                    setSelectedFilters([]);
                                    searchParamsVar.delete("filters");
                                    setSearchParams(searchParamsVar);
                                    setIsModalOpen(false);
                                }}>
                                    <i className="i fa-solid fa-times bg-light-gray hover:bg-darker-gray dark:bg-bg-dark-hover rounded-full w-6 aspect-square text-sm flex items-center justify-center"></i>
                                    Delete
                                </button>
                            </>
                        }
                        <button className={`${styles.primaryButton} ml-auto`} onClick={fetchFilteredData}>Filter</button>
                    </div>
                </div>
            </article>
        );
    }
}

export default FiltersModal;
