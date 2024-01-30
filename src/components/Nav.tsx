import { Link } from "react-router-dom";

export default function Nav() {
  return (
    <header>
      <div className="header__logo"><Link to={"/"}>프로젝트 블로그</Link></div>
      <ul className="nav">
        <li>
          <Link to={"/posts/new"}>글쓰기</Link>
        </li>
        <li>
          <Link to={"/posts"}>게시글</Link>
        </li>
        <li>
          <Link to={"/profile"}>프로필</Link>
        </li>
      </ul>
    </header>
  );
}
