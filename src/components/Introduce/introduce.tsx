import styles from "../styles/introduce/introduce.module.scss";

import { useState, useEffect, useContext } from "react";
import context from "../../contexts/context";
import type { NextPage } from "next";

const Home: NextPage = () => {
  const readContext = useContext(context);

  return (
    <div className={styles.style}>
      <div className="container">
        <div className="row">
          <div className="col-lg-4 col-12 mb-lg-0 mb-5">
            <div className="profile-image">
              <img className="w-100 h-100" src={`${readContext.prefix}/images/profile/shs.jpg`} />
            </div>
            <div className="text-center">
              안녕하세요. 개발자를 꿈꾸는 학생입니다. <br />
              학창 시절, 게임 개발을 위해 공부했던 경험이 있으며 <br />
              지금은 웹사이트 개발을 위해 공부하고 있습니다.
            </div>
          </div>
          <div className="col-lg-8 col-12">
            <div className="row">
              <div className="col-lg-6 col-12">
                <div className="title">심한솔 / Hansol Sim</div>
                <div className="description">
                  <p>25세 / 1997.01.28 / 서울특별시 중랑구 면목동</p>
                  <div>
                    <b className="me-1">Tel.</b> 010-6265-9714
                  </div>
                  <div>
                    <b className="me-1">Email.</b> gamedayga@gmail.com
                  </div>
                  <div>
                    <b className="me-1">Github.</b>{" "}
                    <a href="https://github.com/SIMHANSOL" target="_blank" rel="noreferrer">
                      https://github.com/SIMHANSOL
                    </a>
                  </div>
                </div>

                <hr />

                <div className="title">GRADUATION</div>
                <div className="description">
                  <div>
                    <span className="me-1">2016</span> 면목고등학교 졸업
                  </div>
                  <div>
                    <span className="me-1">2016</span> 아현산업정보학교 졸업
                  </div>
                </div>

                <hr />

                <div className="title">
                  <span className="me-1">PROJECT</span>
                  <span className="badge badge-sm rounded-pill bg-primary py-1 px-2">3</span>
                </div>
                <div className="description">
                  <a href="https://kscas.org" rel="noreferrer" target="_blank">
                    한국사회공헌협회 웹사이트
                  </a>
                  <br />
                  <a href="https://peopleyoutube.com" rel="noreferrer" target="_blank">
                    열린사람들크리에이터사관학교 웹사이트
                  </a>
                  <br />
                  <a href="https://nudgestory.co.kr" rel="noreferrer" target="_blank">
                    넛지스토리 웹사이트
                  </a>
                  <br />
                </div>

                <hr className="hr-desktop" />
              </div>
              <div className="col-lg-6 col-12">
                <div className="row">
                  <div className="col-lg-6 col-3 mb-3">
                    <div className="title">Front-end</div>
                    HTML <br />
                    CSS <br />
                    SASS / SCSS <br />
                    JavaScript <br />
                    Jquery <br />
                    Redux <br />
                    React <br />
                    Next.js <br />
                  </div>
                  <div className="col-lg-6 col-3 mb-3">
                    <div className="title">Back-end</div>
                    Node.js <br />
                    Express <br />
                    Socket.io <br />
                    Passport.js <br />
                    Redis <br />
                    MySQL <br />
                    MariaDB <br />
                    Nginx <br />
                  </div>
                  <div className="col-lg-6 col-3">
                    <div className="title">etc</div>
                    TypeScript <br />
                    AWS <br />
                    Git <br />
                    Docker <br />
                    Python <br />
                    Dart <br />
                    Flutter <br />
                    GetX <br />
                  </div>
                  <div className="col-lg-6 col-3">
                    <div className="title">Game-dev</div>
                    C++ <br />
                    C# <br />
                    Java <br />
                    GML <br />
                    GameMaker <br />
                    Unity <br />
                    Unreal Engine <br />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
