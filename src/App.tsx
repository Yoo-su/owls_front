import { useEffect } from "react";
import Router from "router";
import SnackAlert from "components/common/SnackAlert";
import { setUser, setFriends } from "store/slice/userSlice";
import { useAppDispatch } from "store/hook";
import { getFriends } from "api/friend";
import "css/global.css";

const App = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const parsedUser = JSON.parse(user);
      dispatch(
        setUser({
          userEmail: parsedUser.user_email,
          userNickname: parsedUser.user_nickname,
          userName: parsedUser.user_name,
          userAvatar: parsedUser.user_avatar,
        }))
      getFriends(parsedUser.user_email).then(res => {
        dispatch(setFriends(res.data));
      }).catch(err => {
        console.log(err);
        localStorage.clear();
        window.location.href = "signin";
      })

    }
  }, []);

  return (
    <div className="App">
      <Router />

      <SnackAlert />
    </div>
  );
}

export default App;
