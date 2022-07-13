import scss from "./Services.module.scss";
import { useContext } from "react";
import { DiamondFill } from "../../svgs";
import { prefix } from "../../contexts";

const App = () => {
  const prefixContext = useContext(prefix);

  return (
    <div className={scss["container"]}>
      <div className={scss["background"]}>
        <DiamondFill />
      </div>
    </div>
  );
};

export default App;
