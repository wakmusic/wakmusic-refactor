import React from "react";
import * as S from "./styled";

interface Props {
 name : string;
 children : React.ReactNode; 
}

const LoginBox = ({ name, children }:Props) => {
  const onClickLogin = () => {
    if (name) {
      window.location.href = `/auth/login/${name}`;
    }
  };

  return <S.LoginBox onClick={onClickLogin}>{children}</S.LoginBox>;
};

export default LoginBox;
