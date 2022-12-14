import React, { useState, useEffect } from 'react';
import styles from './Manager.module.css';
import { toast } from 'react-toastify';
import axios from 'axios';
const Manager = ({ state }) => {
  const [account, setAccount] = useState('');
  const [contractBalance, setContractBalance] = useState(0);
  const [lotteryWinner, setLotteryWinner] = useState('No winner yet');
  const [showModal, setShowModal] = useState(false);
  const [manager, setManager] = useState('');
  const [user, setUser] = useState({});
  const setAccountListener = (provider) => {
    provider.on('accountsChanged', (accounts) => {
      setAccount(accounts[0]);
    });
  };
  const getUserByWalletAddress = async (walletAddress) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/getAUser/${walletAddress}`
      );
      setUser(res.data.user);
    } catch (error) {
      toast.error('Error getting user');
    }
  };
  useEffect(() => {
    const getAccount = async () => {
      const { web3, contract } = state;
      const accounts = await web3.eth.getAccounts();
      setAccountListener(web3.givenProvider);
      setAccount(accounts[0]);
      const getManager = await contract.methods.manager().call();
      setManager(getManager);

      manager.length > 0 && getUserByWalletAddress(manager);
    };
    state.web3 && getAccount();
  }, [state, state.web3, manager]);
  const getContractBalance = async () => {
    const { contract } = state;
    try {
      const balance = await contract.methods.getBalance().call({
        from: account,
      });

      const etherBalance = await state.web3.utils.fromWei(balance, 'ether');
      toast.success('Contract balance fetched successfully');
      setContractBalance(etherBalance);
    } catch (error) {
      setContractBalance('You are not the manager');
      toast.error("You don't have permission to do this");
    }
  };

  const getLotteryWinner = async () => {
    const { contract } = state;
    try {
      if (manager !== account) {
        setLotteryWinner('You are not the managers');
        toast.error("You don't have permission to do this");
        return;
      }

      const players = await contract.methods.allPlayers().call();

      if (players.length < 3) {
        setLotteryWinner('Not enough tickets sold');
        toast.error('Must have at least 3 tickets to pick a winner');
        return;
      }
      const amount = await contract.methods.getBalance().call({
        from: account,
      });
      const prizeAmount = await state.web3.utils.fromWei(amount, 'ether');
      await contract.methods.pickWinner().send({
        from: account,
      });
      const lotteryWinner = await contract.methods.winner().call();
      // setLotteryWinner(lotteryWinner);
      getUserByWalletAddress(lotteryWinner);
      setShowModal(true);
      await axios.post('http://localhost:5000/addWinner', {
        walletAddress: lotteryWinner,
        prizeAmount,
      });
      toast.success('Lottery winner picked successfully');
    } catch (error) {
      if (error.message.includes('not manager')) {
        setLotteryWinner('You are not the manager');
        toast.error('You are not the manager');
      }
      if (error.message.includes('not enough players')) {
        setLotteryWinner('Not enough players');
        toast.error('Must have at least 3 tickets to pick a winner');
      } else {
        setLotteryWinner('Something went wrong');
        toast.error(error.message);
      }
    }
  };
  const ProfileModal = ({ user }) => {
    return (
      <div className={styles.account_modal}>
        <div className={styles.account_modal_content}>
          <h1 className={styles.h1}>Profile</h1>
          <input
            className={styles.modal_input}
            type="text"
            placeholder="Name"
            value={user?.name}
            readOnly
          />
          <input
            className={styles.modal_input}
            type="number"
            placeholder="Phone Number"
            value={user?.phoneNumber}
            readOnly
          />
          <input
            className={styles.modal_input}
            type="text"
            placeholder="Email"
            value={user?.email}
            readOnly
          />
          <input
            className={styles.modal_input}
            type="text"
            placeholder="Address"
            value={user?.address}
            readOnly
          />
          <input
            className={styles.modal_input}
            type="text"
            placeholder="Wallet Address"
            value={user?.walletAddress}
            readOnly
          />
          <button
            style={{
              backgroundColor: 'red',
            }}
            onClick={() => setShowModal(false)}
          >
            Close
          </button>
        </div>
      </div>
    );
  };
  return (
    <div className={styles.container}>
      <div className={styles.left_container}>
        <div className={styles.left_container_main}>
          <h1 className={styles.h1}>Contract Balance</h1>
          <p>
            {contractBalance}
            {isNaN(contractBalance) ? '' : ' ETH'}
          </p>
          <div className={styles.buttonContainer}>
            <button onClick={getContractBalance}>View Contract Balance</button>
            <button onClick={() => setShowModal(true)}>View Manager</button>
          </div>
          <img src="images/undraw_Ethereum_re_0m68.png" alt="image" />
        </div>
      </div>
      <div className={styles.left_container}>
        <div className={styles.left_container_main}>
          <h1 className={styles.h1}>Lottery Winner</h1>
          <p
            style={{
              wordBreak: 'break-all',
            }}
          >
            {lotteryWinner}
          </p>
          <button onClick={getLotteryWinner}>Pick Winner</button>

          <img src="images/undraw_Winners_re_wr1l.png" alt="image" />
        </div>
      </div>
      {showModal && <ProfileModal user={user} />}
    </div>
  );
};

export default Manager;
