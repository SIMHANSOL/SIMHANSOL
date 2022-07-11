import scss from "./Home.module.scss";
import { useContext } from "react";
import { prefix } from "../../contexts";
import { HandFill } from "../../svgs";

const App = () => {
  const prefixContext = useContext(prefix);
  return (
    <div className={scss["container"]}>
      <video
        className={scss["video"]}
        src={`${prefixContext.prefix}/videos/home.mp4`}
        preload="none"
        autoPlay
        muted
        loop
      />

      <h1 className={scss["screen-title"]}>
        <div>HELLO</div>
        <div>NICE TO SEE</div>
        <div>YOU</div>
      </h1>

      <div className={scss["event-box"]}>
        <div className={scss["mouse"]} />
        <div className={scss["hand-box"]}>
          <HandFill className={scss["hand"]} />
        </div>
      </div>
    </div>
  );
};

export default App;
