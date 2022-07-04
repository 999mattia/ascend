import { useState, useEffect } from "react";
import React from "react";
import Link from "next/link";
import styles from "../styles/checkout.module.css";
import { getProductById, checkOut } from "../lib/api";
import { useRouter } from "next/router";

export default function CheckoutPage() {
  const [products, setProducts] = useState([]);
  const [data, setData] = useState();
  const router = useRouter();

  useEffect(() => {
    const loadPage = async () => {
      setData(JSON.parse(window.localStorage.getItem("cart")));
    };
    loadPage();
  }, []);

  useEffect(() => {
    if (!data) return;
    async function loadPage() {
      let newProducts = [];
      for (let i = 0; i < data.length; i++) {
        const response = await getProductById(data[i]);
        newProducts = [...newProducts, response];
      }
      setProducts(newProducts);
    }
    loadPage();
  }, [data]);

  const handleClick = async () => {
    await checkOut(products);
    localStorage.removeItem("cart");
    router.push("/");
  };

  return (
    <section className={styles.container}>
      <center>
        <h1 className={styles.title}>Checkout</h1>
        <h2>
          This website is for educational purposes only, you will not receive
          anything
        </h2>
        <button onClick={handleClick}>Buy</button>
      </center>
    </section>
  );
}
