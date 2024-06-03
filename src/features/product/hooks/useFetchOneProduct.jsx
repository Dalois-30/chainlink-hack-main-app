import { useEffect, useState } from "react";

const API_TOKEN = import.meta.env.VITE_API_TOKEN;

const useFetchProductDetails = (productId) => {
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

  const fetchProductDetails = async () => {
    try {
      const response = await fetch(`https://chainlink-backend.daltek.tech/products/get-one/${productId}`, {
        headers: {
          'Authorization': `Bearer ${API_TOKEN}`
        }
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setProduct({
        id: data.product.id,
        name: data.product.name,
        price: data.product.price,
        description: data.product.description,
        stock: data.product.stock,
        createdAt: data.product.created_at,
        updatedAt: data.product.updated_at,
        image: data.image
      });
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    if (productId) {
      fetchProductDetails();
    }
  }, [productId]);

  return { product, error };
};

export default useFetchProductDetails;
