import scss from "./Introduce.module.scss";
import { useContext } from "react";
import { DiamondFill } from "../../svgs";
import { prefix } from "../../contexts";

const App = () => {
  const prefixContext = useContext(prefix);

  return (
    <div className={scss["container"]}>
      <div className={scss["row"]}>
        <div className={scss["col-main"]}>
          <div>Portfolio</div>
          <div>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Numquam deleniti quibusdam maiores. Consectetur
            est tempora itaque molestiae esse. Deserunt earum porro temporibus blanditiis qui laboriosam aliquam illum
            sit ipsum ullam!
          </div>
          <div>asdsada</div>
          <button>asdsada</button>
        </div>
        <div className={scss["col-item"]}>
          <div className={scss["row"]}>
            <div className={scss["col"]}>
              <div className={scss["item-box"]}>1</div>
            </div>
            <div className={scss["col"]}>
              <div className={scss["item-box"]}>2</div>
            </div>
            <div className={scss["col"]}>
              <div className={scss["item-box"]}>3</div>
            </div>
            <div className={scss["col"]}>
              <div className={scss["item-box"]}>4</div>
            </div>
          </div>
          <div className={scss["row"]}>
            <div className={scss["col"]}>
              <div className={scss["item-box"]}>1</div>
            </div>
            <div className={scss["col"]}>
              <div className={scss["item-box"]}>1</div>
            </div>
            <div className={scss["col"]}>
              <div className={scss["item-box"]}>1</div>
            </div>
            <div className={scss["col"]}>
              <div className={scss["item-box"]}>1</div>
            </div>
          </div>
          <div className={scss["row"]}>
            <div className={scss["col"]}>
              <div className={scss["item-box"]}>1</div>
            </div>
            <div className={scss["col"]}>
              <div className={scss["item-box"]}>1</div>
            </div>
            <div className={scss["col"]}>
              <div className={scss["item-box"]}>1</div>
            </div>
            <div className={scss["col"]}>
              <div className={scss["item-box"]}>1</div>
            </div>
          </div>
        </div>
      </div>

      <div className={scss["background"]}>
        <DiamondFill />
        <DiamondFill />
      </div>
    </div>
  );
};

export default App;
