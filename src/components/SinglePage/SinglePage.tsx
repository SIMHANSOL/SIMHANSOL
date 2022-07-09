import style from "./SinglePage.module.scss";

import type { NextPage } from "next";
import { useState, useEffect, useRef } from "react";

const App: NextPage = () => {
  const [getPage, setPage] = useState(0);
  const [getDot, setDot] = useState(0);

  const pageWrap = useRef<HTMLDivElement>(null);
  const dotWrap = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   const pageWrapElement = pageWrap.current;
  //   const pageSectionElement = pageSection.current;
  //   const dotWrapElement = dotWrap.current;
  //   if (dotWrapElement) {
  //     const emptyNode = document.createElement("div");
  //     const dotNode = dotWrapElement.appendChild(emptyNode);
  //     dotNode.className = "page-dot-wrap";
  //     const dotSize = parseInt(style.dotSize);
  //     createNode.style.marginTop = `${(-(dotSize * page.length)).toString()}em`;
  //     for (let i = 0; i < page.length; i++) {
  //       const node = document.createElement("div");
  //       const dot = createNode.appendChild(node);
  //       dot.className = "page-dot";
  //       dot.addEventListener("click", () => {
  //         setPage(i);
  //       });
  //     }
  //   }
  // }, []);

  // useEffect(() => {
  //   // 도트 생성
  //   const page = document.getElementsByClassName("page-section");
  //   const wrap = document.getElementById("single-page-wrap");
  //   if (wrap) {
  //     const node = document.createElement("div");
  //     const createNode = wrap.appendChild(node);
  //     createNode.className = "page-dot-wrap";
  //     const dotSize = parseInt(style.dotSize);
  //     createNode.style.marginTop = `${(-(dotSize * page.length)).toString()}em`;
  //     for (let i = 0; i < page.length; i++) {
  //       const node = document.createElement("div");
  //       const dot = createNode.appendChild(node);
  //       dot.className = "page-dot";
  //       dot.addEventListener("click", () => {
  //         setPage(i);
  //       });
  //     }
  //   }
  // }, []);

  useEffect(() => {
    // 페이지 전환시 실행
    // const dot = document.getElementsByClassName("page-dot");
    // for (let i = 0; i < dot.length; i++) {
    //   dot[i].className = "page-dot";
    // }
    // dot[getPage].className = `${dot[getPage].className} active`;
    const pageWrapElement = document.getElementById("page-wrap");
    const scrollTop = getPage * 100;
    if (pageWrapElement) {
      pageWrapElement.style.top = `-${scrollTop}%`;

      setTimeout(() => {
        window.addEventListener("wheel", wheelEvent);
      }, parseFloat(style.sliderSpeed) * 1000);
    }
  }, [getPage]);

  // 마우스 클릭

  // 마우스 이벤트 추가
  function wheelEvent(event: WheelEvent) {
    const eventRemove = () => window.removeEventListener("wheel", wheelEvent);

    const page = document.querySelectorAll("#page-wrap > div");
    if (page.length > 0) {
      const windowHeight = window.innerHeight;
      const pageTop = page[getPage].scrollTop;
      const pageHeight = page[getPage].scrollHeight;

      if (event.deltaY < 0) {
        if (pageTop <= 0 && getPage > 0) {
          setPage(getPage - 1);
          eventRemove();
        }
      } else if (pageTop + windowHeight >= pageHeight && getPage < page.length - 1) {
        setPage(getPage + 1);
        eventRemove();
      }
    }
  }

  return (
    <div className={style["container"]}>
      <div ref={pageWrap} id="page-wrap" className={style["page-wrap"]}>
        <div className={style["page-section"]}>first screen {getPage}</div>
        <div className={style["page-section"]}>second screen {getPage}</div>
        <div className={style["page-section"]}>third screen {getPage}</div>
        <div className={style["page-section"]}>fourth screen {getPage}</div>
      </div>

      <div ref={dotWrap} id="dot-wrap" className={style["page-dot-wrap"]} />
    </div>
  );
};

export default App;
