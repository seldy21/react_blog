import { Link } from "react-router-dom";

export default function Profile() {
  return (
    <div className="profile__box">
      <div className="flex__box-lg">
        <div className="profile__image"></div>
        <div>
          <div className="profile__email">user@test.com</div>
          <div className="profile__name">user</div>
        </div>
      </div>
      <Link to={"/"}>로그아웃</Link>
    </div>
  );
}
