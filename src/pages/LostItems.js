// src/pages/LostItems.js
import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import "./Browse.css";
import { listItems } from "../api/client";

const PLACEHOLDER = "https://placehold.co/600x400?text=Item";

function ItemCard({ item }) {
  return (
    <div className="bl-card">
      <div className="bl-card-header">
        <div className="bl-avatar">A</div>
        <div className="bl-meta">
          <div className="bl-meta-title">Item Name</div>
          <div className="bl-meta-sub">{new Date(item.createdAt || Date.now()).toLocaleString()}</div>
        </div>
      </div>
      <div className="bl-card-media">
        <img src={item.imageUrl || PLACEHOLDER} alt={item.title} loading="lazy" onError={(e)=>{e.currentTarget.src=PLACEHOLDER;}} />
      </div>
      <div className="bl-card-body">
        <div className="bl-title">{item.title}</div>
        <div className="bl-sub">Lost at {item.location}</div>
      </div>
      <div className="bl-card-footer">
        <button className="bl-contact">Contact</button>
      </div>
    </div>
  );
}

export default function LostItems() {
  const [query, setQuery] = useState("");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const q = params.get("q");
    if (q) setQuery(q);
  }, []);

  useEffect(() => {
    let isCancelled = false;
    async function load() {
      setLoading(true);
      setError("");
      try {
        const data = await listItems({ type: "lost", q: query.trim() || undefined });
        if (!isCancelled) setItems(data);
      } catch (e) {
        if (!isCancelled) setError(e.message || "Failed to load items");
      } finally {
        if (!isCancelled) setLoading(false);
      }
    }
    load();
    return () => { isCancelled = true; };
  }, [query]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((i) => (i.title || "").toLowerCase().includes(q));
  }, [query, items]);

  return (
    <section className="browse-wrap page">
      <div className="browse-header">
        <h1 className="browse-title">Lost Items</h1>
        <div className="browse-actions">
          <div className="browse-search">
            <FaSearch className="browse-search-icon" />
            <input value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Search lost items..." aria-label="Search items" />
          </div>
          <Link to="/add?type=lost" className="browse-report">Report</Link>
        </div>
      </div>

      {error && <div style={{ color: 'red', marginBottom: 12 }}>{error}</div>}
      {loading && <div style={{ marginBottom: 12 }}>Loading...</div>}
      <div className="browse-grid">
        {filtered.map((item) => (<ItemCard key={item._id} item={item} />))}
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
            <div key={`row-${item._id}`} className="row" role="row">
              <div className="cell item" role="cell">
                <img className="thumb" src={item.imageUrl || "https://placehold.co/140x110?text=Item"} alt={item.title} loading="lazy" onError={(e)=>{e.currentTarget.src="https://placehold.co/140x110?text=Item";}} />
                <div className="item-info">
                  <div className="item-title">{item.title}</div>
                  <div className="item-sub">#{item._id?.slice(-6)}</div>
                </div>
              </div>
              <div className="cell" role="cell">{item.location}</div>
              <div className="cell" role="cell">{new Date(item.createdAt || Date.now()).toLocaleString()}</div>
              <div className="cell" role="cell">
                <Link to={`/item/${item._id}`} className="row-action">View</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}



