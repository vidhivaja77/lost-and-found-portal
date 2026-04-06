import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Inline SVG Icons (Replacing external libraries like lucide-react)
const SearchIcon = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>);
const FilterIcon = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>);
const MapPinIcon = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 21.7c-4.4-4.4-8-8.8-8-12.2a8 8 0 0 1 16 0c0 3.4-3.6 7.8-8 12.2z"></path><circle cx="12" cy="10" r="3"></circle></svg>);
const CalendarIcon = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>);
const UserIcon = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>);
const EyeIcon = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path><circle cx="12" cy="12" r="3"></circle></svg>);
const TagIcon = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.5 7.5a2 2 0 0 0-2-2H8.5L2 13l6.5 6.5h11a2 2 0 0 0 2-2V9.5a2 2 0 0 0-2-2Z"></path><circle cx="15.5" cy="11.5" r="1.5"></circle></svg>);
const ClockIcon = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>);


// Mock Data for demonstration
const mockItems = [
  {
    id: 1,
    title: "Blue Apple AirPods Pro (Case Only)",
    type: "Lost", 
    category: "Electronics",
    date: "2025-10-01",
    location: "Library Reading Room", 
    user: "user-alpha",
    status: "Pending Review", 
    imageUrl: "https://images.unsplash.com/photo-1585386959984-a41552231658?w=400&h=400&fit=crop&auto=format&q=60",
    details: "Lost during lunch hour. Has a distinctive blue silicone case."
  },
  {
    id: 2,
    title: "Black Leather Wallet",
    type: "Found", 
    category: "Accessories",
    date: "2025-09-28",
    location: "Cafeteria Entrance", 
    user: "user-beta",
    status: "Claimed", 
    imageUrl: "https://images.unsplash.com/photo-1541075211519-9f21c6c3d92e?w=400&h=400&fit=crop&auto=format&q=60",
    details: "Found on a table near the coffee counter. No ID inside."
  },
  {
    id: 3,
    title: "Biology Textbook",
    type: "Lost",
    category: "Books",
    date: "2025-10-02",
    location: "Lecture Hall 101", 
    user: "user-gamma",
    status: "Active", 
    imageUrl: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400&h=400&fit=crop&auto=format&q=60",
    details: "Heavy green textbook with a few sticky notes on page 50."
  },
  {
    id: 4,
    title: "Silver Keyring with Panda Charm",
    type: "Found",
    category: "Keys",
    date: "2025-09-30",
    location: "Main Gate", 
    user: "user-delta",
    status: "Active",
    imageUrl: "https://images.unsplash.com/photo-1518544801976-3e1883db2417?w=400&h=400&fit=crop&auto=format&q=60",
    details: "Two keys on a silver ring with a cute metal panda charm attached."
  }
];

// Helper component for item card details
const ItemDetail = ({ Icon, text, className }) => (
  <div className={`flex items-center text-sm ${className}`}>
    <Icon size={14} className="mr-1 opacity-70" />
    <span>{text}</span>
  </div>
);

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All'); // 'All', 'Lost', 'Found'
  const [filterCategory, setFilterCategory] = useState('All');
  
  const primaryColor = '#800000'; // Dark Maroon
  const accentColor = '#ff8c00'; // Orange

  // Filter logic
  const filteredItems = mockItems.filter(item => {
    // 1. Search term filter
    const searchMatch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        item.details.toLowerCase().includes(searchTerm.toLowerCase());

    // 2. Type filter ('Lost' or 'Found')
    const typeMatch = filterType === 'All' || item.type === filterType;

    // 3. Category filter
    const categoryMatch = filterCategory === 'All' || item.category === filterCategory;

    return searchMatch && typeMatch && categoryMatch;
  });

  const uniqueCategories = ['All', ...new Set(mockItems.map(item => item.category))];

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      
      {/* Search and Filter Section */}
      <div className="bg-white shadow-md py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-6" style={{ color: primaryColor }}>
            Lost & Found Items Dashboard
          </h1>
          
          {/* Search Bar */}
          <div className="flex mb-6 space-x-4">
            <div className="flex-grow relative">
              <input
                type="text"
                placeholder="Search by item name or description..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-opacity-50"
                style={{ borderColor: primaryColor, outline: 'none', focusRingColor: accentColor }}
              />
              <SearchIcon size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          {/* Filtering Options */}
          <div className="flex flex-wrap gap-4 text-sm items-center">
            <FilterIcon size={18} className="text-gray-600 flex-shrink-0" />
            <span className="font-semibold text-gray-700 flex-shrink-0">Filters:</span>
            
            {/* Type Filter (Lost/Found/All) */}
            <div className="flex space-x-2 flex-wrap">
              {['All', 'Lost', 'Found'].map(type => (
                <button
                  key={type}
                  onClick={() => setFilterType(type)}
                  className={`px-3 py-1 rounded-full font-medium transition duration-150 border text-sm ${
                    filterType === type 
                      ? 'text-white shadow-md' 
                      : 'text-gray-700 bg-gray-100 hover:bg-gray-200 border-gray-300'
                  }`}
                  style={{ 
                    backgroundColor: filterType === type ? primaryColor : undefined,
                    borderColor: filterType === type ? primaryColor : undefined,
                  }}
                >
                  {type}
                </button>
              ))}
            </div>

            {/* Category Filter */}
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-3 py-1 border border-gray-300 rounded-full bg-white text-gray-700 shadow-sm focus:border-orange-500 focus:ring-orange-500 text-sm"
              style={{ outline: 'none' }}
            >
              {uniqueCategories.map(cat => (
                <option key={cat} value={cat}>
                  Category: {cat}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Item Listing Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {filteredItems.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-600">No items found matching your criteria.</h2>
            <p className="text-gray-500 mt-2">Try adjusting your search or filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map(item => (
              <div 
                key={item.id} 
                className="bg-white rounded-xl shadow-xl overflow-hidden transform hover:scale-[1.02] transition duration-300 border-t-4"
                style={{ borderColor: item.type === 'Lost' ? primaryColor : accentColor }}
              >
                
                {/* Header and Image */}
                <div className="p-5 flex items-start space-x-4">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                    onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/100x100/D3D3D3/000000?text=Item"; }}
                  />
                  <div>
                    <span 
                      className={`text-xs font-bold uppercase px-2 py-1 rounded-full ${
                        item.type === 'Lost' 
                          ? 'bg-red-100 text-[#800000]' 
                          : 'bg-green-100 text-green-700'
                      }`}
                    >
                      {item.type === 'Lost' ? 'LOST' : 'FOUND'}
                    </span>
                    <h2 className="text-xl font-bold mt-1 text-gray-800 line-clamp-2">{item.title}</h2>
                  </div>
                </div>

                {/* Body Details */}
                <div className="px-5 pb-5 space-y-2 text-gray-600">
                  <ItemDetail Icon={TagIcon} text={`Category: ${item.category}`} />
                  <ItemDetail Icon={MapPinIcon} text={item.location} className="text-sm font-semibold" />
                  <ItemDetail Icon={CalendarIcon} text={`Date: ${item.date}`} />
                  <ItemDetail Icon={ClockIcon} text={`Status: ${item.status}`} className={item.status === 'Active' ? 'text-green-600' : 'text-gray-500'} />
                  <ItemDetail Icon={UserIcon} text={`Reported by: ${item.user}`} />
                </div>

                {/* Footer Button */}
                <div className="p-5 pt-0">
                  <Link 
                    to={`/item/${item.id}`} // Link to the Item Details page
                    className="w-full flex justify-center items-center py-2 text-white font-semibold rounded-lg transition duration-200 shadow-md hover:shadow-lg"
                    style={{ backgroundColor: accentColor }}
                  >
                    <EyeIcon size={18} className="mr-2" />
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
