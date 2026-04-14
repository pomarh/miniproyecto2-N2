import { createContext, useState } from "react";
import useFetch from "../hooks/useFetch";

export const WeatherContext = createContext();
export const WeatherProvider = ({ children }) => {
    const [ciudad, setCiudad] = useState("La Paz");
    const API_KEY = import.meta.env.VITE_API_KEY;

    //  estado de convetir de C a F
    const [unit, setUnit] = useState("C");

    const { data, loading, error } = useFetch(`https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${API_KEY}&units=metric&lang=es`);

    const { data: daysData, loading: daysLoading } = useFetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${ciudad}&appid=${API_KEY}&units=metric&lang=es`,
    );

    // filtrar para que nos llame solo los datos de 5 dias para la cart
    const filterdyas = daysData?.data?.list?.filter((item) => item.dt_txt.includes("12:00:00"));

    //funcion de cambio de temperatura
    const convertGrados = (temp) => {
        if (unit === "F") return Math.round((temp * 9) / 5 + 32);
        return Math.round(temp);
    };
    // funcion para convertir de m/s a mph
    const convertWind = (speed) => {
        if (unit === "F") {
            return Math.round(speed * 2.237);
        }
        return Math.round(speed);
    };

    // funcion para convertir a millas
    const convertMillas = (meters) => {
        const km = meters / 1000;
        if (unit === "F") {
            return (km * 0.621371).toFixed(1);
        }
        return km.toFixed(1);
    };

    return (
        <>
            <WeatherContext.Provider
                value={{
                    data,
                    loading,
                    error,
                    ciudad,
                    setCiudad,
                    forecast: filterdyas,
                    daysLoading,
                    unit,
                    setUnit,
                    convertGrados,
                    convertWind,
                    convertMillas,
                }}>
                {children}
            </WeatherContext.Provider>
        </>
    );
};
