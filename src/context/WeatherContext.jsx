import { Children, createContext, useState } from "react";
import useFetch from "../hooks/useFetch";

export const WeatherContext = createContext();
export const WeatherProvider = ({ children }) => {
    const [ciudad, setCiudad] = useState("La Paz");
    const API_KEY = import.meta.env.VITE_API_KEY;

    const { data, loading, error } = useFetch(`https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${API_KEY}&units=metric&lang=es`);
    return (
        <>
            <WeatherContext.Provider value={{ data, loading, error, ciudad, setCiudad }}>{children}</WeatherContext.Provider>
        </>
    );
};
