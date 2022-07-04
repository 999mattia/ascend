import { useState } from "react";
import { signIn, getCsrfToken } from "next-auth/react";
import { useRouter } from "next/router";
import styles from "../../styles/signIn.module.css";
import Link from "next/link";

const defaultModel = { username: "", password: "" };

export default function SignInPage({ csrfToken }) {
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
    const res = await signIn("credentials", {
      redirect: false,
      username: user.username,
      password: user.password,
    });
    if (res.status === 200) {
      router.push("/");
    } else {
      if (res.status === 401) {
        setUser(defaultModel);
        setError(true);
      }
    }
  };

  return (
    <div className={styles.bg}>
      <center>
        <div className={styles.formContainer}>
          <form>
            <div>
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
            <div>
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
            <div>
              <div className={styles.col}></div>
            </div>
          </form>
          <div>
            <button className={styles.button} onClick={handleSubmit}>
              Sign in
            </button>
          </div>
          <p style={{ color: "#edf5e1", marginTop: "1em" }}>
            Not signed in?
            <Link href="/auth/register" passHref>
              <a className={styles.link}>Register here</a>
            </Link>
          </p>
          {error && (
            <div className={styles.error}>
              Invalid Credentials. Check input and try again.
            </div>
          )}
        </div>
      </center>
    </div>
  );
}

export async function getServerSideProps(context) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
}
