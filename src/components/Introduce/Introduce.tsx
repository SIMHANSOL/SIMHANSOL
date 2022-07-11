import scss from "./Introduce.module.scss";
import { useContext } from "react";
import { prefix } from "../../contexts";

const App = () => {
  const prefixContext = useContext(prefix);

  return (
    <div className={scss["container"]}>
      <div className={scss["flex-box"]}>asdsad</div>
    </div>
  );
};

export default App;
