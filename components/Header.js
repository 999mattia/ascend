import React, { useState } from "react";
import styles from "../styles/Header.module.css";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { VscAccount } from "react-icons/vsc";
import { MdOutlineShoppingBag } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import { GoX } from "react-icons/go";

export default function Header() {
  const { data: session } = useSession();
  const router = useRouter();
  const [showMenu, setShowMenu] = useState(false);

  const handleClick = () => {
    setShowMenu((prev) => !prev);
  };
  const closeMenu = () => {
    setShowMenu(false);
  };

  return (
    <div>
      <div className={styles.headerContainer}>
        <div className={styles.left}>
          <Link href={`http://localhost:3000/products`} passHref>
            <p className={styles.headerLink}>Products</p>
          </Link>
          <Link href={`http://localhost:3000/products/nike`} passHref>
            <p className={styles.headerLink}>Nike</p>
          </Link>
          <Link href={`http://localhost:3000/products/jordan`} passHref>
            <p className={styles.headerLink}>Air Jordan</p>
          </Link>
          <Link href={`http://localhost:3000/products/adidas`} passHref>
            <p className={styles.headerLink}>Adidas</p>
          </Link>

          {!showMenu ? (
            <button
              onClick={handleClick}
              style={{ backgroundColor: "transparent", border: "none" }}
            >
              <GiHamburgerMenu className={styles.mobileMenu}></GiHamburgerMenu>
            </button>
          ) : (
            <button
              onClick={handleClick}
              style={{ backgroundColor: "transparent", border: "none" }}
            >
              <GoX className={styles.mobileMenu}></GoX>
            </button>
          )}
        </div>

        <div className={styles.middle}>
          <Link href={`/`} passHref>
            <p className={styles.logo}>
              <span style={{ color: "#5CDB95" }}>A</span>scend
            </p>
          </Link>
        </div>

        <div className={styles.right}>
          <div className={styles.dropdown}>
            <div className={styles.dropbtn}>
              <VscAccount className={styles.icon}></VscAccount>
            </div>

            {session ? (
              session.user.name == "admin" ? (
                <div className={styles.dropdownContent}>
                  <p>{session.user.name}</p>
                  <Link href="/admin" passHref>
                    Admin Dashboard
                  </Link>
                  <a onClick={() => signOut()} className={styles.signOut}>
                    Sign out
                  </a>
                </div>
              ) : (
                <div className={styles.dropdownContent}>
                  <p>{session.user.name}</p>
                  <a onClick={() => signOut()} className={styles.signOut}>
                    Sign out
                  </a>
                </div>
              )
            ) : (
              <div className={styles.dropdownContent}>
                <Link href="/auth/signIn" passHref>
                  Sign In
                </Link>
                <Link href="/auth/register" passHref>
                  Register
                </Link>
              </div>
            )}
          </div>


          <div style={{cursor: "pointer"}}>
          <Link href="/cart" passHref>
            <MdOutlineShoppingBag
              className={styles.icon2}
              style={{ marginLeft: "1em" }}
            ></MdOutlineShoppingBag>
          </Link>
          </div>
        </div>
      </div>
      {showMenu && (
        <div className={styles.menu}>
          <Link href={`/products`} passHref>
            <a onClick={() => closeMenu()} className={styles.menuItems}>
              Products
            </a>
          </Link>
          <Link href={`/products/nike`} passHref>
            <a onClick={() => closeMenu()} className={styles.menuItems}>
              Nike
            </a>
          </Link>
          <Link href={`/products/jordan`} passHref>
            <a onClick={() => closeMenu()} className={styles.menuItems}>
              Air Jordan
            </a>
          </Link>
          <Link href={`/products/adidas`} passHref>
            <a
              onClick={() => closeMenu()}
              style={{ marginBottom: "1em" }}
              className={styles.menuItems}
            >
              Adidas
            </a>
          </Link>
        </div>
      )}
    </div>
  );
}
