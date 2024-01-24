import { Link } from "react-router-dom";

export default function PostDetail() {
  return (
    <>
      <div className="post__detail">
        <div className="post__box">
          <div className="post__title">게시물</div>
        </div>
        <div className="post__profile-box">
          <div className="post__profile-img"></div>
          <div className="post__author-name">user@test.com</div>
          <div className="post__date">2023-12-30</div>
        </div>
        <div className="post__utils-box">
          <div className="post__edit"><Link to={`/posts/edit/1`}>수정</Link></div>
          <div className="post__delete">삭제</div>
        </div>
        <div className="post__content">
          사면·감형 및 복권에 관한 사항은 법률로 정한다. 대통령은 국가의 안위에
          관계되는 중대한 교전상태에 있어서 국가를 보위하기 위하여 긴급한 조치가
          필요하고 국회의 집회가 불가능한 때에 한하여 법률의 효력을 가지는
          명령을 발할 수 있다. 정당은 그 목적·조직과 활동이 민주적이어야 하며,
          국민의 정치적 의사형성에 참여하는데 필요한 조직을 가져야 한다.
        </div>
      </div>
    </>
  );
}
