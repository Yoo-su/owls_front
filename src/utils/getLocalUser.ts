interface User {
    user_email: string;
    user_avatar: string;
    user_name: string;
    user_nickname: string;
    user_id: number;
}

const getLocalUser = (): User | null => {
    const user = localStorage.getItem("user");
    if (user) {
        return JSON.parse(user);
    } else {
        return null;
    }
}

export default getLocalUser;