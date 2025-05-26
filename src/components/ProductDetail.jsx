import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ProductDetail.css";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetching product data from the API
  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Product not found");
        return res.json();
      })
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="loading">Loading product details...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="detail-container">
      <button className="btn" onClick={() => navigate("/")}>←  Back to Products</button>
      <div className="detail-card">
        <img src={product.image} alt={product.title} />
        <div className="detail-info">
          <p className="category"><b>Category:</b> {product.category}</p>
          <h2>{product.title}</h2>
          <p className="price">${product.price}</p>
          
          <p className="desc">{product.description}</p>
          <button className="btn" onClick={() => navigate("/")}>BUY NOW</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
