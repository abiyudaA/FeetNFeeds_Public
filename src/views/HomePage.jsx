import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import axios from 'axios'
import gifLoading from '../components/assets/Double Ring@1x-1.0s-200px-200px.svg'

export default function HomePage() {
    const [products, setProducts] = useState([])
    const [search, setSearch] = useState('')
    const [filter, setFilter] = useState('')
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState()
    const [loading, setLoading] = useState(false)
    const [sort, setSort] = useState("ASC");
    let button = []

    for (let x = 1; x <= totalPages; x++) {
        button.push(x)
    }



    async function fetchProducts() {
        try {
            setLoading(true)
            const { data } = await axios.get(`https://h8-phase2-gc.vercel.app/apis/pub/branded-things/products?q=${search}&i=${filter}&limit=12&page=${currentPage}&sort=${sort}`)
            setProducts(data.data.query)
            setTotalPages(data.data.pagination.totalPage)
        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        // console.log(products)
        // console.log(filter);
        // console.log(button)
    })

    useEffect(() => {
        fetchProducts()
    }, [search, filter, currentPage, sort])

    return (
        <div className="min-h-screen flex flex-col">  
            <Navbar setSearch={setSearch} setFilter={setFilter} setSort={setSort} sort={sort}/>

            <main className="flex-1">
                {/* Home Section */}
                <section className="text-center py-3 bg-gray-200">
                    <h2 className="text-3xl font-bold">
                        Fit your IG feeds with our comfort footwears for your feet
                    </h2>
                    <p className="text-lg text-gray-700">
                        Explore our collection of modern classic shoes designed for style and
                        comfort.
                    </p>
                </section>

                


                {loading ? (
                    <>
                        <div className="flex justify-center mt-28">
                            <img src={gifLoading} className="w-1/5" />
                        </div>
                    </>
                ) : (
                    <>
                        <section className="container mx-auto py-12 px-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {products.length > 0 ? (
                                    products.map((product) => (
                                        <Card key={product.id} product={product} />
                                    ))
                                ) : (
                                    <p className="text-center text-gray-500">No products available</p>
                                )}
                            </div>
                        </section>
                    </>
                )}

            </main>

            {/* Footer */}
            <footer className="mt-auto">
                <div className="flex justify-center items-center mt-8 space-x-4">
                    <button
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="px-2 py-2 bg-black text-white rounded disabled:opacity-50"
                    >
                        Previous
                    </button>
                    <span className="text-lg font-semibold">Page {currentPage} of {totalPages}</span>
                    <button
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="px-2 py-2 bg-black text-white rounded disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>

                <div className="flex justify-center items-center mt-8 space-x-4">
                    {button.map((b) => (
                        <button
                            key={b}
                            onClick={() => setCurrentPage(b)}
                            disabled={currentPage === b}
                            className="px-4 py-2 bg-black text-white rounded disabled:opacity-50"
                        >
                            {b}
                        </button>
                    ))}
                </div>

                <Footer />
            </footer>
        </div>
    );
}