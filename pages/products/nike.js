import { React, useState, useEffect } from "react";
import Image from "next/image";
import styles from "../../styles/nike.module.css";
import ScrollToProducts from "../../components/ScrollToProducts";
import Post from "../../components/Post";
import { getAllProducts } from "../../lib/api";

export default function IndexPage({ products }) {
  const [productsToRender, setProductsToRender] = useState([]);

  useEffect(() => {
    const filterProducts = () => {
      const filtered = products.filter((product) => product.brand == "Nike");
      setProductsToRender(filtered);
    };

    filterProducts();
  }, [products]);
  return (
    <section className={styles.container}>
      <ScrollToProducts />
      <h1 className={styles.titleOnImage}>NIKE</h1>
      <h3 className={styles.slogan}>
        “With each step comes the decision to take another. You’re on your way
        now. But this is not the time to dwell on how far you’ve come.”
      </h3>
      <Image
        className={styles.nikeImg}
        src="/img/nike.png"
        width={1920}
        height={1080}
        alt="Background Image"
      />

      <div className={styles.subtitle}>
        <center>
          <h1 className={styles.title}>Products from Nike</h1>
        </center>
      </div>
      <div className={styles.productsContainer}>
        {productsToRender.map((product) => {
          return (
            <Post
              id={product.id}
              key={product.id}
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
