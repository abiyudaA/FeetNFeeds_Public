import { useEffect, useState } from "react";
import { useNavigate } from "react-router"


export default function Card({ product }) {
    const [price, setPrice] = useState()
    const navigate = useNavigate()

    function formatedPrice() {
        const formated = product.price.toLocaleString("id-ID", {style:"currency", currency:"IDR"});
        setPrice(formated)
    }


    useEffect(() => {
        formatedPrice()
    },[])

    return (
        <>
            {/* Card 1 */}

            <div key={product.id} className="h-auto bg-white shadow-lg rounded-lg overflow-hidden transform transition duration-300 hover:scale-105" onClick={() => navigate(`/${product.id}`)}>
                <img
                    src={product.imgUrl}
                    alt={product.name}
                    className="w-full h-85 object-cover"
                />
                <div className="p-4">
                    <h3 className="text-xl font-semibold">{product.name}</h3>
                    <p className="text-gray-600">
                        {product.description.length > 70 ? product.description.substring(0, 70) + " . . ." : product.description}
                    </p>
                    <p className="text-black font-bold mt-2">{price}</p>
                </div>
            </div>

        </>
    )
}