import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import HomePage from "components/HomePage";
import Button from "components/Button";
//import Modal from "components/Modal";

function CartPage() {

    const [cart, setCart] = useState([])

    useEffect(() => {
        setCart(JSON.parse(localStorage.getItem("cart")))

    }, [])

    const [count, setCount] = useState(1) 

    const plus = (id) => { 
        if (count < 10) {
            setCount(count + 1) 
        } else {
            return
        }
    }

    const minus = (id) => { 
        if (count > 0) {
            setCount(count - 1) 
        } else {
            return
        }
    }


    const deleteItem = (id) => {
        setCart(cart.filter(item => item.id !== id))
        localStorage.setItem("cart", JSON.stringify(cart)) // НЕ КОРРЕКТНО РАБОТАЕТ LS, ПРИ УДАЛЕНИИ ТОВАРА И ОБНОВЛЕНИИ СТРАНИЦЫ -
                                                              //ПОСЛЕДНИЙ УДАЛЕННЫЙ ТОВАР ОСТАЕТСЯ В КОРЗИНЕ
    }

    const [isModal, setModal] = useState(false)
    const onClose = () => setModal(false)

    return (
        <div className="max-w-screen-lg m-auto my-10">

            {cart.length === 0 && (
                <div className="flex flex-col gap-8 text-xl text-center m-18 items-center">
                    <img className="w-1/3 h-1/3" src="https://pngicon.ru/file/uploads/korzina-1.png" alt="cart"/>
                    <p>В вашей корзине пока ничего нет!</p>
                    <button className="px-4 inline py-2 text-xl font-medium leading-5 shadow text-white transition-colors duration-150 border border-transparent rounded-lg focus:outline-none focus:shadow-outline-blue bg-fuchsia-400 active:bg-fuchsia-500 hover:bg-red-500">
                        <Link to="/" element={<HomePage />} >
                            <p className="">Выбрать ресторан</p>
                        </Link>
                    </button>
                </div>
            )}

            {cart.length > 0 && ( 
                <div>
                    <p className="text-center mt-8 md:mt-24 mb-12 md:mb-16  text-xl md:text-5xl font-bold text-slate-600 underline decoration-6 underline-offset-8 decoration-cyan-300">Проверьте Ваш заказ</p>
            
                    {cart.map((item) => {
                        
                        return (
                            <div>

                                <div className="flex flex-row justify-around py-2 items-center border-b-2 border-cyan-100 m-4" >
                                    <img src={item.image} className="w-32 rounded-full shadow-lg mr-1" alt="Food-foto" />
                                    <p className="text-stone-700 font-medium text-xl mr-4">{item.name}</p>
                                    <div className="flex flex-row justify-between mt-6 ">
                                        <div className="flex flex-row justify-between gap-4 border rounded-md py-1 px-6 text-xl" >
                                            <button /*onClick={() => minus(item.id)}*/ className="mx-2 py-1 px-2 font-bold">-</button>
                                            <p className="py-1 px-2 text-xl">{item.quantity}</p>
                                            <button /*onClick={() => plus(item.id)}*/ className="mx-2 py-1 px-2 font-bold">+</button>
                                        </div>
                                        <p className="py-1 px-6 text-xl">{new Intl.NumberFormat('ru').format(item.quantity*item.price)}</p>
                                        <Button title="Удалить" handleClick={() => deleteItem(item.id)} />
                                    </div>
                                </div>
                            
                            </div>
                        )
                    })}
                    <div  className="flex flex-col justify-end items-end mt-12" >
                        <p className="text-xl font-bold text-stone-700 mb-4 mr-2" >ИТОГО: {new Intl.NumberFormat('ru').format(cart.reduce((accum,item) => accum + (item.quantity*item.price), 0))}</p>
                        <button className="bg-cyan-600 rounded-lg text-xl text-stone-200 px-8 py-4 shadow-md font-semibold cursor-pointer hover:scale-125 duration-200">Оформить заказ</button>
                    </div> 
                </div>
            )}   
                    
        </div>
    )
}

export default CartPage