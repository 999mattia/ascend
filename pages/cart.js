import React from "react";
import { getProductById } from "../lib/api";
import { useState, useEffect } from "react";
import styles from "../styles/cart.module.css";
import { MdDelete } from "react-icons/md";
import Link from "next/link";

export default function CartPage() {
  const [products, setProducts] = useState();
  const [data, setData] = useState();

  useEffect(() => {
    const newData = window.localStorage.getItem("cart");
    if (!newData) {
      window.localStorage.setItem("cart", []);
      setData([]);
    } else {
      setData(JSON.parse(newData));
    }
  }, []);

  useEffect(() => {
    if (!products) return;
    const newArray = products.map((item) => item.id);
    window.localStorage.setItem("cart", JSON.stringify(newArray));
  }, [products]);

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

  function calculateTotal() {
    let total = 0;
    products.forEach((product) => {
      total += product.price;
    });
    return `${total} CHF`;
  }

  function deleteItem(id) {
    let first = true;
    let newArray = products.filter((item) => {
      let result = item.id !== id || !first;
      if (first) first = item.id !== id;
      return result;
    });
    setProducts(newArray);
  }

  return (
    products && (
      <section className={styles.container}>
        <center>
          <h1 className={styles.title}>Shopping Cart</h1>
        </center>
        {products.length === 0 && (
          <center>
            <div className={styles.emptyCart}>
              <p className={styles.emptyCartText}>Shopping Cart is Empty.</p>
              <p className={styles.emptyCartText}>
                {" "}
                Go and add some Products to the Cart!
              </p>
              <Link href="/products" passHref>
                <button className={styles.emptyCartButton}>
                  <a className={styles.emptyCartLink}>Let's go!</a>
                </button>
              </Link>
            </div>
          </center>
        )}
        <div className={styles.cartContainer}>
          {products.map((product) => {
            return (
              <center key={product.id}>
                <div className={styles.productContainer}>
                  <div className={styles.infoContainer}>
                    <img className={styles.img} src={product.img}></img>
                    <p className={styles.name}>{product.name}</p>
                  </div>
                  <div className={styles.containerPriceDelete}>
                    <p className={styles.price}>{product.price} CHF</p>
                    <button
                      onClick={() => deleteItem(product.id)}
                      className={styles.deleteButton}
                    >
                      <MdDelete className={styles.icon}></MdDelete>
                    </button>
                  </div>
                </div>
              </center>
            );
          })}
          <center>
            <div className={styles.totalContainer}>
              <div style={{ display: "flex" }}>
                <p style={{ marginRight: "1em", fontSize: "1.5em" }}>Total:</p>
                <p style={{ fontSize: "1.5em" }}>{calculateTotal()}</p>
              </div>

              {products.length === 0 ? (
                <Link href={`/checkout`} passhref>
                  <button disabled className={styles.checkoutButton}>
                    Checkout
                  </button>
                </Link>
              ) : (
                <Link href={`/checkout`} passhref>
                  <button className={styles.checkoutButton}>Checkout</button>
                </Link>
              )}
            </div>
          </center>
        </div>
      </section>
    )
  );
}
