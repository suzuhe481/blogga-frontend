import Navbar from "../../UI/Navbar/Navbar";

import styles from "./Home.module.scss";

const Home = () => {
  return (
    <>
      <Navbar />
      <div className={styles.home}>
        <h1>Links</h1>
        <a href="">Sign Up</a>
        <br />
        <a href="/login">Log in</a>
        <br />
        <a href="/search">All Authors</a>
        <br />
        <a href="/test">Test page for fetching data</a>
      </div>
    </>
  );
};

export default Home;
