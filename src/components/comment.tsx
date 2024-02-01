import { useState } from "react";
import { postProps } from "./postList";

const commentList = [
  {
    id: 1,
    content: "댓글😎",
    createdAt: "2023-01-03",
    email: "ss@naver.com",
  },
  {
    id: 2,
    content: "댓글😊",
    createdAt: "2023-01-03",
    email: "ss@naver.com",
  },
  {
    id: 3,
    content: "댓글🙄",
    createdAt: "2023-01-03",
    email: "ss@naver.com",
  },
  {
    id: 4,
    content: "댓글🥰🥰",
    createdAt: "2023-01-03",
    email: "ss@naver.com",
  },
];

interface CommentProps {
  post : postProps
}

export default function Comment({post} : CommentProps) {
  const [comment, setComment] = useState<string>("");

  const handleComment = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const {
      target: { name, value },
    } = e;
    setComment(value);
  };

  const onSubmit = async () => {
    try {
    } catch (err) {
      console.log(err);
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
            required
            placeholder="댓글을 입력해보세요."
          ></textarea>
          <div className="post__detail-submit" onClick={onSubmit}>
            입력
          </div>
        </div>
      </div>
      <div className="comment__list">
        {commentList.map((item) => (
          <div key={`comment_${item.id}`} className="comment__box">
            <div className="comment__box-profile">
              <span>{item.email}</span>
              <span>{item.createdAt}</span>
              <div className="comment__edit-box">
                <span className="">수정</span>
                <span>삭제</span>
              </div>
            </div>
            <div className="comment__content">{item.content}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
