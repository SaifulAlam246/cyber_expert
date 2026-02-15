import { useEffect, useState } from "react";
import { ShoppingCart } from "lucide-react";

const Person = () => {
    const [expert, setExpert] = useState([]);
    const [expertCart, setExpertCart] = useState([]);

    useEffect(() => {
        fetch('./expert.json')
            .then(res => res.json())
            .then(data => setExpert(data));
    }, []);

    const totalCost = expertCart.reduce((total, expertt) => total + expertt.salary, 0);

    const addToCart = (expertt) => {
        if (!expertCart.find(e => e.id === expertt.id)) {
            setExpertCart([...expertCart, expertt]);
        }
        else{
            return alert("This Expert Also Exists.")
        }
    };

    return (
        <div>
            {/* Header */}
            <div className="bg-gray-500 from-blue-700 to-indigo-800 text-white p-8 rounded-xl shadow-2xl mb-10 text-center">
                <h1 className="text-4xl font-extrabold mb-2">Build Your Cyber Security Team</h1>
                <p className="text-lg opacity-90">Our server is under attack! Hire the best specialists to secure the perimeter.</p>
                <div className="mt-4 inline-block bg-white/20 px-6 py-2 rounded-full backdrop-blur-md">
                    <h2 className="text-xl font-semibold italic text-yellow-200">Total Budget: 10 Million</h2>
                </div>
            </div>

            {/* Container */}
            <div className="flex flex-col lg:flex-row gap-8">
                
                {/* Left Side */}
                <div className="lg:w-3/4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {expert.map(expertt => (
                        <div key={expertt.id} className="bg-white border border-gray-200 p-5 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col justify-between">
                            <div>
                                <img className="w-full h-44 object-cover rounded-xl mb-4 border" src={expertt.img} alt={expertt.name} />
                                <h2 className="text-xl font-bold text-gray-800">{expertt.name}</h2>
                                <p className="text-indigo-600 font-semibold text-sm mb-3 uppercase tracking-wider">{expertt.designation}</p>
                                
                                <div className="space-y-1 text-sm text-gray-600 border-t pt-3">
                                    <p><strong>Age:</strong> {expertt.age}</p>
                                    <p><strong>Address:</strong> {expertt.address}</p>
                                    <p className="text-gray-900 font-bold text-lg mt-2 font-mono">Salary: ${expertt.salary.toFixed(2)}</p>
                                </div>
                            </div>
                            
                            <button 
                                onClick={() => addToCart(expertt)}
                                className="mt-5 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 rounded-lg flex items-center justify-center gap-2 font-medium transition-colors"
                            >
                                <ShoppingCart/> Add to Cart
                            </button>
                        </div>
                    ))}
                </div>

                {/* Right Side */}
                <div className="lg:w-1/4">
                    <div className="bg-white p-6 rounded-2xl shadow-lg sticky top-6 border border-gray-100">
                        <h1 className="className= mb-2 text-2xl font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full  ">
                            Expert Added : {expertCart.length}
                        </h1>
                        
                        <div className="space-y-4 mb-6">
                            <div className="flex justify-between items-center text-gray-800 font-bold text-lg">
                                <span>Total Cost:</span>
                                <span className="text-green-600">${totalCost.toLocaleString()}</span>
                            </div>
                        </div>

                        {/* expert List */}
                        <div className="max-h-60 overflow-y-auto space-y-3 mb-6 pr-2">
                            {expertCart.map(expertt => (
                                <div className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg animate-fade-in" key={expertt.id}>
                                    <img className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm" src={expertt.img} alt={expertt.name} />
                                    <h2 className="text-sm font-medium text-gray-700 truncate">{expertt.name}</h2>
                                </div>
                            ))}
                        </div>

                        <button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-bold shadow-lg shadow-green-200 transition-all flex items-center justify-center gap-2">
                             Confirm List
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Person;