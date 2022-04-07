import { useState, useEffect } from 'react'
import AppAuthenticated from "./components/AppAuthenticated"

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Web3 = require("web3");

const App = () => {
  const [walletConnected, setWalletConnected] = useState(false);
  const [instruction, setInstruction] = useState("Waiting for connection with wallet...");

  useEffect(() => {
   
    const connectWallet = async () => {
      if(!window.ethereum)
        return;

      try {
        await window.ethereum.send('eth_requestAccounts');
        window.web3 = new Web3(window.ethereum);
      } catch (error) {
        setInstruction("Wallet connection denied, reload the page to try again.");
        return;
      }
      setInstruction("");
      setWalletConnected(true);
    };
    connectWallet();
  }, []);
  toast.error('"Metamask or other EIP-1102 / EIP-1193 compliant wallet not found."', {
    position: "bottom-left",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    });
  return (

  
    <div>
     

      {window.ethereum ?
        (walletConnected ?
          <AppAuthenticated/>
          : instruction)
        : <ToastContainer
        position="bottom-left"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        />
      }
    </div>
  )
}

export default App
