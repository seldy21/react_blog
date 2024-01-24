import { Link } from "react-router-dom";

export default function LoginForm() {
  return (
    <div className="login__container">
      <form action="/login" method="POST" className="login__form">
        <h2>로그인</h2>
        <div className="post__detail-gap">
          <h4>아이디</h4>
          <input
            type="text"
            className="post__datail-input"
            name="title"
            placeholder="이메일을 입력하세요"
          />
        </div>
        <div className="post__detail-gap">
          <h4>비밀번호</h4>
          <input
            type="password"
            className="post__datail-input"
            name="password"
            placeholder="비밀번호를 입력하세요"
          />
        </div>
        <div className="alert__text">
          계정이 없으신가요? <Link to="/signUp">회원가입하기</Link>
        </div>
        <div className="login__wrapper">
          <button className="post__detail-submit" type="submit">
            로그인
          </button>
        </div>
      </form>
    </div>
  );
}
