import React, { useState } from 'react';
import { Search, MapPin, Tag, Calendar, User, AlignLeft, Menu, X, Filter } from 'lucide-react';

// --- MOCK DATA ---
const mockItems = [
    { id: 1, name: "Black Leather Wallet", category: "Wallet", location: "Found at Library", reported: "2 hours ago", imageUrl: "https://placehold.co/100x100/6b7280/ffffff?text=Wallet" },
    { id: 2, name: "White Wireless Earbuds", category: "Electronics", location: "Found at Cafeteria", reported: "5 hours ago", imageUrl: "https://placehold.co/100x100/6b7280/ffffff?text=Earbuds" },
    { id: 3, name: "Keys with Red Lanyard", category: "Keys", location: "Found at Cafeteria", reported: "3 hours ago", imageUrl: "https://placehold.co/100x100/6b7280/ffffff?text=Keys" },
    { id: 4, name: "Blue Backpack (Student Union)", category: "Bag", location: "Student Union near Gym", reported: "1 hour ago", imageUrl: "https://placehold.co/100x100/6b7280/ffffff?text=Bag" },
    { id: 5, name: "Physics Textbook", category: "Books", location: "Lost in Lecture Hall A", reported: "1 day ago", imageUrl: "https://placehold.co/100x100/6b7280/ffffff?text=Book" },
    { id: 6, name: "Silver Fountain Pen", category: "Stationery", location: "Found near Admin Block", reported: "4 days ago", imageUrl: "https://placehold.co/100x100/6b7280/ffffff?text=Pen" },
];

const MAROON = '#4A051D';
const ORANGE_ACCENT = '#FF8800';

// --- Navigation Bar Component ---
const Navbar = ({ onNavigate }) => (
    <nav className="bg-[${MAROON}] text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
                <div className="flex-shrink-0 flex items-center">
                    <span className="text-2xl font-bold tracking-wider">UniFind</span>
                </div>
                
                <div className="hidden md:flex space-x-4 items-center">
                    {['Home', 'Report Lost', 'Report Found', 'Support', 'FAQ'].map((item) => (
                        <button 
                            key={item} 
                            onClick={() => onNavigate(item)}
                            className="text-sm font-medium hover:text-orange-300 transition-colors py-2 px-3 rounded-md"
                        >
                            {item}
                        </button>
                    ))}
                    <button className="text-sm font-medium py-2 px-4 rounded-full bg-transparent border border-white hover:bg-white hover:text-gray-800 transition-all">
                        My Profile
                    </button>
                    <button className="bg-[${ORANGE_ACCENT}] text-white px-4 py-2 rounded-full text-sm font-semibold shadow-md hover:bg-orange-600 transition-colors">
                        Login
                    </button>
                    <Search className="w-5 h-5 cursor-pointer hover:text-orange-300 transition-colors" />
                </div>

                {/* Mobile Menu Button */}
                <button className="md:hidden">
                    <Menu className="w-6 h-6" />
                </button>
            </div>
        </div>
    </nav>
);

// --- Item Card Component ---
const ItemCard = ({ item }) => (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col">
        {/* Top Info Header (Mock User/Initials) */}
        <div className="flex items-center p-3 bg-gray-50 border-b border-gray-100">
            <div className="w-8 h-8 bg-purple-200 text-purple-800 rounded-full flex items-center justify-center font-bold text-sm mr-3">A</div>
            <div>
                <p className="text-gray-900 font-semibold text-sm leading-none">{item.name}</p>
                <p className="text-xs text-gray-500">{item.reported}</p>
            </div>
        </div>

        {/* Item Image and Details */}
        <div className="p-4 flex flex-col justify-between h-full">
            <div className="flex flex-col items-center mb-3">
                {/* Placeholder Image */}
                <img src={item.imageUrl} alt={item.name} className="w-24 h-24 object-contain mb-3 rounded-lg" />
                
                <h3 className="text-lg font-bold text-gray-900 text-center">{item.name}</h3>
                <p className="text-sm text-gray-500 text-center mt-1">
                    {item.location}
                </p>
            </div>

            {/* Footer Button */}
            <div className="mt-4 flex justify-end">
                <button className="text-xs font-semibold py-1 px-3 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors">
                    Contact
                </button>
            </div>
        </div>
    </div>
);

// --- Main Dashboard Component ---
const Dashboard = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredItems, setFilteredItems] = useState(mockItems);

    const handleSearch = (e) => {
        const term = e.target.value.toLowerCase();
        setSearchTerm(term);
        if (term === '') {
            setFilteredItems(mockItems);
        } else {
            const results = mockItems.filter(item =>
                item.name.toLowerCase().includes(term) ||
                item.category.toLowerCase().includes(term) ||
                item.location.toLowerCase().includes(term)
            );
            setFilteredItems(results);
        }
    };

    const handleNavigate = (page) => {
        // Placeholder for navigation logic
        console.log("Navigating to:", page);
    };
    
    // Gradient Background from your UI design (Faint green to faint yellow/pink)
    const gradientStyle = {
        background: 'linear-gradient(135deg, #f5f7fa 0%, #fefefe 50%, #fff7f7 100%)',
        minHeight: 'calc(100vh - 64px)'
    };

    return (
        <div className="min-h-screen font-inter">
            <style jsx global>{`
                /* Font Inter for clean look */
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap');
                body {
                    font-family: 'Inter', sans-serif;
                }
                .maroon-text {
                    color: ${MAROON};
                }
                .accent-bg {
                    background-color: ${ORANGE_ACCENT};
                }
                .report-btn {
                    background-color: #D64545; /* A subtle red/maroon-ish tone for the Report button */
                    color: white;
                    box-shadow: 0 4px 6px rgba(214, 69, 69, 0.3);
                    transition: background-color 0.2s, transform 0.1s;
                }
                .report-btn:hover {
                    background-color: #c03939;
                    transform: translateY(-1px);
                }
            `}</style>
            
            <Navbar onNavigate={handleNavigate} />

            <main className="py-10" style={gradientStyle}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    {/* Header and Search Bar */}
                    <div className="flex flex-col items-center mb-10">
                        <h1 className="text-4xl font-extrabold mb-8 text-center" style={{ color: MAROON }}>
                            Lost Items
                        </h1>

                        <div className="flex w-full max-w-4xl justify-center items-center space-x-4">
                            
                            {/* Search Input Container */}
                            <div className="relative flex-grow max-w-2xl">
                                <input
                                    type="text"
                                    placeholder="Search by Item Name..."
                                    value={searchTerm}
                                    onChange={handleSearch}
                                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-full shadow-lg focus:ring-2 focus:ring-[${ORANGE_ACCENT}] focus:border-[${ORANGE_ACCENT}] transition-all text-gray-700"
                                    style={{ borderColor: MAROON, borderWidth: '2px', backgroundColor: '#fff', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}
                                />
                                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                
                                {/* Filter Icon */}
                                <button className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-800 transition-colors">
                                    <Filter className="w-5 h-5" />
                                </button>
                            </div>
                            
                            {/* Report Button */}
                            <button 
                                onClick={() => handleNavigate('Report Lost')}
                                className="report-btn flex items-center py-3 px-6 rounded-xl font-bold text-lg whitespace-nowrap"
                            >
                                Report <Tag className="w-5 h-5 ml-2" />
                            </button>
                        </div>
                    </div>

                    {/* Item Card Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {filteredItems.length > 0 ? (
                            filteredItems.map(item => (
                                <ItemCard key={item.id} item={item} />
                            ))
                        ) : (
                            <p className="col-span-full text-center text-xl text-gray-500 py-10">
                                No items found matching "{searchTerm}".
                            </p>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Dashboard;
