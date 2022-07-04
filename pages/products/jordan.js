import { React, useState, useEffect } from "react";
import styles from "../../styles/jordan.module.css";
import Image from "next/image";
import ScrollToProducts from "../../components/ScrollToProducts";
import Post from "../../components/Post";
import { getAllProducts } from "../../lib/api";

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
      <h1 className={styles.titleOnImage}>Air Jordan</h1>
      <h3 className={styles.slogan}>“The shoe works if you do”</h3>
      <Image
        className={styles.jordanImg}
        src="/img/jordan.jpg"
        width={1920}
        height={1080}
        alt="Background Image"
      />

      <div className={styles.subtitle}>
        <center>
          <h1 className={styles.title}>Products from Air Jordan</h1>
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
