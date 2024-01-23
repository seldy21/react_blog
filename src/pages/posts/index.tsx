import Nav from "components/Nav";
import Footer from "components/footer";
import PostList from "components/postList";

export default function PostsPage() {
  return(<>
  <Nav/>
  <PostList hasNavigation={false}/>
  <Footer/>
  </>)
}