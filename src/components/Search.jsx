import { useContext, useState, useEffect } from "react";
import { WeatherContext } from "../context/WeatherContext";

function Search({ onClose }) {
    const [buscar, setBuscar] = useState("");
    const [resultado, setResultado] = useState([]);
    const { setCiudad } = useContext(WeatherContext);
    const API_KEY = import.meta.env.VITE_API_KEY;

    useEffect(() => {
        const buscarCiudades = async () => {
            if (buscar.length > 2) {
                try {
                    const response = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${buscar}&limit=5&appid=${API_KEY}`);
                    const data = await response.json();
                    setResultado(data);
                } catch (error) {
                    console.error("Error buscando ciudades:", error);
                }
            } else {
                setResultado([]);
            }
        };

        const timeoutId = setTimeout(buscarCiudades, 500);
        return () => clearTimeout(timeoutId);
    }, [buscar, API_KEY]);

    const seleccionarCiudad = (city) => {
        setCiudad(city.name); // Actualiza el contexto global
        onClose(); // Cierra el buscador
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (buscar.trim()) {
            setCiudad(buscar); // ¡Esto actualiza todo!
            onClose();
        }
    };

    return (
        <>
            <div className="absolute inset-0 bg-[#1e213a] z-50 p-6 flex flex-col w-full h-full">
                <div className="flex justify-end mb-8">
                    <button onClick={onClose} className=" flex justify-end pb-5 ">
                        <img className="w-8 h-8" src="/close.svg" alt="close icon" />
                    </button>
                </div>
                <form className="flex justify-between gap-5 relative" onSubmit={(e) => e.preventDefault()}>
                    <div className="relative flex-grow min-w-0">
                        <img className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 opacity-50" src="search.svg" alt="search icon" />
                        <input
                            className="w-full h-12 bg-transparent border border-[#E7E7EB] text-white pl-10 pr-2 text-sm md:text-base outline-none focus:border-blue-500"
                            type="text"
                            placeholder="search location"
                            onChange={(e) => setBuscar(e.target.value)}
                        />
                    </div>

                    <button type="submit" className="px-4 h-12 bg-blue-700 text-white text-xl">
                        Search
                    </button>
                </form>
                <div className="flex flex-col gap-4 overflow-y-auto">
                    {resultado.map((city, index) => (
                        <button
                            key={index}
                            onClick={() => seleccionarCiudad(city)}
                            className="w-full flex justify-between items-center px-4 py-6 border border-transparent hover:border-[#616475] text-[#E7E7EB] text-left transition group">
                            <span>
                                {city.name}, {city.country}
                            </span>
                            <span className="text-[#616475] opacity-0 group-hover:opacity-100 transition">&gt;</span>
                        </button>
                    ))}
                </div>
            </div>
        </>
    );
}

export default Search;
