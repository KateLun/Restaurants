import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "components/Header";
import HomePage from "components/HomePage";
import  { Form, Field } from "react-final-form";
import swal from "sweetalert"
import "components/CartPage/form.css";

function CartPage() { //ПРИ ПРОСТОМ ПЕРЕХОДЕ НА СТРАНИЦУ ДРУГОГО РЕСТОРАНА ОБНУЛЯЕТСЯ ???

    const [cartItems, setCartItems] = useState([])

    useEffect(() => {
        setCartItems(JSON.parse(localStorage.getItem("cartItems")))
    }, [])

    const deleteItem = (id) => {
        setCartItems(cartItems.filter(item => item.id !== id))
        localStorage.setItem("cartItems", JSON.stringify(cartItems))
    }

    const newCart = cartItems.map((item) =>  ({ 
        itemId: item.id,
        quantity: item.quantity,
        price: item.price}))

    const handleClick = async (values) => { //ФОРМА НЕ ОЧИЩАЕТСЯ ПОСЛЕ ВЫПОЛНЕНИЯ ЗАПРОСА
        const params = {
            customerName: values.customerName,
            phone: values.phone,
            email: values.email,
            restaurantId: cartItems[0].restaurantId,
            cartItems: newCart,
          }
        console.log(params)

        const url = "https://www.bit-by-bit.ru/api/student-projects/restaurants/order"

        let response = await fetch(url, {
            method: "POST",
            body: JSON.stringify(params)
        })

        try {
        let date = await response.json()

        if (date) {
            swal("Спасибо!", "Ваш заказ принят в обработку", "success")
        }
        } catch {
            swal("Произошла ошибка", "Повторите попытку", "error")
        }
    }
    

    return (
        <div>
            <Header  quantity={cartItems.length} />
            <div className="max-w-screen-lg m-auto my-10">

                {cartItems.length === 0 && (
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

                {cartItems.length > 0 && ( 
                    <div>
                        <p className="text-center mt-8 md:mt-24 mb-12 md:mb-16  text-xl md:text-5xl font-bold text-slate-600 underline decoration-6 underline-offset-8 decoration-cyan-300">Проверьте Ваш заказ</p>
                
                        {cartItems.map((item) => {
                            
                            return (
                                <div>

                                    <div className="flex flex-col md:flex-row justify-around py-2 items-center border-b-2 border-cyan-100 m-4" >
                                        <div className="flex flex-row items-center justify-start"> 
                                            <img src={item.image} className="w-32 h-16 rounded-full shadow-lg mr-4" alt="Food-foto" />
                                            <p className="text-stone-700 font-medium text-xl mr-4">{item.name}</p>
                                        </div>
                                        <div className="flex flex-row items-center justify-end text-lg md:text-xl"> 
                                            <p className="py-1 px-1 md:px-2">{item.quantity}шт.</p>
                                            <p className="py-1 px-1 md:px-6">{new Intl.NumberFormat('ru').format(item.quantity*item.price)} руб.</p>
                                            <button className="hover:scale-110" onClick={() => deleteItem(item.id)}> 
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                </svg>
                                            </button>
                                        </div>
                                    
                                    
                                    </div>
                                
                                </div>
                            )
                        })}

                        <div className="flex mr-4 md:mr-1 flex-col justify-end items-end mt-12" >
                            <p className="text-xl font-bold text-stone-700 mb-4 mr-2" >ИТОГО: {new Intl.NumberFormat('ru').format(cartItems.reduce((accum,item) => accum + (item.quantity*item.price), 0))}</p>
                        </div> 

                        <Form 
                            onSubmit={handleClick}
                            render={( { handleSubmit }) => (
                                <form>
                                    <div className="flex flex-col sm:flex-row justify-around mt-10">
                                        <div className="flex flex-col  m-auto sm:gap-8">
                                            <div className="group">
                                                <Field
                                                name="customerName"
                                                component="input"
                                                type="text"
                                                className="input"
                                                />
                                                <span className="highlight"></span>
                                                <span className="bar"></span>
                                                <label>Имя</label>
                                            </div>
                                            <div className="group">
                                                <Field
                                                name="phone"
                                                component="input"
                                                type="number"
                                                className="input"
                                                />
                                                <span className="highlight"></span>
                                                <span className="bar"></span>
                                                <label>Номер телефона</label>
                                            </div>
                                        </div>
                                        <div className="flex flex-col m-auto sm:gap-8">
                                            <div className="group">
                                                <Field
                                                name="email"
                                                component="input"
                                                type="text"
                                                className="input"
                                                />
                                                <span className="highlight"></span>
                                                <span className="bar"></span>
                                                <label>E-mail</label>
                                            </div>
                                            <div className="group">
                                                <Field
                                                name="address"
                                                component="input"
                                                type="text"
                                                className="input"
                                                />
                                                <span className="highlight"></span>
                                                <span className="bar"></span>
                                                <label>Адрес доставки</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex mr-4 md:mr-1 flex-col justify-end items-end mt-12">
                                        <button type="submit" onClick={handleSubmit} className="bg-cyan-600 rounded-lg text-xl text-stone-200 px-8 py-4 shadow-md font-semibold cursor-pointer hover:bg-cyan-900 duration-200">Оформить заказ</button>
                                    </div>
                                    
                                </form>
                            )}
                        />
                        
                    </div>
                )}   
                        
            </div>
        </div>
    )
}

export default CartPage