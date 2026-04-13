import axios from "axios";
import React, { useEffect, useState } from "react";

export default function useFetch(url) {
    // standar varibles
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        //function async
        async function makeFetch() {
            try {
                const res = await axios.get(url);
                setData(res);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }
        if (url) makeFetch();
    }, [url]);
    return { data, loading, error };
}
