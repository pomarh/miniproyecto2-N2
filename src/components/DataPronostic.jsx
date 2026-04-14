import React, { useContext } from "react";
import { WeatherContext } from "../context/WeatherContext";

function DataPronostic() {
    const { data, loading, error, forecast, daysLoading, unit, setUnit, convertGrados, convertWind, convertMillas } = useContext(WeatherContext);

    if (loading) {
        return <p>Cargando...</p>;
    }
    if (error) {
        return <p>Error al cargar los datos</p>;
    }
    //console.log(data.data);
    //console.log(forecast);
    return (
        <main className="w-full">
            <div className="flex justify-end md:pr-50 pt-5 gap-5">
                <button onClick={() => setUnit("C")} className="w-10 h-10 rounded-full bg-white font-bold text-[25px] focus:bg-gray-400">
                    °C
                </button>
                <button onClick={() => setUnit("F")} className="w-10 h-10 rounded-full bg-white font-bold text-[25px] focus:bg-gray-400">
                    °F
                </button>
            </div>
            <div className="w-full px-5 md:px-40 bg-[#100E1D] text-[#E7E7EB] p-8 font-sans">
                {/* Sección de Pronóstico (Ejemplo estático, OpenWeather requiere otra URL para 5 días) */}
                <div className="flex flex-wrap justify-center gap-6 mb-12">
                    {forecast?.map((dia, index) => {
                        // Lógica para la fecha: El primero es "Tomorrow", los demás formato "Vie, 14 Abr"
                        const fechaFormateada =
                            index === 0
                                ? "Tomorrow"
                                : new Date(dia.dt_txt).toLocaleDateString("en-GB", {
                                      weekday: "short",
                                      day: "numeric",
                                      month: "short",
                                  });

                        return (
                            <div key={dia.dt} className="bg-[#1E213A] p-4 w-32 flex flex-col items-center gap-3 transition-all hover:scale-105">
                                {/* Fecha */}
                                <span className="text-base text-[#E7E7EB] font-medium">{fechaFormateada}</span>

                                {/* Icono del clima dinámico */}
                                <img
                                    className="w-14 h-14 object-contain my-2"
                                    src={`/weather/${dia.weather[0].icon}.png`}
                                    alt={dia.weather[0].description}
                                />

                                {/* Temperaturas */}
                                <div className="flex justify-between w-full mt-2 text-sm md:text-base">
                                    <span className="text-[#E7E7EB]">
                                        {convertGrados(Math.round(dia.main.temp_max))}°{unit}
                                    </span>
                                    <span className="text-[#A09FB1]">
                                        {convertGrados(Math.round(dia.main.temp_min))}°{unit}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="w-full mx-auto">
                    <h2 className="text-2xl font-bold mb-8">Today’s Highlights</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Wind Status */}
                        <div className="bg-[#1E213A] md:p-6 flex flex-col items-center justify-between">
                            <span className="text-base font-medium">Wind status</span>
                            <div className="my-4">
                                <span className="text-6xl font-bold">{convertWind(data?.data?.wind?.speed)}</span>
                                <span className="text-4xl font-medium ml-1">{unit === "C" ? "m/s" : "mph"}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <img src="navigation.svg" className="w-8 h-8" style={{ transform: `rotate(${data?.data?.wind?.deg}deg)` }} />
                                <span className="text-sm uppercase">{data?.data?.wind?.deg} °</span>
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
                                <span className="text-6xl font-bold">{convertMillas(data?.data?.visibility)}</span>
                                <span className="text-4xl font-medium ml-2">{unit === "C" ? "km" : "millas"}</span>
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
