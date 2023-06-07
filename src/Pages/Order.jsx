import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import Loader from '../Components/Loader';
import { api } from '../Config/Config';
import moment from 'moment';
import OrderFooter from '../Components/Order/OrderFooter';
import { headers } from '../Config/Headers';
import ErrorMessage from "../Components/ErrorMessage";
import './PagesStyles/Order.css';
import { useAdminContext } from '../Hooks/useAdminContext';
import { formatCurrency } from "../functions/formatCurrency";
import { logo } from "../assets";
import { useQuery } from "react-query";

function Order() {

    const { admin } = useAdminContext();

    const params = useParams();

    async function getOrder() {
        const response = await axios.get(`${api}/orders/${params.id}`, { headers: headers });
        return response.data;
    };

    const { data: order, error, isFetching } = useQuery(
        ['order', params.id],
        getOrder,
        {
            refetchOnWindowFocus: false,
            // onSuccess
        }
    );

    if (isFetching) {
        return (
            <div className='full-page'>
                <Loader />
            </div>
        )
    } else if (error) {
        return (
            <div className='w-full'>
                <h2>
                    <ErrorMessage classes='product-error'>{error}</ErrorMessage>
                </h2>
            </div>
        )
    } else {
        return (
            <div className='full-page'>
                <div className='flex justify-between mb-4'>
                    <h3 className="font-bold text-2xl"># {order.id}</h3>
                    <h4 className='text-gray-400'>{moment(order.createdAt).format('lll')}</h4>
                </div>
                <div className="w-full overflow-x-auto">
                    <div className='w-full flex-col flex mt-4 min-w-[800px]'>
                        <div className="w-full flex items-center font-bold mb-2">
                            <div className="w-14">Photo</div>
                            <div className="flex-[2] mx-2 w-[300px] whitespace-nowrap truncate">Name</div>
                            <div className="flex-1 text-center">Price</div>
                            <div className="flex-1 text-center">Quantity</div>
                            <div className="flex-1 text-center">Total</div>
                            <div className="flex-1 text-center">Size</div>
                        </div>
                        <div className="w-full flex flex-col items-center gap-1">
                            {order.cart.map(product => (
                                <Link to={`/product/${product.id}`} key={product.id} className="w-full flex items-center hover:bg-[#eee] rounded-md  hover:text-black transition-all bg-custom-gray overflow-hidden">
                                    <img src={product.photo ? product.photo : logo} alt={product.id} className='w-14 aspect-square object-cover' />
                                    <div className="flex-[2] mx-2 w-[300px] whitespace-nowrap truncate">{product.name}</div>
                                    <div className="flex-1 text-center">
                                        {product.priceAfterDiscount !== product.price &&
                                            <span>{formatCurrency(product.price)}<br /></span>
                                        }
                                        <span>{formatCurrency(product.priceAfterDiscount)}</span>
                                    </div>
                                    <div className="flex-1 text-center">{product.quantity}</div>
                                    <div className="flex-1 text-center">{formatCurrency(product.priceAfterDiscount * product.quantity)}</div>
                                    <div className="flex-1 text-center">{product.size}</div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
                <OrderFooter order={order} admin={admin} />
            </div>
        )
    }
}

export default Order;
