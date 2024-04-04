import styles from "./Login.module.css";
import { useEffect, useState } from "react";
import { useUserAuth } from "../components/contexts/UserAuthContext";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Message from "../components/Message";

export default function Login() {
  // PRE-FILL FOR DEV PURPOSES
  const [email, setEmail] = useState("jack@example.com");
  const [password, setPassword] = useState("qwerty");

  const { error, login, isAuthenticated } = useUserAuth();
  const navigate = useNavigate();

  function handleClick(e) {
    e.preventDefault();
    if (email && password) login(email, password);
  }

  useEffect(
    function () {
      if (isAuthenticated) {
        navigate("/app", { replace: true });
      }
    },
    [isAuthenticated, navigate]
  );

  return (
    <main className={styles.login}>
      {error && <Message message={error} />}
      <form className={styles.form}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <Button type="primary" onClick={handleClick}>
            Login
          </Button>
        </div>
      </form>
    </main>
  );
}
