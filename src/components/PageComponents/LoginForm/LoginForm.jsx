import Navbar from "../../UI/Navbar/Navbar";
import styles from "./LoginForm.module.scss";

import loginUtil from "../../../helpers/loginUtil";

const LoginForm = () => {
  async function loginHandler(event) {
    const result = await loginUtil(event); // Call login to server.

    if (result.error) {
      console.log(result.msg);
      return;
    }

    // Redirects user to home page.
    window.location.href = "/";
  }

  return (
    <div className={styles["page-container"]}>
      <Navbar />

      <div className={styles["form-container"]}>
        <form className={styles.form} onSubmit={loginHandler}>
          <div className="form-title">
            <h1>Log In</h1>
          </div>

          <div className={styles["form-group-container"]}>
            <div className={styles["form-group"]}>
              <label htmlFor="email">Email</label>
              <input type="text" name="email" />
            </div>

            <div className={styles["form-group"]}>
              <label htmlFor="password">Password</label>
              <input type="password" name="password" />
            </div>
          </div>

          <div className="form-submit">
            <button type="submit">Log In</button>
          </div>
        </form>
      </div>
      <div className={styles["account-create-container"]}>
        <a href="/signup">Create an account here</a>
      </div>
    </div>
  );
};

export default LoginForm;
