import Nav from "components/Nav";
import MyCarousel from "components/carousel";
import Footer from "components/footer";
import PostList from "components/postList";

export default function Home() {
  return (
    <>
      <Nav />
      <MyCarousel/>
       <PostList/>
      <Footer />
    </>
  );
}
