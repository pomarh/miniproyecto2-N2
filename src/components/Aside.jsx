import { useState, useContext } from "react";
import { WeatherContext } from "../context/WeatherContext";
import Search from "./Search";

function Aside() {
    //variables para la API_KEY y fecha
    const { data, loading, error, ciudad, setCiudad, unit, convertGrados } = useContext(WeatherContext);
    const grados = data?.data;
    const date = new Date().toLocaleDateString("en-GB", {
        weekday: "short",
        day: "numeric",
        month: "short",
    });

    //boton para llamar a search
    const [openSearch, setOpenSearch] = useState(false);

    if (loading) {
        return <p>Cargando...</p>;
    }
    if (error) {
        return <p>Error al cargar los datos</p>;
    }

    return (
        <>
            <aside className="relative w-full md:w-150 bg-[#1E213A] flex flex-col items-center py-5 px-6 overflow-hidden">
                {/* Fondo de nubes sutiles (puedes usar una imagen de nubes con opacidad baja) */}
                {openSearch && (
                    <div className="absolute inset-0 z-50 bg-[#1e213a]">
                        <Search onClose={() => setOpenSearch(false)} />
                    </div>
                )}
                <div className="absolute top-20 opacity-10 w-full flex justify-center scale-150"></div>
                <div className="w-full flex justify-between items-center mb-16 z-10">
                    <button className="bg-[#6E707A] text-white px-4 py-2 shadow-md hover:bg-gray-500 transition" onClick={() => setOpenSearch(true)}>
                        Search for places
                    </button>
                    <button onClick={setCiudad(ciudad)} className="bg-[#6E707A] p-2 rounded-full text-white shadow-md hover:bg-gray-500">
                        <img className="w-8 h-8" src="location.svg" alt="location icon" />
                    </button>
                </div>
                {/* Imagen Principal del Clima */}
                <div className="relative mb-16 z-10">
                    <img className="w-30 h-30" src={`/weather/${data?.data?.weather[0].icon}.png`} alt="" />
                </div>
                <div className="flex items-baseline mb-16 z-10">
                    <span className="text-[130px] font-medium leading-none text-[#E7E7EB]">{convertGrados(Math.round(grados?.main?.temp))}</span>
                    <span className="text-5xl text-[#A09FB1] font-medium">°{unit}</span>
                </div>
                <h3 className="text-3xl font-semibold text-[#A09FB1] mb-12 z-10 capitalize">{data?.data?.description}</h3>
                <div className="flex flex-col items-center gap-6 text-[#88869D] text-[14px] font-medium z-10">
                    <div className="flex items-center gap-4">
                        <span>Today</span>
                        <span>•</span>
                        <span>{date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div>
                            <img className="w-7 h-7" src="location_on.svg" alt="" />
                        </div>
                        <span>{data?.data?.name}</span>
                    </div>
                </div>
            </aside>
        </>
    );
}

export default Aside;
