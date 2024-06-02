import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import 'tailwindcss/tailwind.css';
import { Navbar } from '../../../shared/components';

import { TransactionContext } from "../../../shared/context/TransactionContext"


const ProductDetail = () => {
  const { connectWallet, currentAccount } = useContext(TransactionContext)

  const { register, handleSubmit, formState: { errors } } = useForm();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [setSubmitting] = useState(false);
  //   const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    // Simuler le chargement du produit
    setTimeout(() => {
      setProduct({
        name: 'Example Product',
        description: 'This is an example product description.',
        price: '100',
        image: 'https://via.placeholder.com/600'
      });
      setLoading(false);
    }, 1000);
  }, [id]);

  const onSubmit = data => {
    setSubmitting(true);
    // Simuler l'envoi des données
    setTimeout(() => {
      console.log('Product updated', data);
      setSubmitting(false);
      //  navigate('/products');
    }, 2000);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className='p-10'>
      <Navbar/>

      {!currentAccount && (<div className="absolute w-full h-full flex items-center justify-center"><button
            type="button"
            onClick={connectWallet}
            className="bg-[#2952e3]  py-2 px-7 w-100 flex flex-row justify-center items-center rounded-full cursor-pointer hover:bg-[#2952e3]"
          >
            <p className="text-white text-base font-semibold">Connect Wallet</p>
          </button></div> )}
      {currentAccount && (

      <div className="flex justify-center p-10">
        <div className="w-full max-w-4xl">
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="flex">
              <div className="w-1/3" style={{ backgroundImage: `url(${product.image})`, backgroundSize: 'cover' }}>
              </div>
              <div className="w-2/3 p-6">
                <h6 className="text-lg font-semibold mb-4">Product Form</h6>
                <h5 className="text-gray-500 mb-6">Hello! Update product information here</h5>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Product Name</label>
                    <input
                      type="text"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                      placeholder="Product Name"
                      defaultValue={product.name}
                      {...register('name', { required: true })}
                      disabled
                    />
                    {errors.name && <span className="text-red-500 text-sm">This field is required</span>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                      placeholder="Description"
                      defaultValue={product.description}
                      {...register('description', { required: true })}
                      disabled
                    />
                    {errors.description && <span className="text-red-500 text-sm">This field is required</span>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Price Product</label>
                    <input
                      type="text"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                      placeholder="Product stock"
                      defaultValue={product.price}
                      {...register('price', { required: true })}
                      disabled
                    />
                    {errors.price && <span className="text-red-500 text-sm">This field is required</span>}
                  </div>
                  <div className="flex space-x-4">
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" >Mint</button>
                    <button type="submit" className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" >Redeem</button>
                    {/* <Link to="/products" className="btn btn-secondary">Cancel</Link> */}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>)}
    </div>
  );
};

export default ProductDetail;



