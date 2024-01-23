export default function PostForm() {
  return (
    <form className="post__detail">
      <div className="post__detail-gap">
        <h3>제목</h3>
        <input
          type="text"
          className="post__datail-input"
          name="title"
          placeholder="제목을 입력하세요"
        />
      </div>
      <div className="post__detail-gap">
        <h3>내용</h3>
        <textarea
          className="post_detail-textarea"
          name="content"
          placeholder="내용을 입력하세요"
        />
      </div>
      <div className="post__detail-btns">
        <button className="post__detail-submit">확인</button>
        <button className="post__detail-cancel">취소</button>
      </div>
    </form>
  );
}
