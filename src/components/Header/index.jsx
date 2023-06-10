import { Link } from "react-router-dom";

const Header = ( { quantity }) => {

    return (
        <header className="bg-zinc-50 shadow-md">
                <nav className="max-w-screen-lg m-auto flex flex-row justify-between font-semibold text-lg"> 
                    <div className="flex flex-row gap-5 mx-4 font-semibold text-sm sm:text-lg">
                        <p className="p-4 border-b-2 text-stone-800 border-cyan-300 border-opacity-0 hover:border-opacity-100 hover:text-cyan-300 duration-200 cursor-pointer active"> О нас</p>
                        <Link to={"/"} className="p-4 border-b-2 text-stone-800 border-cyan-300 border-opacity-0 hover:border-opacity-100 hover:text-cyan-300 duration-200 cursor-pointer active">Выбор ресторана</Link>
                    </div>
                    <div className="flex flex-row align-center p-4 text-stone-800">
                        <Link to={"/cart"} className="flex row  hover:text-cyan-300">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 duration-200 cursor-pointer active">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                            </svg>
                            <p className="h-5 w-5 p-1 -ml-2 text-stone-500 font-bold border border-solid border-cyan-300 rounded-full bg-white flex items-center justify-center font-mono">{quantity}</p>
                        </Link>
                    </div>
                </nav>
        </header>
    )
}

export default Header