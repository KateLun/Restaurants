import { useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import HomePage from "components/HomePage";
import Button from "components/Button";

function CartPage( ) {

    const { cart } = useParams()
    console.log(cart)

    const [count, setCount] = useState(1)

    function plus() { 
        if (count < 10) {
            setCount(count + 1) 
        } else {
            return
        }
    }

    function minus() { 
        if (count > 0) {
            setCount(count - 1) 
        } else {
            return
        }
    }
    
    return (
        <div className="max-w-screen-lg m-auto my-10">

            {cart.length === 0 && (
                <div className="flex flex-col gap-8 text-xl text-center">
                    <p>В вашей корзине пока ничего нет!</p>
                    <Link to="/" element={<HomePage />} >
                        <p className="text-stone-800 underline-offset-1 font-bold hover:text-cyan-500 duration-200 cursor-pointer">Выбрать ресторан</p>
                    </Link>
                </div>
            )}

            {cart.length > 0 && cart.map((item) => {
                return (
                    <div>
                        Тут будет информация о заказе
                        <div className="flex flex-row justify-between mt-6">
                                <div className="flex flex-row" >
                                    <button onClick={minus} className="mx-2 py-1 px-2 font-bold">-</button>
                                    <p className="py-1 px-2">{count} шт.</p>
                                    <button onClick={plus} className="mx-2 py-1 px-2 font-bold">+</button>
                                </div>
                                <p className="py-1 px-6 border rounded-md">{count*item.price}</p>
                                <Button title="Удалить" />
                            </div>
                    </div>
                )
            })}   

        </div>
    )
}

export default CartPage