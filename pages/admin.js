import { getAllMessages, createMessage } from "../lib/api";
import { useState, useEffect } from "react";
import styles from "../styles/admin.module.css";
import Messages from "../components/Messages";
import CreateForm from "../components/CreateForm";
import ProductManager from "../components/ProductManager";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function AdminPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status !== "loading") {
      if (status == "unauthenticated") {
        router.push("/");
      } else {
        if (session.user.name == "admin") {
          setLoading(false);
        } else {
          router.push("/");
        }
      }
    }
  }, [session, status, router]);

  return (
    <section className={styles.container}>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          <center>
            <h1>Admin Dashboard</h1>
          </center>
          <div className={styles.contentContainer}>
            <Messages />
            <ProductManager />
            <CreateForm />
          </div>{" "}
        </div>
      )}
    </section>
  );
}
