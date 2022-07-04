import React from "react";
import { useEffect, useState } from "react";
import styles from "../styles/Post.module.css";
import Link from "next/link";

export default function Post({ id, name, imgURL, price }) {
  return (
    <Link href={`http://localhost:3000/products/${id}`} passHref key={id}>
      <div className={styles.container} style={{ cursor: "pointer" }}>
        <img className={styles.img} src={imgURL}></img>
        <h3 className={styles.productName}>{name}</h3>
        {price && <p className={styles.price}>{price} CHF</p>}
      </div>
    </Link>
  );
}
