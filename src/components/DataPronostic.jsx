import React, { useEffect } from "react";
import useFetch from "../hooks/useFetch";

function DataPronostic() {
    const API_KEY = import.meta.env.VITE_API_KEY;
    let ciudad = "La Paz";

    const { data, loading, error } = useFetch(`https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${API_KEY}&units=metric&lang=es`);

    if (loading) {
        return <p>Cargando...</p>;
    }
    if (error) {
        return <p>Error al cargar los datos</p>;
    }
    console.log(data?.data);
    return (
        <main>
            <div className="min-h-screen bg-[#100E1D] text-[#E7E7EB] p-8 font-sans">
                {/* Sección de Pronóstico (Ejemplo estático, OpenWeather requiere otra URL para 5 días) */}
                <div className="flex flex-wrap justify-center gap-6 mb-12">
                    <div className="bg-[#1E213A] p-4 w-32 flex flex-col items-center gap-3">
                        <span className="text-base">Hoy</span>

                        <div className="flex justify-between w-full mt-2">
                            <span>°C</span>
                            <span className="text-[#A09FB1]">°C</span>
                        </div>
                    </div>
                </div>

                <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl font-bold mb-8">Today’s Highlights</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Wind Status */}
                        <div className="bg-[#1E213A] p-6 flex flex-col items-center justify-between">
                            <span className="text-base font-medium">Wind status</span>
                            <div className="my-4">
                                <span className="text-6xl font-bold">{data?.data?.wind?.speed}</span>
                                <span className="text-4xl font-medium ml-1">m/s</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="bg-[#6E707A] p-2 rounded-full">{/* Rotamos la flecha según la dirección del viento */}</div>
                                <span className="text-sm uppercase">Dirección:{data?.data?.wind?.deg} °</span>
                            </div>
                        </div>

                        {/* Humidity */}
                        <div className="bg-[#1E213A] p-6 flex flex-col items-center">
                            <span className="text-base font-medium">Humidity</span>
                            <div className="my-4">
                                <span className="text-6xl font-bold">{data?.data?.main?.humidity}</span>
                                <span className="text-4xl font-light">%</span>
                            </div>
                            <div className="w-full max-w-55 mt-4">
                                <div className="flex justify-between text-[10px] text-[#A09FB1] mb-1">
                                    <span>0</span>
                                    <span>50</span>
                                    <span>100</span>
                                </div>
                                <div className="w-full bg-[#E7E7EB] h-2 rounded-full overflow-hidden">
                                    <div className="bg-[#FFEC65] h-full" style={{ width: `${data?.data?.main?.humidity}%` }}></div>
                                </div>
                                <div className="text-right text-[10px] text-[#A09FB1] mt-1">%</div>
                            </div>
                        </div>

                        {/* Visibility */}
                        <div className="bg-[#1E213A] p-6 flex flex-col items-center">
                            <span className="text-base font-medium">Visibility</span>
                            <div className="my-4">
                                <span className="text-6xl font-bold">{data?.data?.visibility}</span>
                                <span className="text-4xl font-medium ml-2">km</span>
                            </div>
                        </div>

                        {/* Air Pressure */}
                        <div className="bg-[#1E213A] p-6 flex flex-col items-center">
                            <span className="text-base font-medium">Air Pressure</span>
                            <div className="my-4">
                                <span className="text-6xl font-bold">{data?.data?.main?.pressure}</span>
                                <span className="text-4xl font-medium ml-2">mb</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default DataPronostic;
