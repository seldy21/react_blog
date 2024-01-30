import AuthContext from "context/authContext";
import { collection, getDocs } from "firebase/firestore";
import { db } from "firebaseApp";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface PostListProps {
  hasNavigation?: boolean;
}

type TapType = "all" | "my";

export interface postProps {
  id?: string;
  title: string;
  email: string;
  content: string;
  createdAt: string;
  summary: string;
}

export default function PostList({ hasNavigation = true }: PostListProps) {
  const { user } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState<TapType>("all");
  const [posts, setPosts] = useState<any[]>([]);

  const getPosts = async () => {
    const data = await getDocs(collection(db, "posts"));

    data.forEach((doc) => {
      const dataObj = { ...doc.data(), id: doc.id };
      setPosts((prev) => [...prev, dataObj as postProps]);
    });
  };
  useEffect(() => {
    getPosts();
  }, []);

  return (
    <>
      {hasNavigation && (
        <div className="post__navigation">
          <div
            role="presentation"
            className={activeTab === "all" ? "post__navigation--active" : ""}
            onClick={() => {
              setActiveTab("all");
            }}
          >
            전체
          </div>
          <div
            role="presentation"
            className={activeTab === "my" ? "post__navigation--active" : ""}
            onClick={() => {
              setActiveTab("my");
            }}
          >
            내가 쓴 글
          </div>
        </div>
      )}
      <div className="post__list">
        {posts.length > 0 ? (
          posts.map((item) => (
            <div key={`post_${item.id}`} className="post__box">
              <Link to={`/posts/${item.id}`}>
                <div className="post__profile-box">
                  <div className="post__profile-img"></div>
                  <div className="post__author-name">{item.email}</div>
                  <div className="post__date">{item.createdAt}</div>
                </div>
                <div className="post__title">{item.title}</div>
                <div className="post__content">{item.summary}</div>
              </Link>
              {item.email === user?.email && (
                <div className="post__utils-box">
                  <Link to={`/posts/edit/${item.id}`} className="post__edit">
                    수정
                  </Link>
                  <div className="post__delete">삭제</div>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="post__empty">게시글이 없습니다.</div>
        )}
      </div>
    </>
  );
}
