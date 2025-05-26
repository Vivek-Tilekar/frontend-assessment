import React, { useEffect, useState } from "react";
import "./ProductList.css";
import { Link } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  

  // Fetching data from the API
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => {
        if (!res.ok) throw new Error("Network error");
        return res.json();
      })
      .then((data) => {
        setProducts(data);
        setFiltered(data);
        const uniqueCategories = ["All", ...new Set(data.map((item) => item.category))];
        setCategories(uniqueCategories);
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to load products. Please try again.");
      })
      .finally(() => setLoading(false));
  }, []);

  // Search and category selection control
  useEffect(() => {
    let result = products;

    if (selectedCategory !== "All") {
      result = result.filter((item) => item.category === selectedCategory);
    }

    if (search.trim() !== "") {
      result = result.filter((item) =>
        item.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFiltered(result);
  }, [search, selectedCategory, products]);

  if (loading) return <p className="loading">Loading products...</p>;

  return (
    <div className="container">
      <h2>New Products</h2>
      <div className="controls">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select onChange={(e) => setSelectedCategory(e.target.value)} value={selectedCategory}>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div className="product-grid">
        {filtered.map((product) => (
          <Link to={`/product/${product.id}`} className="product-card-link" key={product.id}>
            <div className="product-card">
                
                <img src={product.image} alt={product.title} />
                <div className="category">{product.category}</div>
                <h3>{product.title}</h3>
                <p>${product.price}</p>
                
                <button className="btn btn-buy"><i className="fal fa-shopping-cart cart"></i></button>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
