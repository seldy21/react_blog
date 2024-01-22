import { Link } from "react-router-dom";

export default function Nav() {
  return (
    <ul className="nav">
      <li>
        <Link to={"posts/new"}>글쓰기</Link>
      </li>
      <li>
        <Link to={"/posts"}>게시글</Link>
      </li>
      <li>
        <Link to={"/profile"}>프로필</Link>
      </li>
    </ul>
  );
}
