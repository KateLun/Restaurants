import { useState} from "react";
import { Link } from "react-router-dom";

function HomePage() {

    const [ rest, setRest ] = useState([])

        async function showRest() {
                const responce = await fetch("https://www.bit-by-bit.ru/api/student-projects/restaurants")
                const restaurants = await responce.json() 
                setRest(restaurants)
            }
        
    showRest()

    return (
        <div className="max-w-screen-lg m-auto my-10" >
            {rest.length === 0 && (
            <div class=" m-auto my-72 h-16 w-16 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
            <span class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
            </div>
            )}

            <div className="grid grid-cols-2 px-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4" >
                {rest.length > 0 && rest.map((item) => {
                    return (
                        <Link to={`/rectaurant/${item.slug}`} class="group relative block bg-black">
                            <img
                                alt="foodr"
                                src={item.image}
                                className="absolute inset-0 h-full w-full object-cover opacity-75 transition-opacity group-hover:opacity-50"
                            />

                            <div className="relative p-4 sm:p-6 lg:p-8">
                                <p className="text-xl font-bold uppercase tracking-widest text-fuchsia-200">{item.name}</p>
                            

                                <div className="mt-32 sm:mt-48 lg:mt-64">
                                    <div className=" flex flex-col text-fuchsia-100 translate-y-8 transform opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
                                    <p className="text-sm font-medium text-center text-fuchsia-100 sm:text-lg pb-4">Тип кухни: {item.cuisine}</p>
                                        <div className="flex flex-row gap-2" >
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                                            </svg>
                                            <p className="text-sm text-fuchsia-100">{item.address}</p>
                                        </div>
                                        <div className="flex flex-row gap-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                                            </svg>
                                            <p className="text-sm">{item.phone}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    )
                })}
            </div>
       </div>
    )
}

export default HomePage