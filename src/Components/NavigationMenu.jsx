import { NavLink, useNavigate } from 'react-router-dom';
import { useAdminContext } from '../Hooks/useAdminContext';

function NavigationMenu() {

    const { admin } = useAdminContext();

    const navigate = useNavigate();


    const navlinks = [
        { to: "/", icon: "fa-solid fa-gauge", text: "Dashboard", adminOnly: true },
        { to: admin ? "/all-products" : "/", icon: "fa-solid fa-shirt", text: "Products" },
        { to: "/all-sales", icon: "fa-solid fa-money-bill-wave", text: "Sales" },
        { to: "/expenses", icon: "fa-solid fa-coins", text: "Expenses", adminOnly: true },
        { to: "/all-customers", icon: "fa-solid fa-users", text: "Customers", },
        { to: "/all-users", icon: "fa-solid fa-unlock", text: "Users", adminOnly: true },
        { to: "/promo-codes", icon: "fa-solid fa-percent", text: "Promo Codes", adminOnly: true },
    ];

    return (
        <div className="absolute top-0 left-0 z-50 h-full min-h-screen shadow-headerBox dark:shadow-darkHeaderBox bg-white dark:bg-bg-dark-secondary overflow-hidden border-r border-[rgba(51,51,51,0.2)] rounded-r-md group">
            <ul className="flex flex-col items-start">
                <i className="fa-solid fa-arrow-left bg-crimson text-white w-full text-center py-3" onClick={() => navigate(-1)}></i>
                <div className="w-full flex flex-col items-start text-base">
                    {navlinks.map((link, i) => (
                        link.adminOnly ?
                            admin === true ?
                                <NavLink key={i} to={link.to} className="w-full flex items-center gap-2 px-4 py-2 hover:text-white hover:bg-black">
                                    <i className={`${link.icon}`} />
                                    <span className="hidden group-hover:block pr-10">{link.text}</span>
                                </NavLink>
                                :
                                null
                            :
                            <NavLink key={i} to={link.to} className="w-full flex items-center gap-2 px-4 py-2 hover:text-white hover:bg-black">
                                <i className={`${link.icon}`} />
                                <span className="hidden group-hover:block pr-10">{link.text}</span>
                            </NavLink>
                    ))}
                </div>
            </ul>
        </div>
    )
}

export default NavigationMenu