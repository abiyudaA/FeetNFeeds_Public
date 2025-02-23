import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import gifLoading from '../components/assets/Double Ring@1x-1.0s-200px-200px.svg'


export default function ProductPage() {
    const { id } = useParams();
    const navigate = useNavigate()
    const [product, setProduct] = useState({})
    const [price, setPrice] = useState()
    const [loading, setLoading] = useState(false)


    async function feetchProduct() {
        try {
            setLoading(true)
            const { data } = await axios.get(`https://h8-phase2-gc.vercel.app/apis/pub/branded-things/products/${id}`)
            setProduct(data.data)
            formatedPrice(data.data.price)
        } catch (err) {

        } finally {
            setLoading(false)
        }
    }

    function formatedPrice(price) {
        const formated = price.toLocaleString("id-ID", { style: "currency", currency: "IDR" });
        setPrice(formated)
    }

    useEffect(() => {
        feetchProduct()
    }, [])

    useEffect(() => {
        // console.log(price, 'yang ini')
    })

    return (
        <div className="flex flex-col min-h-screen"> {/* Wrapper utama */}

            <nav className="sticky top-0 z-10 p-3 bg-black text-white py-4 px-6 flex justify-between items-center">
                <h1 className="text-2xl font-bold">Feet&amp;Feeds</h1>
            </nav>

            {loading ? (
                <>
                    <div className="flex justify-center mt-28">
                        <img src={gifLoading} className="w-1/5" />
                    </div>
                </>
            ) : (
                <>
                    <main className="flex-1"> {/* Membuat konten mengisi ruang tersisa */}
                        <section className="container mx-auto py-12 px-6">
                            <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden p-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Product Image */}
                                    <img
                                        id="productImage"
                                        src={product.imgUrl}
                                        alt="Product Image"
                                        className="w-full h-96 object-cover rounded-lg"
                                    />
                                    {/* Product Details */}
                                    <div>
                                        <h2 id="productName" className="text-3xl font-bold mb-4">
                                            {product.name}
                                        </h2>
                                        <p id="productDescription" className="text-gray-600 mb-4">
                                            {product.description}
                                        </p>
                                        <p id="productPrice" className="text-black font-bold text-xl">
                                            {price}
                                        </p>
                                        {/* Back to Catalogue */}
                                        <a
                                            className="inline-block mt-6 bg-black text-white px-6 py-3 rounded hover:bg-gray-800"
                                            onClick={() => navigate(`/`)}
                                        >
                                            ← Back to Catalogue
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </main>
                </>
            )}


            <Footer />
        </div>
    )
}