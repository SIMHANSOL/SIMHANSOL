import styles from "../styles/website_develop/website_develop.module.scss";

import { useState, useEffect, useContext } from "react";
import context from "../contexts/context";
import type { NextPage } from "next";

const Home: NextPage = () => {
  const readContext = useContext(context);

  return <div className={styles.style}></div>;
};

export default Home;
