import { useState } from "react";
import { Link } from "react-router-dom";

export default function SignUpForm() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");

  return (
    <div className="login__container">
      <form action="/login" method="POST" className="login__form">
        <h2>회원가입</h2>
        <div className="post__detail-gap">
          <h3>아이디</h3>
          <input
            type="text"
            className="post__datail-input"
            name="title"
            placeholder="사용할 이메일을 입력하세요"
          />
        </div>
        <div className="post__detail-gap">
          <h3>비밀번호</h3>
          <input
            type="password"
            className="post__datail-input"
            name="summary"
            placeholder="비밀번호를 입력하세요"
          />
        </div>
        <div className="post__detail-gap">
          <h3>비밀번호 확인</h3>
          <input
            type="passwordConfirm"
            className="post__datail-input"
            name="summary"
            placeholder="비밀번호를 입력하세요"
          />
        </div>
        <div className="alert__text">
          계정이 이미 있으신가요? <Link to="/login">로그인하기</Link>
        </div>
        <div className="login__wrapper">
          <button className="post__detail-submit" type="submit">
            회원가입
          </button>
        </div>
      </form>
    </div>
  );
}
