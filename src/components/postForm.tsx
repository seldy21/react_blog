import { useContext, useState } from "react";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { db } from "firebaseApp";
import AuthContext from "context/authContext";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

export interface postForm {
  title: string;
  summary: string;
  content: string;
}

export default function PostForm() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const path = useParams();

  // const docRef = doc(db, "posts", path.id)

  const getData = async () => {

  }

  const [inputValue, setInputValue] = useState<postForm>({
    title: "",
    summary: "",
    content: "",
  });

  const handleInputValue = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const {
      target: { name, value },
    } = e;

    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const onSubmit = async () => {
    try {
      await addDoc(collection(db, "posts"), {
        ...inputValue,
        createdAt: new Date().toLocaleDateString(),
        email: user?.email
      });
      toast?.success("게시글을 생성했습니다!")
      navigate("/");
    } catch (err) {
      console.log(err);
      toast.error("문제가 발생했습니다. 다시 시도하세요.")
    }
  };

  return (
    <div className="post__detail">
      <div className="post__detail-gap">
        <h3>제목</h3>
        <input
          type="text"
          className="post__datail-input"
          name="title"
          placeholder="제목을 입력하세요"
          value={inputValue.title}
          onChange={handleInputValue}
        />
      </div>
      <div className="post__detail-gap">
        <h3>요약</h3>
        <input
          type="text"
          className="post__datail-input"
          name="summary"
          placeholder="제목을 입력하세요"
          value={inputValue.summary}
          onChange={handleInputValue}
        />
      </div>
      <div className="post__detail-gap">
        <h3>내용</h3>
        <textarea
          className="post_detail-textarea"
          name="content"
          placeholder="내용을 입력하세요"
          value={inputValue.content}
          onChange={handleInputValue}
        />
      </div>
      <div className="post__detail-btns">
        <button className="post__detail-submit" onClick={onSubmit}>
          확인
        </button>
        <button className="post__detail-cancel">취소</button>
      </div>
    </div>
  );
}
