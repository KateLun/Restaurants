import Header from "components/Header";
import HomePage from "components/HomePage";
import { Link } from "react-router-dom";

function ErrorPage() {
    return (
        <div>
            <Header />
        
            <div className="h-screen w-screen bg-gray-100 flex items-center">
                <div className="container flex flex-col md:flex-row items-center justify-center px-5 text-gray-700">
                    <div className="max-w-md">
                        <div className="text-5xl font-dark font-bold">404</div>
                        <p className="text-2xl md:text-3xl font-light leading-normal">Извините, мы не можем найти эту страницу </p>
                        <p className="mb-8">Но не волнуйтесь, Вы можете вернуться на домашнюю страницу.</p>
                    
                        <button className="px-4 inline py-2 text-sm font-medium leading-5 shadow text-white transition-colors duration-150 border border-transparent rounded-lg focus:outline-none focus:shadow-outline-blue bg-fuchsia-500 active:bg-fuchsia-500 hover:bg-fuchsia-700">
                            <Link to="/" element={<HomePage />} >
                                <p className="">Выбрать ресторан</p>
                            </Link>
                        </button>
                    </div>
                <div className="max-w-lg">
                    <img src="https://pngicon.ru/file/uploads/cat_hungry.png" alt="Ooops" />
                </div>
                
                </div>
            </div>
        </div>
     );
 }
 
 export default ErrorPage;