import { useState, useContext } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import 'tailwindcss/tailwind.css';
import { Navbar } from '../../../shared/components';
import { TransactionContext } from "../../../shared/context/TransactionContext";
import ClipLoader from "react-spinners/ClipLoader";

const ProductDetail = () => {
  const { connectWallet, currentAccount, sendTransaction, isLoading } = useContext(TransactionContext);
  const { id } = useParams();
  const location = useLocation();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const product = location.state?.product;

  const onSubmit = async (data) => {
    try {
      await sendTransaction("ASSET", data.quantity, product.id);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  if (!product) return <div>Error: No product data</div>;

  return (
    <div className="p-10 min-h-screen bg-gray-100">
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
        <div className="flex justify-center p-10">
          <div className="w-full max-w-4xl">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <div className="flex">
                <div className="w-1/3 bg-cover" style={{ backgroundImage: `url(${product.image})` }}></div>
                <div className="w-2/3 p-8">
                  <h1 className="text-3xl font-semibold mb-2">{product.name}</h1>
                  <p className="text-gray-600 mb-4">{product.description}</p>
                  <p className="text-lg font-semibold mb-4">Price: {product.price} USDT</p>

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Quantity to Mint</label>
                      <input
                        type="number"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        placeholder="Quantity"
                        {...register('quantity', { required: true, min: 1 })}
                      />
                      {errors.quantity && <span className="text-red-500 text-sm">This field is required and must be at least 1</span>}
                    </div>
                    <div className="flex space-x-4">
                      <button type="submit" className="bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white font-bold py-2 px-4 rounded-full" disabled={isLoading}>
                        {isLoading ? <ClipLoader size={20} color={'#ffffff'} /> : 'Mint'}
                      </button>
                      <button type="submit" className="bg-gradient-to-r from-red-400 to-red-600 hover:from-red-500 hover:to-red-700 text-white font-bold py-2 px-4 rounded-full">Redeem</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
