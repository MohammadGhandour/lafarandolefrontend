const styles = {
    boxWidth: "xl:max-w-[1280px] w-full mx-auto",
    blackButton: "py-2 px-4 border border-white rounded-md bg-black text-white font-bold whitespace-nowrap rounded-xl",
    grayButton: "py-2 px-4 border border-white rounded-md bg-gray-500 text-white font-bold whitespace-nowrap rounded-xl",
    redButton: "py-2 px-4 rounded-md bg-crimson text-white font-bold whitespace-nowrap rounded-xl",
    inputClasses: "bg-white w-full py-4 px-4 rounded-xl border-black",
    smallerInput: "bg-white w-full py-2 px-4 rounded-xl border-black",

    section: "mt-8 mx-0 sm:mx-4 py-6 px-4 sm:px-8 bg-white dark:bg-bg-dark-secondary rounded-2xl xl:rounded-3xl shadow-headerBox dark:shadow-darkHeaderBox",
    boxBgBsRounded: "bg-white dark:bg-bg-dark-secondary rounded-2xl xl:rounded-3xl shadow-headerBox dark:shadow-darkHeaderBox",
    heading: "font-extrabold font-graphik text-xl"
};

export const layout = {
    section: `flex md:flex-row flex-col ${styles.paddingY}`,
    sectionReverse: `flex md:flex-row flex-col-reverse ${styles.paddingY}`,

    sectionImgReverse: `flex-1 flex ${styles.flexCenter} md:mr-10 mr-0 md:mt-0 mt-10 relative`,
    sectionImg: `flex-1 flex ${styles.flexCenter} md:ml-10 ml-0 md:mt-0 mt-10 relative`,

    sectionInfo: `flex-1 ${styles.flexStart} flex-col`,
};

export default styles;