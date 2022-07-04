import { signOut, useSession, signIn } from "next-auth/react";
import { register } from "../lib/api";
import Image from "next/image";
import styles from "../styles/index.module.css";
import { useEffect, useState } from "react";
import { getAllProducts } from "../lib/api";
import Post from "../components/Post";
import ScrollToProducts from "../components/ScrollToProducts";

export default function Home({ products }) {
  const { data: session } = useSession();
  // const [products, setProducts] = useState();
  const [shoe, setShoe] = useState();

  // useEffect(() => {
  //   const loadPage = async () => {
  //     const response = await getAllProducts();
  //     setProducts(response);
  //   };
  //   loadPage();
  // }, [session]);

  useEffect(() => {
    if (!products) return;
    function loadRandomInts() {
      let choice = products;
      let newShoe = [];
      let random;
      for (let i = 0; i < 4; i++) {
        do {
          random = Math.floor(Math.random() * choice.length);
        } while (newShoe.includes(random));
        newShoe = [...newShoe, random];
      }
      setShoe(newShoe);
    }
    loadRandomInts();
  }, [products]);

  return (
    products && (
      <section className={styles.container}>
        <ScrollToProducts />
        <h1 className={styles.titleOnImage}>
          <span style={{ color: "#5CDB95" }}>Ascend</span>
          <br />
          The Best
          <br />
          online Shop
        </h1>
        <Image
          className={styles.homeImg}
          src="/img/home-img.png"
          width={1920}
          height={1080}
          alt="Background Image"
        ></Image>

        <div>
          <div className={styles.subTitle}>
            <h1>Some random Products</h1>
          </div>

          <div className={styles.containerProducts}>
            {shoe &&
              shoe.map((i) => {
                return (
                  products[i] && (
                    <Post
                      id={products[i].id}
                      name={products[i].name}
                      imgURL={products[i].img}
                      key={i}
                    />
                  )
                );
              })}
          </div>
        </div>
      </section>
    )
  );
}

export async function getServerSideProps() {
  const products = await getAllProducts();
  return { props: { products } };
}
