import "./App.css";
import Router from "./components/Router";
import { useState } from "react";
import { app } from "firebaseApp";
import { getAuth } from "firebase/auth";

function App() {

  const auth = getAuth(app);
  console.log(auth.currentUser);
  // 사용자가 있으면 true, 없으면 false 변경
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!auth?.currentUser);
  return (
    <>
    <Router isAuthenticated={isAuthenticated}/>
    </>
  );
}

export default App;
