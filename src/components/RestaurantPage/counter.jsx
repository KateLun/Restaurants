import { useState } from "react";
import { useEffect} from "react";
import classNames from "classnames";

function Counter ( {menuItem, cartItems, setCartItems} ) {
    const [count, setCount] = useState(1)
    const [isAdded, setIsAdded] = useState(false)
    const [flag, setFlag] = useState(1)

    const changeCart = () => {
        if (flag === 1) {
            //if(cartItems > 0 && cartItems[0].restaurantId === menuItem.restaurantId) { //НЕ РАБОТАЕТ, НО БЕЗ ЭТОГО КОДА 
            //ПРИ ПРОСТОМ ПЕРЕХОДЕ НА СТРАНИЦУ ДРУГОГО РЕСТОРАНА ОБНУЛЯЕТСЯ КОРЗИНА???
                const newCartItem = {...menuItem, quantity: count, status: setIsAdded(true)}
                setCartItems([...cartItems, newCartItem])
                setFlag(2)
            //} else {
           //     alert("В корзине уже есть блюда из другого ресторана, для продолжения данного заказа очистите корзину!")
           // }
        } else {
            const newCartItems = cartItems.filter(item => item.status = isAdded) //новый массив без того продукта, на который пользователь нажал "удалить"
            setCartItems(newCartItems)
            setFlag(1)
        }
    }

    useEffect(() => {
        localStorage.setItem("cartItems", JSON.stringify(cartItems))
    }, [cartItems])

    const plus = () => { 
        if (count < 10) {
            setCount(count + 1) 
        } else {
            return;
        }
    }

    const minus = () => { 
        if (count > 0) {
            setCount(count - 1) 
        } else {
            return
        }
    }

    return (
        <div className="flex flex-row justify-center mt-6">
            <div className="flex flex-row border rounded-md p-2 text-xl md:gap-1 gap-2" >
                <button onClick={() => minus()} className="mx-2 py-1 px-2 font-bold">-</button>
                <p className="py-1 px-2 text-lg md:text-xl">{count} шт.</p>
                <button onClick={() => plus()} className="mx-2 py-1 px-2 font-bold">+</button>
            </div>
            <button 
                className={classNames(
                    "mx-1 rounded-lg text-xl text-white ml-4 md:ml-8 px-4 py-1 shadow-md font-semibold cursor-pointer bg-fuchsia-400 hover:bg-stone-500",
                    {
                        "bg-fuchsia-400": flag === 1,
                        "bg-red-400": flag === 2,
                    }
                )}
                onClick={() => changeCart()}
                >{flag === 2 ? "Удалить" : "В корзину"}
            </button>
        </div>
    )
}


export default Counter