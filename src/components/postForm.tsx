import { useContext, useEffect, useState } from "react";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "firebaseApp";
import AuthContext from "context/authContext";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { categoryType, postProps } from "./postList";

export interface postForm {
  title: string;
  summary: string;
  content: string;
  category: categoryType | string;
}

export const Categories: categoryType[] = ["Frontend", "Backend", "Web", "Native"];
export default function PostForm() {
  const { user } = useContext(AuthContext);
  const [postData, setPostData] = useState<postProps | null>();
  const navigate = useNavigate();

  const path = useParams();

  const getData = async (id: string) => {
    const docRef = doc(db, "posts", id);
    const docSnap = await getDoc(docRef);
    setPostData({ id: docSnap.id, ...(docSnap.data() as postProps) });
  };
  console.log(postData);

  useEffect(() => {
    if (path?.id) getData(path?.id);
  }, []);

  const [inputValue, setInputValue] = useState<postForm>({
    title: "",
    summary: "",
    content: "",
    category: "",
  });

  const handleInputValue = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const {
      target: { name, value },
    } = e;

    setInputValue({
      ...inputValue,
      [name]: value as categoryType,
    });
  };

  useEffect(() => {
    if (postData) {
      setInputValue({
        ...inputValue,
        title: postData.title,
        summary: postData.summary,
        content: postData.content,
        category: postData.category as categoryType,
      });
    }
  }, [postData]);

  const onSubmit = async () => {
    try {
      if (postData?.id) {
        //edit
        const postRef = doc(db, "posts", postData.id);
        await updateDoc(postRef, {
          ...inputValue,
          updatedAt: new Date().toLocaleDateString("ko", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          }),
        });

        toast.success("게시글을 수정했습니다! 😁");
        navigate(`/posts/detail/${path.id}`);
      } else {
        //create
        await addDoc(collection(db, "posts"), {
          ...inputValue,
          createdAt: new Date().toLocaleDateString("ko", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          }),
          email: user?.email,
          uid: user?.uid,
        });
        toast?.success("게시글을 생성했습니다! 😘");
        navigate("/");
      }
    } catch (err) {
      console.log(err);
      toast.error("문제가 발생했습니다. 다시 시도하세요.");
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
        <h3>카테고리</h3>
        <select
          name="category"
          id="category"
          onChange={handleInputValue}
          value={inputValue.category}
        >
          <option value="">카테고리를 선택해주세요.</option>
          {Categories.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
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
