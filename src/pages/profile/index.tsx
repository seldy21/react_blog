import Nav from "components/Nav";
import Footer from "components/footer";
import PostList from "components/postList";
import Profile from "components/profile";
export default function ProfilePage() {
  return (
    <>
      <Nav />
      <Profile />
      <PostList hasNavigation={false}/>
      <Footer />
    </>
  );
}
