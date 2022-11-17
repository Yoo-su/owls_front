import { useEffect } from "react";
import Router from "router";
import SnackAlert from "components/common/SnackAlert";
import { setUser } from "store/slice/userSlice";
import { useAppDispatch } from "store/hook";
import { get_friends } from "store/asyncThunks";
import getLocalUser from "utils/getLocalUser";
import "css/global.css";

const App = () => {
  const dispatch = useAppDispatch();
  const user = getLocalUser();

  useEffect(() => {
    if (user) {
      dispatch(
        setUser({
          userEmail: user.user_email,
          userNickname: user.user_nickname,
          userName: user.user_name,
          userAvatar: user.user_avatar,
        }))
      dispatch(get_friends(user.user_email));
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
