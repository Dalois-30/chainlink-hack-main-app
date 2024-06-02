import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'tailwindcss/tailwind.css';
import { Navbar } from '../../../shared/components';

import { TransactionContext } from "../../../shared/context/TransactionContext"

import axios from 'axios';

const useProducts = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://chainlink-backend.daltek.tech/products/get-all`, {
          params: {
            page: 0,
            limit: 1
          }
        });

        if (response.statusCode === 400) {
          setError(response.message);
          console.error("Error:", response.message);
        } else {
          setData(response.data);
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
  });

  return { data, loading, error };
};

const ProductList = () => {

  const { data, loading } = useProducts();
  
  const { connectWallet, currentAccount } = useContext(TransactionContext)
  const [products, setProducts] = useState([]);
  const [filteredProduct, setFilteredProduct] = useState([]);
  const [loadingIndicator, setLoadingIndicator] = useState(false);
  const [searchText, setSearchText] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Simuler le chargement des produits
    setLoadingIndicator(true);
    setTimeout(() => {
      const fetchedProducts = [
        {
          id: '1',
          name: 'Product 1',
          description: 'Description of Product 1',
          stock: 10,
          created_at: new Date(),
          updated_at: new Date(),
          image: 'https://via.placeholder.com/60'
        },
        {
          id: '2',
          name: 'Product 2',
          description: 'Description of Product 2',
          stock: 5,
          created_at: new Date(),
          updated_at: new Date(),
          image: 'https://via.placeholder.com/60'
        },
        {
          id: '3',
          name: 'Product 3',
          description: 'Description of Product 3',
          stock: 5,
          created_at: new Date(),
          updated_at: new Date(),
          image: 'https://via.placeholder.com/60'
        },
        {
          id: '4',
          name: 'Product 4',
          description: 'Description of Product 4',
          stock: 10,
          created_at: new Date(),
          updated_at: new Date(),
          image: 'https://via.placeholder.com/60'
        },
        // Ajoutez plus de produits si nécessaire
      ];
      setProducts(fetchedProducts);
      setFilteredProduct(fetchedProducts);
      setLoadingIndicator(false);
    }, 2000); // Simuler un délai de chargement
  }, []);

  const updateFilter = () => {
    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredProduct(filtered);
  };

  const clearSearch = () => {
    setSearchText('');
    setFilteredProduct(products);
  };

  const viewDetails = (id) => {
    console.log(id);
    navigate(`/products/${id}`);
  };

  return (
    <>
      <Navbar />

      {!currentAccount && (<div className="absolute w-full h-full flex items-center justify-center"><button
            type="button"
            onClick={connectWallet}
            className="bg-[#2952e3]  py-2 px-7 w-100 flex flex-row justify-center items-center rounded-full cursor-pointer hover:bg-[#2952e3]"
          >
            <p className="text-white text-base font-semibold">Connect Wallet</p>
          </button></div>)}
      {currentAccount && (<div className='m-5 p-10'>


        <div className="m-5 p-5 ">
          <div className="bg-white p-4 shadow rounded-lg">
            <h4 className="text-xl font-semibold mb-2">All Assets</h4>
            <p className="text-gray-500">Check a list of all assets of our system</p>
          </div>
        </div>

        <div className="m-5 p-5  flex justify-between items-center">
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                className="form-input w-full py-2 px-4 border rounded-md"
                placeholder="Search"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onKeyUp={updateFilter}
              />
              <button
                className="absolute right-2 top-2 text-gray-500 hover:text-gray-700"
                onClick={clearSearch}
              >
                Clear
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white m-5 p-5 shadow rounded-lg">
          <h6 className="text-lg font-semibold mb-4">Assets</h6>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Asset Picture</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Id</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Update</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td colSpan="8" className="text-center py-4">Loading...</td>
                  </tr>
                ) : (
                  data.map((product) => (
                    <tr key={product?.product?.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <img src={product?.image} alt="Profile" className="w-16 h-16 rounded-full" />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Link to={`/products/${product?.product?.id}`} className="text-indigo-600 hover:underline">
                          {product?.product?.id.slice(0, 8)}
                        </Link>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">{product?.product?.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{product?.product?.description}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{product?.product?.stock}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{new Date(product?.product?.created_at).toLocaleString('en-GB')}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{new Date(product?.product?.updated_at).toLocaleString('en-GB')}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          className="text-indigo-600 hover:text-indigo-900"
                          onClick={() => viewDetails(product?.product?.id)}
                        >
                          <i className="fas fa-eye"></i>Voir
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>)}
    </>

  );
};

export default ProductList;
