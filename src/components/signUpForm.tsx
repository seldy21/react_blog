import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { app } from "firebaseApp";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { toast } from "react-toastify";

export default function SignUpForm() {
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [nickname, setNickname] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");
  const [alertMessage, setAlertMessage] = useState<string>("");

  const handleInputEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAlertMessage("");
    const {
      target: { name, value },
    } = e;

    if (name === "email") {
      setEmail(value);
    }

    if (name === "nickname") {
      setNickname(value)
    }

    if (name === "password") {
      setPassword(value);
    }

    if (name === "passwordConfirm") {
      setPasswordConfirm(value);
    }
  };

  const onSubmit = async () => {
    console.log(email);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setAlertMessage("이메일 형식이 올바르지 않습니다.");
      return;
    }

    if (password.length < 8) {
      setAlertMessage("비밀번호는 8글자 이상으로 설정해야 합니다.");
      return;
    }

    if (passwordConfirm !== password) {
      setAlertMessage("비밀번호 확인이 맞지 않습니다.");
      return;
    }
    try {
      const auth = getAuth(app);
      await createUserWithEmailAndPassword(auth, email, password);
      const photoURL = ''
      if (auth.currentUser){
        await updateProfile(auth.currentUser, {displayName: nickname, photoURL})
      }

      toast.success("회원가입에 성공했습니다! 🎅 \n반가워요. \n우리 자주 봐요.");
      navigate("/");
    } catch (err: any) {
      console.log(err);
      toast.error(err?.code);
    }
  };

  return (
    <div className="login__container">
      <div className="login__form">
        <h2>회원가입</h2>
        <div className="post__detail-gap">
          <h4>아이디</h4>
          <input
            type="text"
            className="post__datail-input"
            name="email"
            placeholder="사용할 이메일을 입력하세요"
            onChange={handleInputEvent}
            value={email}
          />
        </div>
        <div className="post__detail-gap">
          <h4>닉네임</h4>
          <input
            type="text"
            className="post__datail-input"
            name="nickname"
            placeholder="사용할 이메일을 입력하세요"
            onChange={handleInputEvent}
            value={nickname}
          />
        </div>
        <div className="post__detail-gap">
          <h4>비밀번호</h4>
          <input
            type="password"
            className="post__datail-input"
            name="password"
            placeholder="8글자 이상의 비밀번호를 입력하세요"
            onChange={handleInputEvent}
            value={password}
          />
        </div>
        <div className="post__detail-gap">
          <h4>비밀번호 확인</h4>
          <input
            type="password"
            className="post__datail-input"
            name="passwordConfirm"
            placeholder="비밀번호를 한번 더 입력하세요"
            onChange={handleInputEvent}
            value={passwordConfirm}
          />
        </div>
        <div className="alert__text">
          계정이 이미 있으신가요? <Link to="/login">로그인하기</Link>
          {alertMessage.length > 0 && (
            <div className="validation__text">{alertMessage}</div>
          )}
        </div>
        <div className="login__wrapper">
          <button className="post__detail-submit" onClick={onSubmit}>
            회원가입
          </button>
        </div>
      </div>
    </div>
  );
}
