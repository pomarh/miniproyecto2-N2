import useFetch from "../hooks/useFetch";
import DataPronostic from "./DataPronostic";
import Search from "./Search";

function Aside() {
    const API_KEY = import.meta.env.VITE_API_KEY;
    const date = new Date().toLocaleDateString("en-GB", {
        weekday: "short",
        day: "numeric",
        month: "short",
    });
    let ciudad = "La Paz";

    const { data, loading, error } = useFetch(`https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${API_KEY}&units=metric&lang=es`);

    if (loading) {
        return <p>Cargando...</p>;
    }
    if (error) {
        return <p>Error al cargar los datos</p>;
    }
    console.log(data);
    return (
        <>
            <aside className="w-full md:w-100 bg-[#1E213A] min-h-screen flex flex-col items-center py-10 px-6 relative overflow-hidden">
                {/* Fondo de nubes sutiles (puedes usar una imagen de nubes con opacidad baja) */}
                <div className="absolute top-20 opacity-10 w-full flex justify-center scale-150"></div>
                {/* Botón de búsqueda y localización */}
                <Search />
                <div className="w-full flex justify-between items-center mb-16 z-10">
                    <button className="bg-[#6E707A] text-white px-4 py-2 shadow-md hover:bg-gray-500 transition">Search for places</button>
                    <button className="bg-[#6E707A] p-2 rounded-full text-white shadow-md hover:bg-gray-500">
                        <img className="w-8 h-8" src="location.svg" alt="" />
                    </button>
                </div>
                {/* Imagen Principal del Clima */}
                <div className="relative mb-16 z-10">
                    <img src="./weather/01d.png" alt="" />
                </div>
                <div className="flex items-baseline mb-16 z-10">
                    <span className="text-[144px] font-medium leading-none text-[#E7E7EB]">{data?.data?.main?.temp}</span>
                    <span className="text-5xl text-[#A09FB1] font-medium">°C</span>
                </div>
                <h3 className="text-4xl font-semibold text-[#A09FB1] mb-12 z-10 capitalize">{data?.data?.description}</h3>
                <div className="flex flex-col items-center gap-6 text-[#88869D] text-lg font-medium z-10">
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
