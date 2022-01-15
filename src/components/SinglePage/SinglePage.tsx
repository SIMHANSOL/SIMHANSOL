import style from "./SinglePage.module.scss";

import type { NextPage } from "next";
import { useState, useEffect, useRef } from "react";

let pageMove: NodeJS.Timeout;

const App: NextPage = () => {
  const [getPage, setPage] = useState(0);
  const [getDot, setDot] = useState(0);

  const pageWrap = useRef<HTMLDivElement>(null);
  const pageSection = useRef<HTMLDivElement>(null);
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
    const scroll = document.getElementById("single-page-wrap");
    const scrollTop = getPage * 100;
    if (scroll) {
      scroll.style.top = `-${scrollTop}%`;
    }
    if (pageMove === undefined) {
      window.removeEventListener("wheel", wheelEvent);
      pageMove = setTimeout(() => {
        window.addEventListener("wheel", wheelEvent, true);
      }, parseFloat(style.sliderSpeed) * 1000);
    }
    return () => {
      window.removeEventListener("wheel", wheelEvent);
    };
  }, [getPage, wheelEvent]);

  // 마우스 클릭

  // 마우스 이벤트 추가
  function wheelEvent(event: WheelEvent) {
    const eventRemove = () => {
      return setTimeout(() => {
        window.removeEventListener("wheel", wheelEvent, true);
      }, 100);
    };

    const page = document.getElementsByClassName("page-section");

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

  return (
    <div className={style.style}>
      <div ref={pageWrap} id="page-wrap">
        <div ref={pageSection} className="page-section">
          hi
        </div>
        <div ref={pageSection} className="page-section">
          hello
        </div>
      </div>

      <div ref={dotWrap} id="dot-wrap" />
    </div>
  );
};

export default App;
