import { signOut, useSession, signIn } from "next-auth/react";
import styles from "../../styles/signOut.module.css";
import { useRouter } from "next/router";

export default function SignOutPage() {
  const router = useRouter();

  const handleClick = async () => {
    signOut();
    router.push("/");
  };

  return (
    <div className={styles.anotherContainer}>
      <div className={styles.container}>
        <button className={styles.button} onClick={handleClick}>
          Sign out
        </button>
      </div>
    </div>
  );
}
