import { useEffect, useState } from "react";

const useFetchProducts = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    try {
      const response = await fetch("https://chainlink-backend.daltek.tech/products/get-all");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const { data } = await response.json();
      const formattedProducts = data.map(item => ({
        id: item.product.id,
        name: item.product.name,
        price: item.product.price,
        description: item.product.description,
        stock: item.product.stock,
        createdAt: item.product.created_at,
        updatedAt: item.product.updated_at,
        image: item.image
      }));
      setProducts(formattedProducts);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return { products, error };
};

export default useFetchProducts;
