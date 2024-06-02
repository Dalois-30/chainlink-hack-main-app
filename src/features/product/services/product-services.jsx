import { useEffect, useState } from 'react';
import axios from 'axios';

const useProducts = (page, limit) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://chainlink-backend.daltek.tech/products/get-all`, {
          params: {
            page: page,
            limit: limit
          }
        });

        if (response.data.statusCode === 400) {
          setError(response.data.message);
          console.error("Error:", response.data.message);
        } else {
          setData(response.data.data);
          console.log("Success");
        }
      } catch (error) {
        if (!error.response) {
          setError("Impossible de se connecter, vérifiez votre connexion internet et réessayez!");
          console.error("Error: Impossible de se connecter, vérifiez votre connexion internet et réessayez!");
        } else {
          setError("Impossible de se connecter, vérifiez votre connexion internet et réessayez!");
          console.error("Error: Impossible de se connecter, vérifiez votre connexion internet et réessayez!");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page, limit]);

  return { data, loading, error };
};

// eslint-disable-next-line react/prop-types
const ProductsComponent = ({ page, limit }) => {
  const { data, loading, error } = useProducts(page, limit);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      {data ? data.map(product => (
        <div key={product.id}>
          <h2>{product.name}</h2>
          <p>{product.description}</p>
        </div>
      )) : <p>No products found</p>}
    </div>
  );
};

export default ProductsComponent;
