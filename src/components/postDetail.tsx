import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "firebaseApp";
import { postProps } from "./postList";
import { toast } from "react-toastify";


export default function PostDetail() {
  const [post, setPost] = useState<postProps | null>();
  const params = useParams();

  const getData = async (id : string) => {
    const docRef = doc(db, "posts", id);
    const docSnap = await getDoc(docRef);
    setPost({id: docSnap.id, ...docSnap.data() as postProps})
  }

  useEffect(()=>{
    if (params?.id){
      getData(params.id)
    }
  },[]);

  const handleDelete = () => {

  }

  return (
    <>
      <div className="post__detail">
        <div className="post__box">
          <div className="post__title">{post?.title}</div>
        </div>
        <div className="post__profile-box">
          <div className="post__profile-img"></div>
          <div className="post__author-name">{post?.email}</div>
          <div className="post__date">{post?.createdAt}</div>
        </div>
        <div className="post__utils-box">
          <div className="post__edit"><Link to={`/posts/edit/${post?.id}`}>수정</Link></div>
          <div className="post__delete" onClick={handleDelete}>삭제</div>
        </div>
        <div className="post__content post__content--pre-wrap">
         {post?.content}
        </div>
      </div>
    </>
  );
}
