import { React, useState, useEffect } from "react";
import Image from "next/image";
import styles from "../../styles/adidas.module.css";
import ScrollToProducts from "../../components/ScrollToProducts";
import { getAllProducts } from "../../lib/api";
import Post from "../../components/Post";

export default function IndexPage({ products }) {
  const [productsToRender, setProductsToRender] = useState([]);

  useEffect(() => {
    const filterProducts = () => {
      const filtered = products.filter(
        (product) => product.brand == "Air Jordan"
      );
      setProductsToRender(filtered);
    };

    filterProducts();
  }, [products]);

  return (
    <section className={styles.container}>
      <ScrollToProducts />
      <h1 className={styles.titleOnImage}>Adidas</h1>
      <h3 className={styles.slogan}>"Impossible is Nothing”</h3>
      <Image
        className={styles.nikeImg}
        src="/img/adidas.jpg"
        width={1920}
        height={1080}
        alt="Background Image"
      />

      <div className={styles.subtitle}>
        <center>
          <h1 className={styles.title}>Products from Adidas</h1>
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
