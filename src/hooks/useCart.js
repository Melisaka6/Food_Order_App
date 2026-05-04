import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export function useCart(){
    const context = useContext(CartContext);

     if(!context) {
        throw new Error("useCart sadece CartProvider içerisinde kullanılabilir!");
    }

    return context;
}