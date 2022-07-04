import React from "react";
import { useState, useEffect } from "react";
import { getAllProducts, getProductById } from "../../../lib/api";
import styles from "../../../styles/detailView.module.css";
import { useRouter } from "next/router";
import Image from "next/image";
import { FaCartPlus } from "react-icons/fa";
import { signOut, useSession, signIn } from "next-auth/react";

export default function DetailPage({ product }) {
  const router = useRouter();
  const { id } = router.query;
  const { data: session } = useSession();

  const handleClick = async (e) => {
    if (session && product) {
      let data = window.localStorage.getItem("cart");
      if (data === null) {
        data = [];
      } else {
        data = JSON.parse(data);
      }

      data = [...data, product.id];
      localStorage.setItem("cart", JSON.stringify(data));

      router.push("/cart");
    } else {
      router.push("/auth/signIn");
    }
  };

  return (
    product && (
      <section className={styles.container}>
        <center>
          <div className={styles.productContainer}>
            <h3 className={styles.shoeName}>{product.name}</h3>

            <h4 className={styles.price}>{product.price} CHF</h4>

            <Image
              className={styles.shoeImg}
              src={product.img}
              width={1244.444}
              height={700}
              alt="Background Image"
            ></Image>

            <div className={styles.buttonContainer}>
              {product.stock > 0 ? (
                <p className={styles.inStockText}>
                  {product.stock} pieces available
                </p>
              ) : (
                <p className={styles.inStockText} style={{ color: "#ba2f25" }}>
                  Currently not available
                </p>
              )}
              {product.stock > 0 ? (
                <button onClick={handleClick} className={styles.button}>
                  Add to Cart <FaCartPlus className={styles.icon} />
                </button>
              ) : (
                <button className={styles.button} disabled>
                  Add to Cart <FaCartPlus className={styles.icon} />
                </button>
              )}
            </div>
          </div>
        </center>
      </section>
    )
  );
}

export async function getServerSideProps(context) {
  const { params } = context;
  const { id } = params;
  const product = await getProductById(id);
  return { props: { product } };
}
