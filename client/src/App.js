import React, { useEffect, useState } from 'react';
import getWeb3 from './getWeb3';
import Lottery from './contracts/Lottery.json';
import Manager from './components/Manager/Manager';
import Players from './components/Players/Players';
import { Route } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './components/Home/Home';
import Winners from './components/Winners/Winners';
const App = () => {
  const [state, setState] = useState({
    web3: null,
    contract: null,
  });
  const [address, setAddress] = useState(null);
  useEffect(() => {
    const init = async () => {
      try {
        const web3 = await getWeb3();
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = Lottery.networks[networkId];
        const instance = new web3.eth.Contract(
          Lottery.abi,
          deployedNetwork && deployedNetwork.address
        );

        setState({ web3, contract: instance });
        setAddress(deployedNetwork.address);

      } catch (error) {
        alert(
          `Failed to load web3, accounts, or contract. Check console for details.`
        );
        console.error(error);
      }
    };
    init();
  }, []);
  return (
    <div>
      <NavBar />
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/manager">
        <Manager state={state} />
      </Route>
      <Route path="/players">
        <Players state={state} address={address} />
      </Route>
      <Route path="/winners">
        <Winners />
      </Route>
      <ToastContainer />
    </div>
  );
};

export default App;
