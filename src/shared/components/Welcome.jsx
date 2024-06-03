import  { useContext } from "react"

import { SiEthereum } from 'react-icons/si'
import { BsInfoCircle } from 'react-icons/bs'

import { shortenAddress } from "../../utils/shortenAddress"

import { Loader, Navbar } from '.'

import { TransactionContext } from "../context/TransactionContext"


// eslint-disable-next-line react/prop-types
const Input = ({ placeholder, name, type, value, handleChange }) => (
  <input
    placeholder={placeholder}
    type={type}
    step="0.0001"
    value={value}
    onChange={(e) => handleChange(e, name)}
    className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism" />
)

const Welcome = () => {

  const { currentAccount, formData, handleChange, sendTransaction, isLoading } = useContext(TransactionContext)

  const handleSubmit = (e) => {
    const { addressTo, amount, keyword, message } = formData;

    e.preventDefault();
    if (!addressTo || !amount || !keyword || !message) return;

    sendTransaction()
  }
  return (
    <div className="flex w-full justify-center items-center">
      <div className="flex mf:flex-row flex-col items-start justify-between md:p-2 py-2 px-4">
      <Navbar/>
        
        <div className="flex flex-col flex-1 items-center justify-start w-full mf:mt-0 mt-2">
          <div className="p-3 flex justify-end items-start flex-col rounded-xl h-40 sm:w-72 w-full my-5 eth-card .white-glassmorphism ">
            <div className="flex justify-between flex-col w-full h-full">
              <div className="flex justify-between items-start">
                <div className="w-10 h-10 rounded-full border-2 border-white flex justify-center items-center">
                  <SiEthereum fontSize={21} color="#fff" />
                </div>
                <BsInfoCircle fontSize={17} color="#fff" />
              </div>
              <div>
                <p className="text-white font-light text-sm" >
                  {shortenAddress(currentAccount)}
                </p>
                <p className="text-white font-semibold text-lg mt-1 " >
                  Ethereum
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  )
}

export default Welcome