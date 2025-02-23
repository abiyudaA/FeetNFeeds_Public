import { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router"


export default function Navbar({ setSearch, setFilter, setSort, sort }) {
    const [categories, setCategories] = useState([])
    const navigate = useNavigate()
    async function fetchCategories() {
        try {
            const { data } = await axios.get(`https://h8-phase2-gc.vercel.app/apis/pub/branded-things/categories`)

            setCategories(data.data)

        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        fetchCategories()
    }, [])

    return (
        <>
            {/* Navbar */}
            <nav className="sticky top-0 z-10 p-3 bg-black text-white py-4 px-6 flex justify-between items-center">
                <h1 className="text-2xl font-bold">Feet&amp;Feeds</h1>
                <div className="flex items-center space-x-4">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="bg-white px-4 py-2 rounded text-black"
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <select className="bg-white px-4 py-2 rounded text-black" onChange={(e) => setFilter(e.target.value)} defaultValue={''}>
                        <option value={''}>All</option>
                        {categories.map(category => {
                            return (
                                <option key={category.id}>{category.name}</option>
                            )
                        })}

                    </select>
                    {/* sort button */}
                    <div className="flex justify-end container mx-auto px-6 py-4">
                        {sort === "ASC" ? (
                            <>
                                <button
                                    id="sortButton"
                                    className="flex items-center bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition"
                                    onClick={() => setSort("DESC")}
                                >
                                    ▲
                                </button>
                            </>
                        ) : (
                            <>
                                <button
                                    id="sortButton"
                                    className="flex items-center bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition"
                                    onClick={() => setSort("ASC")}
                                >
                                    ▼
                                </button>
                            </>
                        )}


                    </div>
                </div>
            </nav>
        </>
    )
}