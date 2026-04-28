import { useEffect, useState, useCallback } from "react";
import { fetchMeals } from "../services/mealService";

export function useMeals() {
    const [meals, setMeals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    //fonksiyonu aklında tutacak her seferinde yeni oluşturulmayacak.
    const loadMeals = useCallback(async () => {  
        setLoading(true)
        setError("");

        try {
            const response = await fetchMeals();
            setMeals(response)
        } catch (requestError) {
            setError(requestError.message || "Menü verisi alınamadı!");
        } finally {
            setLoading(false)
        }
    })

    useEffect(() => {
        loadMeals();
    }, []);

    return {
        meals,
        loading,
        error,
        refetch: loadMeals
    }
}