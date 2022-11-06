import { useEffect } from "react";
import Router from "router";
import { setUser } from "store/slice/userSlice";
import { useAppDispatch } from "store/hook";
import "css/global.css";

const App = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const parsedUser = JSON.parse(user);
      dispatch(
        setUser({
          userEmail: parsedUser.email,
          userNickname: parsedUser.nickname
        }))
    }
  })

  return (
    <div className="App">
      <Router />
    </div>
  );
}

export default App;
