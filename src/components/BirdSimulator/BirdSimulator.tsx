import styles from "../styles/bird_simulator/bird_simulator.module.scss";

import { useState, useEffect, useContext } from "react";
import context from "../../contexts/context";
import type { NextPage } from "next";
import Bird from "../../scripts/bird";

interface props {
  play: boolean;
}

const Home: NextPage<props> = (props) => {
  const readContext = useContext(context);
  const [getBird, setBird] = useState<Bird | null>(null);

  useEffect(() => {
    // 마우스 포인터 대입 & 교체
    const birdElement = document.getElementById("bird");
    const mousePointer = document.getElementById("mouse-pointer");
    const bird = new Bird(birdElement, readContext.prefix);
    bird.setTargetElement(mousePointer);
    if (mousePointer) {
      window.addEventListener("mousemove", (event) => {
        const mousePosX = event.clientX;
        const mousePosY = event.clientY;
        mousePointer.style.left = mousePosX + "px";
        mousePointer.style.top = mousePosY + "px";
      });
    }
    // 백그라운드 설정
    const background = document.getElementById("bird-background");
    if (background) {
      background.style.backgroundImage = `url('${readContext.prefix}/images/bird_simulator/background.png')`;
    }
    setBird(bird);
  }, []);

  useEffect(() => {
    if (getBird) {
      getBird.play(props.play);
    }
  }, [props.play]);

  return (
    <div className={styles.style}>
      <div id="bird-background">
        <div className="container py-5">
          <div>
            <h1 className="mb-2">심한솔</h1>
            <h2>웹 포트폴리오</h2>
          </div>
        </div>
      </div>
      <div id="bird" />
      <div id="mouse-pointer" />
    </div>
  );
};

export default Home;
