import { useCallback, useEffect, useState } from "react";
import { fetchOrders } from "../services/orderService";

export function useOrderHistory() {
    const [orders, setorders] = useState([]);
    const [loading, setloading] = useState(true);
    const [error, seterror] = useState(false);

    const loadOrders = useCallback(async () => {
        setloading(true);
        seterror("");

        try {
            const response = await fetchOrders();
            setorders(response);
        } catch (requestError) {
            seterror(requestError.message || "Sipariş geçmişi alınmadı ! ");
        }
        finally {
            setloading(false);
        }
    }, [])

    useEffect(() => {
        loadOrders();
    }, []);

    return {
        orders,
        loading,
        error,
        refresh: loadOrders,
    }

}