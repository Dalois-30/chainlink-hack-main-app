import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import 'tailwindcss/tailwind.css';
import { Navbar } from '../../../shared/components';
import { TransactionContext } from "../../../shared/context/TransactionContext";
import useFetchProducts from '../hooks/useFetch.jsx';

const ProductList = () => {
  const { connectWallet, currentAccount } = useContext(TransactionContext);

  const [searchText, setSearchText] = useState('');
  const navigate = useNavigate();
  
  const { products, error } = useFetchProducts();
  const [filteredProduct, setFilteredProduct] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      setFilteredProduct(products);
    }
  }, [products]);

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

  const viewDetails = (product) => {
    navigate(`/products/${product.id}`, { state: { product } });
  };

  return (
    <>
      <Navbar />

      {!currentAccount && (
        <div className="absolute w-full h-full flex items-center justify-center">
          <button
            type="button"
            onClick={connectWallet}
            className="bg-gradient-to-r from-blue-500 to-purple-500 py-2 px-7 w-100 flex flex-row justify-center items-center rounded-full cursor-pointer hover:from-blue-600 hover:to-purple-600"
          >
            <p className="text-white text-base font-semibold">Connect Wallet</p>
          </button>
        </div>
      )}

      {currentAccount && (
        <div className='m-5 p-10'>
          <div className="m-5 p-5">
            <div className="bg-white p-4 shadow rounded-lg">
              <h4 className="text-xl font-semibold mb-2">All Assets</h4>
              <p className="text-gray-500">Check a list of all assets of our system</p>
            </div>
          </div>

          <div className="m-5 p-5 flex justify-between items-center">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {error ? (
              <div className="col-span-full text-center py-4">Error: {error}</div>
            ) : products.length === 0 ? (
              <div className="col-span-full text-center py-4">Loading...</div>
            ) : (
              filteredProduct.map((product) => (
                <div key={product.id} className="bg-white shadow rounded-lg overflow-hidden">
                  <div style={{ minHeight: '200px' }}>
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-4">
                    <h5 className="text-lg font-semibold">{product.name}</h5>
                    <p className="text-gray-500">{product.description}</p>
                    <div className="text-sm text-gray-400 mt-2">
                      <p>Stock: {product.stock}</p>
                      <p>Created: {new Date(product.createdAt).toLocaleString('en-GB')}</p>
                      <p>Updated: {new Date(product.updatedAt).toLocaleString('en-GB')}</p>
                    </div>
                    <button
                      className="mt-4 bg-indigo-600 text-white py-2 px-4 rounded-full hover:bg-indigo-700"
                      onClick={() => viewDetails(product)}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))
            )}

          </div>
        </div>
      )}
    </>
  );
};

export default ProductList;
