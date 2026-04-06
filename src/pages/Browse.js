// src/pages/Browse.js
import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import "./Browse.css";

const SUGGESTED_ITEMS = [
  {
    id: "1",
    title: "Black Leather Wallet",
    location: "Library",
    reportedAgo: "2 hours ago",
    image:
      "https://images.unsplash.com/photo-1541075211519-9f21c6c3d92e?w=900&h=600&fit=crop&auto=format&q=60",
  },
  {
    id: "2",
    title: "White Wireless Earbuds",
    location: "Cafeteria",
    reportedAgo: "5 hours ago",
    image:
      "https://images.unsplash.com/photo-1585386959984-a41552231658?w=900&h=600&fit=crop&auto=format&q=60",
  },
  {
    id: "3",
    title: "White Keys with Red Lanyard",
    location: "Cafeteria",
    reportedAgo: "3 hours ago",
    image:
      "https://images.unsplash.com/photo-1518544801976-3e1883db2417?w=900&h=600&fit=crop&auto=format&q=60",
  },
  {
    id: "4",
    title: "Student Backpack near Gym",
    location: "Student Union",
    reportedAgo: "1 hour ago",
    image:
      "https://images.unsplash.com/photo-1592878747227-1b4d3aecc8f9?w=900&h=600&fit=crop&auto=format&q=60",
  },
];

const FOUND_ITEMS = [
  {
    id: "f1",
    title: "Grey Hoodie with Logo",
    location: "Student Center",
    reportedAgo: "30 minutes ago",
    image:
      "https://images.unsplash.com/photo-1520975916090-3105956dac38?w=900&h=600&fit=crop&auto=format&q=60",
  },
  {
    id: "f2",
    title: "Silver Water Bottle",
    location: "Gym Reception",
    reportedAgo: "1 hour ago",
    image:
      "https://images.unsplash.com/photo-1591369822099-ffa9132c3a2b?w=900&h=600&fit=crop&auto=format&q=60",
  },
  {
    id: "f3",
    title: "Calculator (Casio)",
    location: "Lecture Hall 2",
    reportedAgo: "4 hours ago",
    image:
      "https://images.unsplash.com/photo-1596495578068-9c15d6f0c0a2?w=900&h=600&fit=crop&auto=format&q=60",
  },
  {
    id: "f4",
    title: "Notebook with Blue Cover",
    location: "Library Desk",
    reportedAgo: "Yesterday",
    image:
      "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=900&h=600&fit=crop&auto=format&q=60",
  },
];

function ItemCard({ item }) {
  return (
    <div className="bl-card">
      <div className="bl-card-header">
        <div className="bl-avatar">A</div>
        <div className="bl-meta">
          <div className="bl-meta-title">Item Name</div>
          <div className="bl-meta-sub">Date</div>
        </div>
      </div>
      <div className="bl-card-media">
        <img 
          src={item.image} 
          alt={item.title} 
          loading="lazy"
          onError={(e) => { e.currentTarget.src = "https://placehold.co/600x400?text=Item"; }}
        />
      </div>
      <div className="bl-card-body">
        <div className="bl-title">{item.title}</div>
        <div className="bl-sub">Found at {item.location}</div>
        <div className="bl-sub">Reported {item.reportedAgo}</div>
      </div>
      <div className="bl-card-footer">
        <button className="bl-contact">Contact</button>
      </div>
    </div>
  );
}

export default function Browse() {
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState("lost");

  // Optional prefill via URL query: /browse?q=wallet
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const q = params.get("q");
    const tab = params.get("tab");
    if (q) setQuery(q);
    if (tab === "lost" || tab === "found") setActiveTab(tab);
  }, []);

  // Reflect tab changes in URL without reloading
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    params.set("tab", activeTab);
    const q = query.trim();
    if (q) { params.set("q", q); } else { params.delete("q"); }
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.replaceState({}, "", newUrl);
  }, [activeTab, query]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return SUGGESTED_ITEMS;
    return SUGGESTED_ITEMS.filter((i) => i.title.toLowerCase().includes(q));
  }, [query]);

  const filteredFound = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return FOUND_ITEMS;
    return FOUND_ITEMS.filter((i) => i.title.toLowerCase().includes(q));
  }, [query]);

  return (
    <section className="browse-wrap page">
      <div className="browse-header">
        <h1 className="browse-title">{activeTab === 'lost' ? 'Lost Items' : 'Found Items'}</h1>
        <div className="browse-actions">
          <div className="browse-search">
            <FaSearch className="browse-search-icon" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by Item Name..."
              aria-label="Search items"
            />
          </div>
          <Link to={`/add?type=${activeTab === 'lost' ? 'lost' : 'found'}`} className="browse-report">Report</Link>
        </div>
        <div className="tabs">
          <button className={`tab ${activeTab==='lost'?'active':''}`} onClick={()=>setActiveTab('lost')}>Lost Items</button>
          <button className={`tab ${activeTab==='found'?'active':''}`} onClick={()=>setActiveTab('found')}>Found Items</button>
        </div>
      </div>

      {activeTab === 'lost' ? (
        <>
          <div className="browse-grid">
            {filtered.map((item) => (
              <ItemCard key={item.id} item={item} />
            ))}
          </div>

          <div className="browse-rows">
            <h2 className="rows-title">Recent Reports</h2>
            <div className="rows-table" role="table" aria-label="Recent lost item reports">
              <div className="row header" role="row">
                <div className="cell" role="columnheader">Item</div>
                <div className="cell" role="columnheader">Location</div>
                <div className="cell" role="columnheader">Reported</div>
                <div className="cell" role="columnheader"></div>
              </div>
              {filtered.map((item) => (
                <div key={`row-${item.id}`} className="row" role="row">
                  <div className="cell item" role="cell">
                    <img 
                      className="thumb" 
                      src={item.image} 
                      alt={item.title} 
                      loading="lazy"
                      onError={(e) => { e.currentTarget.src = "https://placehold.co/140x110?text=Item"; }}
                    />
                    <div className="item-info">
                      <div className="item-title">{item.title}</div>
                      <div className="item-sub">#{item.id}</div>
                    </div>
                  </div>
                  <div className="cell" role="cell">{item.location}</div>
                  <div className="cell" role="cell">{item.reportedAgo}</div>
                  <div className="cell" role="cell">
                    <Link to={`/item/${item.id}`} className="row-action">View</Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="browse-grid">
            {filteredFound.map((item) => (
              <ItemCard key={item.id} item={item} />
            ))}
          </div>

          <div className="browse-rows">
            <h2 className="rows-title">Recently Found</h2>
            <div className="rows-table" role="table" aria-label="Recent found item reports">
              <div className="row header" role="row">
                <div className="cell" role="columnheader">Item</div>
                <div className="cell" role="columnheader">Location</div>
                <div className="cell" role="columnheader">Reported</div>
                <div className="cell" role="columnheader"></div>
              </div>
              {filteredFound.map((item) => (
                <div key={`row-${item.id}`} className="row" role="row">
                  <div className="cell item" role="cell">
                    <img 
                      className="thumb" 
                      src={item.image} 
                      alt={item.title} 
                      loading="lazy"
                      onError={(e) => { e.currentTarget.src = "https://placehold.co/140x110?text=Item"; }}
                    />
                    <div className="item-info">
                      <div className="item-title">{item.title}</div>
                      <div className="item-sub">#{item.id}</div>
                    </div>
                  </div>
                  <div className="cell" role="cell">{item.location}</div>
                  <div className="cell" role="cell">{item.reportedAgo}</div>
                  <div className="cell" role="cell">
                    <Link to={`/item/${item.id}`} className="row-action">View</Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Found Items Section */}
      <div className="browse-header" style={{ marginTop: 36 }}>
        <h1 className="browse-title">Found Items</h1>
        <div className="browse-actions">
          <Link to="/add?type=found" className="browse-report">Report</Link>
        </div>
      </div>

      <div className="browse-grid">
        {filteredFound.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>

      <div className="browse-rows">
        <h2 className="rows-title">Recently Found</h2>
        <div className="rows-table" role="table" aria-label="Recent found item reports">
          <div className="row header" role="row">
            <div className="cell" role="columnheader">Item</div>
            <div className="cell" role="columnheader">Location</div>
            <div className="cell" role="columnheader">Reported</div>
            <div className="cell" role="columnheader"></div>
          </div>
          {filteredFound.map((item) => (
            <div key={`row-${item.id}`} className="row" role="row">
              <div className="cell item" role="cell">
                <img 
                  className="thumb" 
                  src={item.image} 
                  alt={item.title} 
                  loading="lazy"
                  onError={(e) => { e.currentTarget.src = "https://placehold.co/140x110?text=Item"; }}
                />
                <div className="item-info">
                  <div className="item-title">{item.title}</div>
                  <div className="item-sub">#{item.id}</div>
                </div>
              </div>
              <div className="cell" role="cell">{item.location}</div>
              <div className="cell" role="cell">{item.reportedAgo}</div>
              <div className="cell" role="cell">
                <Link to={`/item/${item.id}`} className="row-action">View</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


