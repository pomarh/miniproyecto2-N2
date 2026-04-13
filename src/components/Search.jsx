import { useContext, useState } from "react";
import { WeatherContext } from "../context/WeatherContext";

function Search({ onClose }) {
    const [buscar, setBuscar] = useState("");
    const { setCiudad } = useContext(WeatherContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (buscar.trim()) {
            setCiudad(buscar); // ¡Esto actualiza todo!
            onClose();
        }
    };

    return (
        <>
            <div className="flex flex-col">
                <button className=" flex justify-end pb-5 ">
                    <img className="w-8 h-8" src="/close.svg" alt="close icon" />
                </button>
                <form className="flex justify-between gap-5 relative" onSubmit={handleSubmit}>
                    <img className=" w-8 h-8 absolute left-2 top-2" src="search.svg" alt="search icon" />
                    <input
                        className="h-12 bg-[#1E213A] border border-gray-400 text-white pl-12 text-xl"
                        type="text"
                        placeholder="search location"
                        onChange={(e) => setBuscar(e.target.value)}
                    />
                    <button className="px-4 h-12 bg-blue-700 text-white text-xl">Search</button>
                </form>
            </div>
        </>
    );
}

export default Search;
