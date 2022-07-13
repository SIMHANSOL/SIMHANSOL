import scss from "./SinglePage.module.scss";
import { useState, useEffect, useRef, RefObject, useCallback } from "react";
import { SelectPageProvider } from "../../contexts";
import Home from "../Home";
import Introduce from "../Introduce";
import Services from "../Services";

interface mouseHandler {
  positionX: number;
  positionY: number;
}

const App = () => {
  const [getSelectPage, setSelectPage] = useState(0);
  const [getDotLength, setDotLength] = useState(0);
  const [getMouseHandler, setMouseHandler] = useState<mouseHandler>({ positionX: 0, positionY: 0 });

  const pageWrap = useRef<HTMLDivElement>(null);
  const dotWrap = useRef<HTMLDivElement>(null);

  const wheelEvent = useCallback(
    (event: WheelEvent) => {
      const page = document.querySelectorAll("#page-wrap > div");
      if (page.length > 0) {
        const windowHeight = window.innerHeight;
        const pageTop = page[getSelectPage].scrollTop;
        const pageHeight = page[getSelectPage].scrollHeight;
        if (event.deltaY < 0) {
          if (pageTop <= 0 && getSelectPage > 0) {
            setSelectPage(getSelectPage - 1);
            window.removeEventListener("wheel", wheelEvent);
          }
        } else if (pageTop + windowHeight >= pageHeight && getSelectPage < page.length - 1) {
          setSelectPage(getSelectPage + 1);
          window.removeEventListener("wheel", wheelEvent);
        }
      }
    },
    [getSelectPage]
  );

  const touchStartEvent = useCallback(
    (event: TouchEvent) => {
      const handler: mouseHandler = Object.assign(getMouseHandler);
      handler.positionX = event.touches[0].clientX;
      handler.positionY = event.touches[0].clientY;
      setMouseHandler(handler);
    },
    [getMouseHandler]
  );

  const touchMoveEvent = useCallback(
    (event: TouchEvent) => {
      const pageWrapElement = pageWrap.current;
      if (pageWrapElement) {
        const clientY = event.touches[0].clientY;
        const handler: mouseHandler = Object.assign(getMouseHandler);
        const deltaY = clientY - handler.positionY;
        if (Math.abs(deltaY) > pageWrapElement.offsetHeight / getDotLength / 4) {
          const page = Math.sign(deltaY) >= 0 ? getSelectPage - 1 : getSelectPage + 1;
          if (page >= 0 && page < getDotLength) {
            handler.positionY = clientY;
            setMouseHandler(handler);
            setSelectPage(page);
            window.removeEventListener("touchmove", touchMoveEvent);
          }
        }
      }
    },
    [getSelectPage, getDotLength, getMouseHandler]
  );

  /** 마우스 휠 전환 */
  useEffect(() => {
    setTimeout(() => {
      window.addEventListener("wheel", wheelEvent);
    }, parseFloat(scss.sliderSpeed.replace(/[^\d.]/g, "")) * 1000);
  }, [wheelEvent]);

  /** 터치 시작 이벤트 + 페이지 수 확인 */
  useEffect(() => {
    window.addEventListener("touchstart", touchStartEvent);

    const dotWrapElement = dotWrap.current;
    if (dotWrapElement) {
      const pageSectionNode = document.querySelectorAll("#page-wrap > div");
      setDotLength(pageSectionNode.length);
    }
  }, [touchStartEvent]);

  /** 모바일 터치 화면 전환 */
  useEffect(() => {
    window.addEventListener("touchmove", touchMoveEvent);
  }, [touchMoveEvent]);

  /** 페이지 전환 */
  useEffect(() => {
    const pageWrapElement = pageWrap.current;
    if (pageWrapElement) {
      const scrollTop = getSelectPage * 100;
      pageWrapElement.style.top = `-${scrollTop}%`;
    }
  }, [getSelectPage]);

  return (
    <div className={scss["container"]}>
      <div ref={pageWrap} id="page-wrap" className={scss["page-wrap"]}>
        <div className={scss["page-section"]}>
          <Home />
        </div>
        <div className={scss["page-section"]}>
          <Introduce />
        </div>
        <div className={scss["page-section"]}>
          <Services />
        </div>
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
      <SelectPageProvider value={getSelectPage}>
        {dotArray.map((_, index) => {
          return (
            <div
              key={index}
              className={[scss["page-dot"], getSelectPage === index ? scss["page-dot-active"] : ""].join(" ")}
              onClick={() => setSelectPage(index)}
            />
          );
        })}
      </SelectPageProvider>
    );
  }
};

export default App;
