import React from 'react';
import styles from './Home.module.css';
const Home = () => {
  return (
    <div className={styles.container}>
      <div className={styles.intro_container}>
        <div className={styles.intro_container_main}>
          <h1>What is a Lucky Draw?</h1>
          <p>
            A lucky draw is a type of lottery in which participants have the
            chance to win prizes by drawing numbered balls from a container. The
            winner is the person who draws the ball that corresponds to the
            winning number, which is determined by a random number generator.
          </p>
          <h1>How Does Blockchain technology Come into Play?</h1>
          <p>
            Blockchain technology can be used to power lucky draws in two ways:
            first, through digital tokens that are awarded to participants; and
            second, through smart contracts that automatically award prizes to
            winners. Both of these methods have advantages over traditional
            lottery systems.
          </p>
          <h1>Token-Based Lucky Draws:</h1>
          <p>
            With token-based lucky draws, participants purchase digital
            tokenswhich represent entries into the draw. These tokens can then
            be traded or sold on an online exchange, giving people the
            opportunity to increase their chances of winning by buying more
            tickets. The main advantage of this system is that it allows anyone
            anywhere in the world to participate in the draw, as long as they
            have access to the internet.
          </p>
          <h1>Smart Contract-Based Lucky Draws:</h1>
          <p>
            Smart contract-based lucky draws work similarly to token-based
            lotteries, but with one key difference: instead of purchasing
            tokens, winners are automatically paid out using cryptocurrencies .
            This eliminates the need for a third party such as a bank or payment
            processor, making transactions much faster and cheaper. It also
            ensures that all winners receive their prizes promptly and without
            hassle.
          </p>
        </div>
      </div>

      <div className={styles.image_container}>
        <img
          className={styles.image}
          src="images/undraw_playing_cards_cywn.png"
          alt="image"
        />
      </div>
    </div>
  );
};

export default Home;
