import { useContext, useState } from "react";
import { postProps } from "./postList";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "firebaseApp";
import AuthContext from "context/authContext";
import { toast } from "react-toastify";

// const commentList = [
//   {
//     id: 1,
//     content: "댓글😎",
//     createdAt: "2023-01-03",
//     email: "ss@naver.com",
//   },
//   {
//     id: 2,
//     content: "댓글😊",
//     createdAt: "2023-01-03",
//     email: "ss@naver.com",
//   },
//   {
//     id: 3,
//     content: "댓글🙄",
//     createdAt: "2023-01-03",
//     email: "ss@naver.com",
//   },
//   {
//     id: 4,
//     content: "댓글🥰🥰",
//     createdAt: "2023-01-03",
//     email: "ss@naver.com",
//   },
// ];

interface CommentProps {
  post: postProps;
  getData: (id: string) => void;
}

export default function Comment({ post, getData }: CommentProps) {
  const [comment, setComment] = useState<string>("");

  // const [commentList, setCommetList] = useState();

  const { user } = useContext(AuthContext);

  const handleComment = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const {
      target: { name, value },
    } = e;
    setComment(value);
  };

  const onSubmit = async () => {
    try {
      if (post && post.id) {
        const postRef = doc(db, "posts", post.id);
        if (user?.uid) {
          const commentObj = {
            content: comment,
            uid: user.uid,
            email: user.email,
            createdAt: new Date().toLocaleDateString("ko", {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            }),
          };

          await updateDoc(postRef, {
            comment: arrayUnion(commentObj),
            updatedAt: new Date().toLocaleDateString("ko", {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            }),
          });
          await getData(post.id);
        }
        toast.success("댓글이 성공적으로 달렸습니다! 🥳");
      }
      setComment("");
    } catch (err: any) {
      console.log(err);
      toast.error(err);
    }
  };

  return (
    <div className="comment">
      <div className="post__detail-gap">
        <label htmlFor="comment">댓글 입력</label>
        <div className="comment__text-box">
          <textarea
            name="comment"
            id="comment"
            className="comment__textarea"
            rows={6}
            onChange={handleComment}
            value={comment}
            required
            placeholder="댓글을 입력해보세요."
          ></textarea>
          <div className="post__detail-submit" onClick={onSubmit}>
            입력
          </div>
        </div>
      </div>
      <div className="comment__list">
        {post?.comment
          ?.slice(0)
          .reverse()
          .map((item) => (
            <div key={`comment_${item.createdAt}`} className="comment__box">
              <div className="comment__box-profile">
                <span>{item.email}</span>
                <span>{item.createdAt}</span>
                {item.email === user?.email && (
                  <div className="comment__edit-box">
                    <span className="">수정</span>
                    <span>삭제</span>
                  </div>
                )}
              </div>
              <div className="comment__content">{item.content}</div>
            </div>
          ))}
      </div>
    </div>
  );
}
