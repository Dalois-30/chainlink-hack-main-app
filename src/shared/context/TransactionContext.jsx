import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { ethers } from "ethers"

import { contractABI, contractAddress } from '../../utils/constants';

export const TransactionContext = React.createContext();

const { ethereum } = window;

const getEtherumContract = async () => {
    // create provider
    const provider = new ethers.BrowserProvider(ethereum)

    // get connected account
    const signer = await provider.getSigner();

    // create a new transaction contract
    const transactionContract = new ethers.Contract(contractAddress, contractABI, signer)

    return transactionContract;
}


export const TransactionProvider = ({ children }) => {
    const [currentAccount, setCurrentAccount] = useState('');
    const [formData, setFormData] = useState({ addressTo: "", amount: "", keyword: "", message: "" });
    const [isLoading, setIsLoading] = useState(false);
    const [setTransactionCount] = useState(localStorage.getItem("transactionCount"));
    const [transactions, setTransactions] = useState([]);

    const handleChange = (e, name) => {
        setFormData((prevState) => ({
            ...prevState, [name]: e.target.value
        }));
    };

    const checkIfWalletIsConnected = async () => {
        try {
            if (!ethereum) {
                return alert("Please install Metamask");
            }
            const accounts = await ethereum.request({ method: "eth_accounts" });
            if (accounts.length) {
                setCurrentAccount(accounts[0]);
            } else {
                console.log("No account found");
            }
            console.log(accounts);
        } catch (error) {
            console.log(error);
            throw new Error("No ethereum object.");
        }
    };

    const connectWallet = async () => {
        try {
            if (!ethereum) {
                return alert("Please install Metamask");
            }
            const accounts = await ethereum.request({ method: "eth_requestAccounts" });
            setCurrentAccount(accounts[0]);
            return true
        } catch (error) {
            console.log(error);
            // throw new Error("No ethereum object.");
            return false
        }
    };

    const sendTransaction = async (assetSymb, amount, assetIdForMint) => {
        try {
          if (!ethereum) {
            return alert("Please install Metamask");
          }
          console.log("assetSymb", assetSymb);
          console.log("amount", amount);
          console.log("assetIdForMint", assetIdForMint);
          setIsLoading(true);
          const transactionContract = await getEtherumContract();
          console.log("transactionContract", transactionContract);
          const tx = await transactionContract.sendMintRequest('ASSER', ethers.parseEther(amount.toString()), assetIdForMint, currentAccount);
          console.log(`Loading - ${tx.hash}`);
          await tx.wait();
          setIsLoading(false);
          console.log("success", tx);

          window.location.reload();
        } catch (error) {
          console.log(error);
          throw new Error("No ethereum object.");
        }
      };

    useEffect(() => {
        checkIfWalletIsConnected();
    }, []);

    return (
        <TransactionContext.Provider value={{ connectWallet, currentAccount, formData, handleChange, sendTransaction, transactions, isLoading }}>
            {children}
        </TransactionContext.Provider>
    );
};

TransactionProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
