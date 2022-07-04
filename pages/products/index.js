import { useState, useEffect } from "react";
import { getAllProducts, getAllCarts } from "../../lib/api";
import React from "react";
import Post from "../../components/Post";
import styles from "../../styles/products.module.css";

export default function IndexPage({ products }) {
  const [productsToRender, setProductsToRender] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const filterProducts = () => {
      if (query.trim() === "") {
        setProductsToRender(products);
      } else {
        const filtered = products.filter((product) =>
          product.name.toLowerCase().includes(query.toLowerCase())
        );
        setProductsToRender(filtered);
      }
    };
    filterProducts();
  }, [query, products]);

  const handleChange = (e) => {
    const target = e.target;
    const value = target.value;
    setQuery(value);
  };

  return (
    <section className={styles.container}>
      <center>
        <h1 className={styles.title}>All products</h1>
      </center>
      <div className={styles.searchbarContainer}>
        <input
          className={styles.searchbar}
          onChange={handleChange}
          type="text"
          name="query"
          placeholder="Search Product"
          value={query}
        ></input>
      </div>
      <div className={styles.containerProducts}>
        {productsToRender.map((product) => {
          return (
            <Post
              key={product.id}
              id={product.id}
              name={product.name}
              imgURL={product.img}
              price={product.price}
            />
          );
        })}
      </div>
    </section>
  );
}

export async function getServerSideProps() {
  const products = await getAllProducts();
  return { props: { products } };
}
