import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { app } from "firebaseApp";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

type login = {
  email: string;
  password: string;
};

export default function LoginForm() {
  const navigate = useNavigate();
  const [user, setUser] = useState<login>({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleLoginInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;

    setUser({
      ...user,
      [name]: value,
    });
  };

  const keyDownEnter = (e:React.KeyboardEvent<HTMLInputElement>) =>{
    if (e.key === "Enter"){
      submitLogin();
    }
  }

  const submitLogin = async () => {
    if (!user.email || !user.password) {
      toast.warning("아이디와 비밀번호를 입력하세요.🙄");
      return;
    }
    if (error) {
      toast.warning(error);
      return;
    }

    try {
      const auth = getAuth(app);
      await signInWithEmailAndPassword(auth, user.email, user.password);
      toast.success("로그인에 성공하였습니다! 반가워요🤗");
      navigate('/')
    } catch (err: any) {
      console.log(err);
      if (err.code === "auth/invalid-credential") {
        toast.error("아이디와 비밀번호를 확인해주세요.");
      }
    }
  };
  return (
    <div className="login__container">
      <div className="login__form">
        <h2>로그인</h2>
        <div className="post__detail-gap">
          <h4>아이디</h4>
          <input
            type="text"
            className="post__datail-input"
            name="email"
            placeholder="이메일을 입력하세요"
            value={user.email}
            onChange={handleLoginInput}
          />
        </div>
        <div className="post__detail-gap">
          <h4>비밀번호</h4>
          <input
            type="password"
            className="post__datail-input"
            name="password"
            placeholder="비밀번호를 입력하세요"
            onChange={handleLoginInput}
            onKeyDown={keyDownEnter}
          />
        </div>
        <div className="alert__text">
          계정이 없으신가요? <Link to="/signUp">회원가입하기</Link>
        </div>
        <div className="login__wrapper">
          <button className="post__detail-submit" onClick={submitLogin}>
            로그인
          </button>
        </div>
      </div>
    </div>
  );
}
