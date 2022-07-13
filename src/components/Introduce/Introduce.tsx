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
          <h2 className={scss["title"]}>Portfolio</h2>
          <div className={scss["description"]}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Numquam deleniti quibusdam maiores. Consectetur
            est tempora itaque molestiae esse. Deserunt earum porro temporibus blanditiis qui laboriosam aliquam illum
            sit ipsum ullam!
          </div>
          <button className="">Button</button>
        </div>
        <div className={scss["col-item"]}>
          <div className={scss["row"]}>
            <div className={scss["col"]}>
              <div className={scss["item-box"]}>
                <img src={`${prefixContext.prefix}/images/Home/vietnamese-woman-6993982_640.jpg`} alt="" />
              </div>
            </div>
            <div className={scss["col"]}>
              <div className={scss["item-box"]}>CONTENT 1</div>
            </div>
            <div className={scss["col"]}>
              <div className={scss["item-box"]}></div>
            </div>
            <div className={scss["col"]}>
              <div className={scss["item-box"]}></div>
            </div>
          </div>
          <div className={scss["row"]}>
            <div className={scss["col"]}>
              <div className={scss["item-box"]}></div>
            </div>
            <div className={scss["col"]}>
              <div className={scss["item-box"]}>CONTENT 2</div>
            </div>
            <div className={scss["col"]}>
              <div className={scss["item-box"]}>
                <img src={`${prefixContext.prefix}/images/Home/woman-7305088_640.jpg`} alt="" />
              </div>
            </div>
            <div className={scss["col"]}>
              <div className={scss["item-box"]}>
                <img src={`${prefixContext.prefix}/images/Home/woman-7305089_640.jpg`} alt="" />
              </div>
            </div>
          </div>
          <div className={scss["row"]}>
            <div className={scss["col"]}>
              <div className={scss["item-box"]}>
                <img src={`${prefixContext.prefix}/images/Home/woman-5916307_640.jpg`} alt="" />
              </div>
            </div>
            <div className={scss["col"]}>
              <div className={scss["item-box"]}>
                <img src={`${prefixContext.prefix}/images/Home/woman-5708594_640.jpg`} alt="" />
              </div>
            </div>
            <div className={scss["col"]}>
              <div className={scss["item-box"]}>CONTENT 3</div>
            </div>
            <div className={scss["col"]}>
              <div className={scss["item-box"]}></div>
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
