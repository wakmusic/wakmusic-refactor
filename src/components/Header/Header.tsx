import React, { useEffect, useState, Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
// import { useQuery } from "react-query";
import { NavList } from "./NavList";
import logo from "../../assets/imgs/Logo/DefaultLogo.png";
import burger from "../../assets/imgs/Etc/burger.png";
import HeaderCircle from "../../assets/svgs/Etc/HeaderCircle.svg";
import HeaderProfileEtc from "../../assets/svgs/Etc/HeaderProfileEtc.svg";
import axios from "axios";
import LoginModal from "../Login/LoginModal";

interface userInfoType {
  name: string;
  id: string;
  platform: "google" | "apple" | "naver";
  profile: string;
  first: boolean;
}

interface HeaderProps {
  userInfo: userInfoType;
  setUserInfo: Dispatch<SetStateAction<userInfoType>>;
}

function Header(props: HeaderProps) {
  const { userInfo, setUserInfo } = props;
  const location = useLocation();
  const [selectMenu, setSelectMenu] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [modal, setModal] = useState<boolean>(false);
  const [menu, setMenu] = useState<boolean>(false);

  const getUserInfo = () => {
    return axios.get("/api/auth");
  };

  useEffect(() => {
    const pathName: string = location.pathname;
    setSelectMenu(pathName);
  });

  useEffect(() => {
    // setLoading(true);
    // if (userInfoQuery.isError == false) {
    // setUserInfo({
    //   name: data.displayName
    //     ? data.displayName
    //     : "애플" + data.sub.split(".")[2],
    //   id: data.id ? data.id : data.sub,
    //   platform: data.provider ? data.provider : "apple",
    //   profile: data.profile,
    //   first: data.first,
    // });
    // }
    // setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sendModal = (e: any) => {
    console.log(e.target);
    if (e?.target.className.startsWith("sc-bcXHqe") || !modal) {
      setModal(!modal);
    }
    const body = document.getElementsByTagName("body")[0];
    if (modal) body.style.overflow = "";
    else body.style.overflow = "hidden";
  };

  const enableMenu = () => {
    const menuBtn = document.getElementById("nav-bar-mobile");
    setMenu(!menu);
    if (menu) {
      menuBtn.className = "nav-bar-disabled";
      setTimeout(() => {
        menuBtn.style.display = "none";
      }, 200);
    } else {
      menuBtn.className = "nav-bar-enabled";
      menuBtn.style.display = "block";
    }
  };

  if (loading) return <></>;

  return (
    <>
      {modal ? <LoginModal sendModal={sendModal} /> : <></>}
      <_HeaderWrap>
        <_Header>
          <Link to="/" className="logo">
            <img src={logo} alt="" />
          </Link>
          <_NavLayout>
            {NavList.map((item, index) => {
              return (
                <Link
                  to={item.path}
                  style={{ textDecoration: "none" }}
                  key={index}
                >
                  <_NavBox current={selectMenu == item.path}>
                    <_NavCircle src={HeaderCircle} />
                    <_NavButton name={`${index}`}>{item.value}</_NavButton>
                  </_NavBox>
                </Link>
              );
            })}
            <_BarRight>
              <Link to="/support" style={{ textDecoration: "none" }}>
                <_NavBox current={selectMenu == "/support"}>
                  <_NavCircle src={HeaderCircle} />
                  <_NavButton>SUPPROT</_NavButton>
                </_NavBox>
              </Link>
              <_LoginLine />
              {!userInfo ? (
                <_NavBox current={false} onClick={sendModal}>
                  <_NavCircle src={HeaderCircle} />
                  <_NavButton>LOGIN</_NavButton>
                </_NavBox>
              ) : (
                <div id="profile-area">
                  <div>
                    <img
                      src={`/static/profile/${props.userInfo.profile}.png`}
                      alt=""
                      className="profile-image"
                    />
                  </div>
                  <div className="profile-name">{props.userInfo.name}</div>
                  <div id="profile-hover">
                    <img src={HeaderProfileEtc} />
                    <Link to="/mypage" className="profile-item">
                      MYPAGE
                    </Link>
                    <a href="/logout" className="profile-item">
                      LOGOUT
                    </a>
                  </div>
                </div>
              )}
            </_BarRight>
          </_NavLayout>
        </_Header>
        <div id="burger-btn" onClick={() => enableMenu()}>
          <div />
          <div />
          <div />
        </div>
        <div id="nav-bar-mobile" className="nav-bar-enabled">
          <div id="logo-wrap">
            <Link to="/" className="logo-mobile" onClick={() => enableMenu()}>
              <img src={logo} alt="" />
            </Link>
          </div>
          <div className="nav-item-wrap">
            {!props.userInfo ? (
              <div
                className="nav-item"
                onClick={(e) => {
                  sendModal(e);
                  enableMenu();
                }}
              >
                로그인하기
              </div>
            ) : (
              <>
                <div id="mobile-profile-area">
                  <div>
                    <img
                      src={`/static/profile/dulgi.png`}
                      alt=""
                      className="profile-image"
                    />
                  </div>
                  <div className="profile-name">UNKNOWN</div>
                </div>
                <Link
                  to="/mypage"
                  style={{ fontSize: "15px", textDecoration: "none" }}
                >
                  <_NavBox current={false}>
                    <_NavCircle src={HeaderCircle} />
                    <_NavButton>SUPPROT</_NavButton>
                  </_NavBox>
                </Link>
                <a
                  href="/logout"
                  className="nav-item"
                  style={{ fontSize: "15px" }}
                >
                  LOGOUT
                </a>
              </>
            )}
            <hr className="login-div" />
            <Link
              to="/charts"
              className="nav-item"
              id="charts"
              onClick={() => enableMenu()}
            >
              CHARTS
            </Link>
            <Link
              to="/albums"
              className="nav-item"
              id="albums"
              onClick={() => enableMenu()}
            >
              ALBUMS
            </Link>
            <Link
              to="/artists"
              className="nav-item"
              id="artists"
              onClick={() => enableMenu()}
            >
              ARTISTS
            </Link>
            <Link
              to="/news"
              className="nav-item"
              id="news"
              onClick={() => enableMenu()}
            >
              NEWS
            </Link>
            <Link
              to="/teams"
              className="nav-item"
              id="teams"
              onClick={() => enableMenu()}
            >
              TEAMS
            </Link>
            <Link
              to="/support"
              className="nav-item"
              id="support"
              onClick={() => enableMenu()}
            >
              SUPPORT
            </Link>
          </div>
        </div>
      </_HeaderWrap>
    </>
  );
}

const _HeaderWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: #080f34;
  width: 100vw;
  height: 80px;
`;

const _Header = styled.div`
  position: relative;
  width: 65vw;
  height: 80px;
  display: flex;
  align-items: center;
`;

const _BarRight = styled.div`
  position: absolute;
  right: 0px;
  display: flex;
  align-items: center;
  gap: 20px;
`;

const _NavLayout = styled.div`
  display: flex;
  gap: 40px;
  margin-left: 40px;
`;

interface NavBoxProps {
  current: boolean;
}

const _NavBox = styled.div<NavBoxProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;

  img {
    opacity: ${(props) => (props.current ? 1 : 0)};
  }

  button {
    color: ${(props) => (props.current ? "#00f3f3" : "#ffffff")};
  }

  &:hover {
    img {
      opacity: 1;
    }
    button {
      color: #00f3f3;
    }
  }
`;

const _NavCircle = styled.img`
  transition: all 0.2s;
  position: absolute;
  top: -10px;
  opacity: 0;
`;

const _LoginLine = styled.div`
  width: 1px;
  height: 16px;
  border-radius: 10px;
  background-color: #6b6f85;
`;

const _NavButton = styled.button`
  transition: color 0.2s;
  color: white;
  text-decoration: none;
  font-size: 18px;
  font-weight: 400;
  transition: color 0.2s;
  background: none;
  border: none;
  margin: 0px;
  text-decoration: none;
  padding: 0px;
  cursor: pointer;
`;

export default Header;