import styles from "../../styles/register.module.css";
import { register } from "../../lib/api";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

const defaultModel = { username: "", password: "" };

export default function RegisterPage() {
  const router = useRouter();
  const [user, setUser] = useState(defaultModel);
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    const target = e.target;
    const name = e.target.name;
    const value = target.value;
    setUser({
      ...user,
      [name]: value,
    });
    setError(false);
  };

  const handleSubmit = async () => {
    if (user.username.length > 3 && user.password.length > 3) {
      const response = await register(user);
      if (response.status === 500) {
        setError(true);
      } else {
        router.push("/auth/signIn");
      }
    } else {
      setError(true);
    }
  };

  return (
    <div className={styles.bg}>
      <center>
        <div className={styles.formContainer}>
          <form>
            <div className={styles.row}>
              <div className={styles.col}>
                <input
                  type="text"
                  name="username"
                  placeholder="Enter username..."
                  className={styles.input}
                  onChange={handleChange}
                  value={user.username}
                />
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.col}>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter password.."
                  className={styles.input}
                  onChange={handleChange}
                  value={user.password}
                />
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.col}></div>
            </div>
            <div className={styles.row}></div>
          </form>
          <div className={styles.row}>
            <button onClick={handleSubmit} className={styles.button}>
              Register
            </button>
          </div>
          {error && (
            <div className={styles.error}>
              Something went wrong. Check input and try again.
            </div>
          )}
        </div>
      </center>
    </div>
  );
}
