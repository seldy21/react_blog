import AuthContext from "context/authContext";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "firebaseApp";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { Categories } from "./postForm";

interface PostListProps {
  hasNavigation?: boolean;
  defaultTab?: TapType;
}

type TapType = "all" | "my";

export interface postProps {
  id?: string;
  title: string;
  email: string;
  content: string;
  createdAt: string;
  updatedAt?: string;
  summary: string;
  uid: string;
  category?: categoryType;
}

export type categoryType = "Frontend" | "Backend" | "Web" | "Native";

export const deleteQuestionSwal = () => {
  return Swal.fire({
    icon: "question",
    text: "삭제하시겠어요? 👻",
    confirmButtonText: "확인",
    showCancelButton: true,
    cancelButtonText: "취소",
  });
};

export default function PostList({
  hasNavigation = true,
  defaultTab = "all",
}: PostListProps) {
  const { user } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState<TapType | categoryType>(defaultTab);
  const [posts, setPosts] = useState<any[]>([]);

  const getPosts = async () => {
    setPosts([]);
    const postsRef = collection(db, "posts");
    let postsQuery;
    if (activeTab === "my" && user) {
      //show user's post
      postsQuery = query(
        postsRef,
        where("email", "==", user.email),
        orderBy("createdAt", "desc")
      );
    } else if (activeTab === "all") {
      //show all post
      postsQuery = query(postsRef, orderBy("createdAt", "desc"));
    } else (
      //show exact category
      postsQuery = query(postsRef, where("category", "==", activeTab),orderBy("createdAt", "desc"))
    )
    const data = await getDocs(postsQuery);

    data.forEach((doc) => {
      const dataObj = { ...doc.data(), id: doc.id };
      setPosts((prev) => [...prev, dataObj as postProps]);
    });
  };

  useEffect(() => {
    getPosts();
  }, [activeTab]);

  const deletePost = async (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    id: string
  ) => {
    deleteQuestionSwal().then(async (res) => {
      if (res.isConfirmed) {
        try {
          await deleteDoc(doc(db, "posts", id));
          toast.success("삭제되었습니다! 😇");

          const targetPostBox = (e.target as HTMLElement).closest(
            ".post__box"
          ) as HTMLElement;
          if (targetPostBox) {
            targetPostBox.style.opacity = "0";
            setTimeout(() => {
              targetPostBox.style.height = "0";
              targetPostBox.style.padding = "0";
            }, 200);
          }
        } catch (err) {
          console.log(err);
          toast.warning("문제가 발생했습니다. 다시 시도해주세요. 😫");
        }
      }
    });
  };

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
          {Categories.map((item) => (
            <div
              key={item}
              role="presentation"
              className={activeTab === item ? "post__navigation--active" : ""}
              onClick={() => {
                setActiveTab(item);
              }}
            >
              {item}
            </div>
          ))}
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
                  <div
                    className="post__delete"
                    onClick={(e) => {
                      deletePost(e, item.id);
                    }}
                  >
                    삭제
                  </div>
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
