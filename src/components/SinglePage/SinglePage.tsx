import scss from "./SinglePage.module.scss";
import { useState, useEffect, useRef, Fragment, RefObject } from "react";
import Home from "../Home";

const App = () => {
  const [getSelectPage, setSelectPage] = useState(0);
  const [getDotLength, setDotLength] = useState(0);

  const pageWrap = useRef<HTMLDivElement>(null);
  const dotWrap = useRef<HTMLDivElement>(null);

  /** 페이지 수 확인 */
  useEffect(() => {
    const dotWrapElement = dotWrap.current;
    if (dotWrapElement) {
      const pageSectionNode = document.querySelectorAll("#page-wrap > div");
      setDotLength(pageSectionNode.length);
    }
  }, []);

  /** 마우스 휠 전환 이벤트 */
  useEffect(() => {
    const pageWrapElement = pageWrap.current;
    if (pageWrapElement) {
      const scrollTop = getSelectPage * 100;
      pageWrapElement.style.top = `-${scrollTop}%`;

      setTimeout(() => {
        window.addEventListener("wheel", wheelEvent);
      }, parseFloat(scss.sliderSpeed.replace(/[^\d.]/g, "")) * 1000);
    }

    function wheelEvent(event: WheelEvent) {
      const eventRemove = () => window.removeEventListener("wheel", wheelEvent);
      const page = document.querySelectorAll("#page-wrap > div");
      if (page.length > 0) {
        const windowHeight = window.innerHeight;
        const pageTop = page[getSelectPage].scrollTop;
        const pageHeight = page[getSelectPage].scrollHeight;
        if (event.deltaY < 0) {
          if (pageTop <= 0 && getSelectPage > 0) {
            setSelectPage(getSelectPage - 1);
            eventRemove();
          }
        } else if (pageTop + windowHeight >= pageHeight && getSelectPage < page.length - 1) {
          setSelectPage(getSelectPage + 1);
          eventRemove();
        }
      }
    }
  }, [getSelectPage]);

  return (
    <div className={scss["container"]}>
      <div ref={pageWrap} id="page-wrap" className={scss["page-wrap"]}>
        <div className={scss["page-section"]}>
          <Home />
        </div>
        <div className={scss["page-section"]}>second screen</div>
        <div className={scss["page-section"]}>third screen</div>
        <div className={scss["page-section"]}>fourth screen</div>
        <div className={scss["page-section"]}>fifteen screen</div>
        <div className={scss["page-section"]}>sixteen screen</div>
      </div>

      <div ref={dotWrap} id="dot-wrap" className={scss["page-dot-wrap"]}>
        {dotRender(dotWrap, getSelectPage, getDotLength)}
      </div>
    </div>
  );

  /**
   * 슬라이드 상태를 보여줄 도트 렌더링
   * @param dotWrap
   * @param getDotLength
   * @returns
   */
  function dotRender(dotWrap: RefObject<HTMLDivElement>, getSelectPage: number, getDotLength: number) {
    const dotSize = parseInt(scss.dotSize);
    const dotArray = Array.from({ length: getDotLength }, () => null);
    const dotWrapElement = dotWrap.current;
    if (dotWrapElement) {
      dotWrapElement.style.marginTop = `${(-(dotSize * getDotLength)).toString()}em`;
    }

    return (
      <Fragment>
        {dotArray.map((_, index) => {
          return (
            <div
              key={index}
              className={[scss["page-dot"], getSelectPage === index ? scss["page-dot-active"] : ""].join(" ")}
              onClick={() => setSelectPage(index)}
            />
          );
        })}
      </Fragment>
    );
  }
};

export default App;
