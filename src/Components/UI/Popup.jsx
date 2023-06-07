import React, { useEffect, useRef } from "react";

function Popup({ modalOpen, setModalOpen, title, sizes, children, scrollable }) {


    function outsideClickCloseNav(e) {
        if (backdropRef.current === e.target) {
            setModalOpen(false);
        }
    };

    const backdropRef = useRef(null);

    useEffect(() => {
        if (modalOpen) {
            document.body.classList.add('modal-open');
        } else {
            document.body.classList.remove('modal-open');
        }
        return () => {
            document.body.classList.remove('modal-open');
        };
    }, [modalOpen]);

    const defaultSizes = "w-[90%] lg:w-[60%]";

    return (
        <article className={`fixed top-0 left-0 w-full h-screen z-[200] bg-black/40 bg-opacity-20 backdrop-blur-lg drop-shadow-lg cursor-auto ${scrollable ? "items-start" : "items-center"} justify-center ${modalOpen ? "flex" : "hidden"} overflow-y-scroll py-12`} ref={backdropRef} onClick={outsideClickCloseNav}>
            <div className={`${sizes ? sizes : defaultSizes} bg-white dark:bg-bg-dark-secondary rounded-3xl flex flex-col justify-between h-max`}>
                <div className="w-full relative">
                    <div className="flex items-center justify-between w-full px-8 py-6 pb-4 border-gray-200 border-b dark:border-opacity-10">
                        <h3 className="text-xl font-bold text-center w-full">{title}</h3>
                        <i className="fa-solid fa-times text-3xl sm:text-3xl cursor-pointer" onClick={() => setModalOpen(false)}></i>
                    </div>
                    {children}
                </div>
            </div>
        </article>
    );
}

export default Popup;
