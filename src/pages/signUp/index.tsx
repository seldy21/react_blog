import Nav from "components/Nav";
import Footer from "components/footer";
import SignUpForm from "components/signUpForm";
import { Link } from "react-router-dom";

export default function SignUp() {
  return (
    <>
      <Nav />
      <SignUpForm/>
      <Footer/>
    </>
  );
}
