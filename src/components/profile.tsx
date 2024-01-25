import AuthContext from "context/authContext";
import { getAuth, signOut } from "firebase/auth";
import { app } from "firebaseApp";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const handleLogout = async () => {
  try {
    const auth = getAuth(app);
    await signOut(auth);
    toast.success("반가웠어요. 또 와요.🎁");
  } catch (err) {
    console.log(err);
    toast.error("문제가 발생했어요. 로그아웃되지 않았습니다.😥");
  }
};
export default function Profile() {
  const { user } = useContext(AuthContext);
  return (
    <div className="profile__box">
      <div className="flex__box-lg">
        <div className="profile__image"></div>
        <div>
          <div className="profile__email">{user?.email}</div>
          <div className="profile__name">{user?.displayName || "사용자"}</div>
        </div>
      </div>
      <div role="presentation" className="pointer" onClick={handleLogout}>
        로그아웃
      </div>
    </div>
  );
}
