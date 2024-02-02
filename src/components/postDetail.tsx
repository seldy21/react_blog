import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteDoc, doc, getDoc } from "firebase/firestore";
import { db } from "firebaseApp";
import { deleteQuestionSwal, postProps } from "./postList";
import { toast } from "react-toastify";
import Comment from "./comment";
import Loader from "./loader";
import AuthContext from "context/authContext";

export default function PostDetail() {
  const [post, setPost] = useState<postProps | null>(null);
  const params = useParams();
  const navigator = useNavigate();

  const getData = async (id: string) => {
    const docRef = doc(db, "posts", id);
    const docSnap = await getDoc(docRef);
    setPost({ id: docSnap.id, ...(docSnap.data() as postProps) });
  };

  useEffect(() => {
    if (params?.id) {
      getData(params.id);
    }
  }, [post]);

  const handleDelete = () => {
    deleteQuestionSwal().then(async (res) => {
      if (res.isConfirmed) {
        try {
          if (post?.id) {
            await deleteDoc(doc(db, "posts", post.id));
            toast.success("삭제되었습니다! 😁");
            navigator("/");
          }
        } catch (err) {
          console.log(err);
          toast.warning("문제가 발생하였습니다. 😫");
        }
      }
    });
  };

  const { user } = useContext(AuthContext);

  return (
    <>
      <div className="post__detail">
        {post ? (
          <>
            <div className="post__box">
              <div className="post__title">{post?.title}</div>
            </div>
            <div className="post__profile-box">
              <div className="post__profile-img"></div>
              <div className="post__author-name">{post?.email}</div>
              <div className="post__date">{post?.createdAt}</div>
            </div>
            <div className="post__utils-box">
              {post?.category && (
                <div className="post__category">{post.category}</div>
              )}
              {post.email === user?.email && (
                <>
                  <div className="post__edit">
                    <Link to={`/posts/edit/${post?.id}`}>수정</Link>
                  </div>
                  <div className="post__delete" onClick={handleDelete}>
                    삭제
                  </div>
                </>
              )}
            </div>
            <div className="post__content post__content--pre-wrap">
              {post?.content}
            </div>
            <Comment post={post} getData={getData} />
          </>
        ) : (
          <>
            <Loader />
          </>
        )}
      </div>
    </>
  );
}
