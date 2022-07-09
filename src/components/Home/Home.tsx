import scss from "./Home.module.scss";

const App = () => {
  return (
    <div className={scss["container"]}>
      <video className={scss["video"]} src="/videos/home.mp4" preload="none" autoPlay loop muted />

      <div className={scss["screen-title"]}>
        <div>HELLO WORLD</div>
      </div>
    </div>
  );
};

export default App;
