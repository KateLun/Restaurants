import { useState } from "react";
import { useEffect} from "react";
import { useParams } from "react-router-dom";
import classNames from "classnames";
//import {createContext} from "react";
import "components/RestaurantPage/menu.css";

function RestaurantPage( ) {
    
    const { slug } = useParams()

    const [ rest, setRest ] = useState({})

    useEffect(() => {
        fetch(`https://www.bit-by-bit.ru/api/student-projects/restaurants/${slug}`)
        .then(res => res.json())
        .then(data => setRest(data))
    }, [slug])

    const [ menu, setMenu ] = useState([])

    useEffect(() => {
        fetch(`https://www.bit-by-bit.ru/api/student-projects/restaurants/${slug}/items`)
        .then(res => res.json())
        .then(data => setMenu(data))
        //.then(menu.forEach((element) => { element.isAdded = "false"}))
    }, [slug])

    const [ cart, setCart ] = useState()

    const changedCart = (id) => {
        const copyMenu = [...menu]
        const status = copyMenu.find( (item) => item.id === id)
        status.isAdded = !status.isAdded
        setCart(copyMenu.filter((item) => item.isAdded))
        console.log(cart) 
    }


    return (
       <div className="max-w-screen-lg m-auto my-10">

        
            {menu.length === 0 && (
                <div class=" m-auto my-72 h-16 w-16 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
                <span class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
                </div>
            )}

            <div className="flex flex-col m-auto justify-center shadow-xl rounded-md bg-white px-8 py-8 max-w-5xl ">
                <div className="flex flex-row justify-between">
                    <div className="flex flex-col w-1/3">
                        <p className="font-bold text-2xl text-gray-600 mt-4">Кухня: {rest.cuisine}</p>
                        <h1 className="font-bold text-4xl mt-6 mb-10 text-fuchsia-400 ">{rest.name}</h1>
                        <p className="text-xl text-gray-600 text-justify pt-2">{rest.description}</p>
                    </div>
                    <div className="w-2/3 flex justify-center">
                        <img className="w-72 h-96 object-cover object-center" src={rest.image} alt="rest-img" />
                    </div>
                </div>
                <div className="flex flex-row justify-around border-t-2 pt-6 mt-4">
                    <div className="flex flex-row gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                        </svg>
                        <p>{rest.phone}</p>
                    </div>
                    <div className="flex flex-row gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                        </svg>
                        <p>{rest.address}</p>
                    </div>
                    <div className="flex flex-row gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                        </svg>
                        <p>{rest.email}</p>
                    </div>
                </div>
            </div>

            <div className="text-center mt-24 mb-16 text-5xl font-bold text-slate-600 underline decoration-6 underline-offset-8 decoration-cyan-300">НАШЕ МЕНЮ</div>

            {menu.length > 0 && menu.map((item) => {
                return (
                    <div className="big">
                        <div className="recipe">
                            <div className="pizza-box">
                                <img src={item.image} alt="food"  className="menu-img" />
                            </div>
                            <div className="recipe-content">

                                <h1 className="recipe-title">{item.name}</h1>

                                <p className="recipe-metadata">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="mr-2 w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
                                    </svg>
                                    <span className="recipe-votes">{item.price}</span>
                                </p>

                                <p className="recipe-desc">{item.description}</p>

                                <div className="flex flex-row justify-end mt-6">
                                    <button 
                                        className={classNames(
                                            "mx-1 rounded-lg text-xl text-white px-4 py-1 shadow-md font-semibold cursor-pointer hover:bg-stone-500",
                                            {
                                                "bg-fuchsia-400": !item.isAdded,
                                                "bg-fuchsia-700": item.isAdded,
                                            }
                                    )}
                                        onClick={() => changedCart(item.id)}
                                    >
                                        {item.isAdded ? "Добавлено!" : "В корзину"}
                                    </button>
                                </div>

                            </div>
                        </div>
                    </div>
                   
                )
            })}
            
       </div>
    )
}

export default RestaurantPage
