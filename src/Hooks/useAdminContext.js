import { useContext } from "react";
import { AdminContext } from "../Context/AdminContext";

export const useAdminContext = () => {
    const context = useContext(AdminContext);

    if (!context) {
        throw Error('useAdminContext must be used inside a AdminContextProvider');
    }

    return context;
}
