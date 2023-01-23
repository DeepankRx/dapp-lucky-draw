import React, { useState, useEffect } from 'react';
import styles from './Players.module.css';
import modalStyles from '../Manager/Manager.module.css';
import axios from 'axios';
import { toast } from 'react-toastify';
const Players = ({ state, address }) => {
  const [account, setAccount] = useState('No account connected');
  const [registeredPlayers, setRegisteredPlayers] = useState([]);
  const [reload, setReload] = useState(false);
  const [arr, setArr] = useState([]);
  const [user, setUser] = useState({});
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
  const reloadEffect = () => {
    setReload(!reload);
  };
  const setAccountListener = (provider) => {
    provider.on('accountsChanged', (accounts) => {
      setAccount(accounts[0]);
    });
  };
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const AccountModal = () => {
    const [file, setFile] = useState();
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const addUser = async () => {
      if (name === '' || phoneNumber === '' || email === '' || address === '') {
        toast.error('Please fill in all fields');
        return;
      }
      const formData = new FormData();
      formData.append('image', file);
      formData.append('name', name);
      formData.append('phoneNumber', phoneNumber);
      formData.append('email', email);
      formData.append('address', address);
      formData.append('walletAddress', account);
      try {
        await axios.post('http://localhost:5000/addUser', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        toast.success('User added successfully');
        reloadEffect();
      } catch (error) {
        toast.error(error.message);
      }
      setShowModal(false);
    };

    return (
      <div className={modalStyles.account_modal}>
        <div className={modalStyles.account_modal_content}>
          <h1>Please Enter Your Details Before Buying Tickets</h1>
          <input
            className={modalStyles.modal_input}
            type="text"
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className={modalStyles.modal_input}
            filename={file}
            onChange={(e) => setFile(e.target.files[0])}
            type="file"
            accept="image/*"
          ></input>
          <input
            className={modalStyles.modal_input}
            type="number"
            placeholder="Phone Number"
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <input
            className={modalStyles.modal_input}
            type="text"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className={modalStyles.modal_input}
            type="text"
            placeholder="Address"
            onChange={(e) => setAddress(e.target.value)}
          />

          <input
            className={modalStyles.modal_input}
            type="text"
            placeholder="Wallet Address"
            value={account}
            readOnly
          />
          <button
            style={{
              backgroundColor: 'blue',
            }}
            onClick={addUser}
          >
            Register
          </button>
        </div>
      </div>
    );
  };

  useEffect(() => {
    const getAccount = async () => {
      const { web3 } = state;
      const accounts = await web3.eth.getAccounts();
      setAccountListener(web3.givenProvider);
      setAccount(accounts[0]);
      try {
        const response = await axios.get(
          `http://localhost:5000/getAUser/${accounts[0]}`
        );
        setUser(response?.data?.user);
      } catch (err) {
        if (err.response.status === 404) {
          toast.error('Please register before buying tickets');
          setShowModal(true);
        } else console.log(err.response.data.message);
      }
    };
    state.web3 && getAccount();
    const getRegisteredPlayers = async () => {
      const { contract } = state;
      const players = await contract.methods.allPlayers().call();

      const registeredPlayers = await Promise.all(
        players.map(async (player) => {
          return player;
        })
      );
      setRegisteredPlayers(registeredPlayers);

      var count = {};
      registeredPlayers.forEach(function (i) {
        count[i] = (count[i] || 0) + 1;
      });

    };
    state.web3 && getRegisteredPlayers();
  }, [state, state.web3, reload]);
  const sendEtherToContract = async () => {
    //check if user is registered
    if (user?.walletAddress !== account) {
      toast.error('Please register before buying tickets');
      setShowModal(true);
      reloadEffect();
      return;
    }

    const { web3 } = state;
    const accounts = await web3.eth.getAccounts();
    const accountAddress = accounts[0];
    const value = web3.utils.toWei('1', 'ether');
    const hash = await web3.eth.sendTransaction({
      from: accountAddress,
      to: address,
      value: value,
    });
    web3.eth.getTransactionReceipt(hash.transactionHash, (err, receipt) => {
      if (err) {
      } else {
        reloadEffect();
      }
    });
  };

  const ProfileModal = ({ user }) => {
    return (
      <div className={modalStyles.account_modal}>
        <div className={modalStyles.account_modal_content}>
          <h1>Profile</h1>
          <img
            src={`${user?.profileImage}`}
            alt="profile"
            style={{ width: '100px', height: '100px',
              borderRadius: '50%',
              padding:'5px',
              border:'2px dashed #000'
             }}
          />
          <input
            className={modalStyles.modal_input}
            type="text"
            placeholder="Name"
            value={user?.name}
            readOnly
          />
          <input
            className={modalStyles.modal_input}
            type="number"
            placeholder="Phone Number"
            value={user?.phoneNumber}
            readOnly
          />
          <input
            className={modalStyles.modal_input}
            type="text"
            placeholder="Email"
            value={user?.email}
            readOnly
          />
          <input
            className={modalStyles.modal_input}
            type="text"
            placeholder="Address"
            value={user?.address}
            readOnly
          />
          <input
            className={modalStyles.modal_input}
            type="text"
            placeholder="Wallet Address"
            value={user?.walletAddress}
            readOnly
          />
          <button
            style={{
              backgroundColor: 'red',
            }}
            onClick={() => setShowProfileModal(false)}
          >
            Close
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className={styles.container}>
      {showModal && <AccountModal />}
      <div className={styles.box}>
        <div className={styles.box_border}>
          <div className={styles.box_border_left}>
            <img src="images/undraw_Profile_re_4a55.png" alt="contract" />
          </div>
          <div className={styles.box_border_right}>
            <h1>View Profile</h1>
            <button
              onClick={() => {
                getUserByWalletAddress(account);
                setShowProfileModal(true);
              }}
            >
              Click Here
            </button>
            {showProfileModal && <ProfileModal user={user} />}
          </div>
        </div>
      </div>
      <div className={styles.box}>
        <div className={styles.box_border}>
          <div className={styles.box_border_left}>
            <h1>Contract address</h1>
            <p>{address}</p>
          </div>
          <div className={styles.box_border_right}>
            <img src="images/undraw_Contract_re_ves9.png" alt="contract" />
          </div>
        </div>
      </div>
      <div className={styles.box}>
        <div className={styles.box_border}>
          <div className={styles.box_border_left}>
            <img src="images/undraw_Account_re_o7id.png" alt="contract" />
          </div>
          <div className={styles.box_border_right}>
            <h1>Connected account</h1>
            <p>{account}</p>
          </div>
        </div>
      </div>
      <div className={styles.box} id="buyticket">
        <div className={styles.box_border}>
          <div className={styles.box_border_left}>
            <h1>Players have to pay 1 ether to enter the lottery</h1>
            <div className={styles.buttonContainer}>
              <img src="https://upload.wikimedia.org/wikipedia/commons/0/05/Ethereum_logo_2014.svg" />
              <button className={styles.button} onClick={sendEtherToContract}>
                Buy Lottery Ticket
              </button>
            </div>
          </div>
          <div className={styles.box_border_right}>
            <img src="images/undraw_Savings_re_eq4w.png" alt="contract" />
          </div>
        </div>
      </div>

      <div className={styles.box}>
        <div className={styles.box_border}>
          <div className={styles.box_border_left}>
            <img src="images/undraw_conference_call_b0w6.png" alt="contract" />
          </div>
          <div className={styles.box_border_right}>
            <h1>Registered players</h1>
            {arr.length > 0 ? (
              arr.map((player, index) => {
                return (
                  <div
                    className={styles.player + ' ' + styles.box_border_left}
                    key={index}
                  >
                    <p>
                      {player.address} - {player.count} ticket(s)
                    </p>

                    <button
                      onClick={() => {
                        getUserByWalletAddress(player.address);
                        setShowProfileModal(true);
                      }}
                    >
                      Show Profile
                    </button>
                  </div>
                );
              })
            ) : (
              <p>No players registered yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Players;
