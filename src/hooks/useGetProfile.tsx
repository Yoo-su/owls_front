import { useState, useCallback } from 'react'
import { getProfile } from 'api/user';
import { PostType, Friend } from "types";

interface DataType {
    friends: Friend[],
    posts: PostType[],
    user: {
        user_nickname: string;
        user_email: string;
        user_name: string;
        user_avatar: string;
        user_id: number;
    },
}

const useGetProfile = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<DataType | null>(null);
    const [error, setError] = useState(null);

    const execute = (user_id: number) => {
        setLoading(true);
        getProfile(user_id).then(res => {
            setData(res)
            setLoading(false);
        }).catch(err => {
            setError(err);
            setLoading(false);
            throw err;
        })
    }

    return { loading, data, error, execute: useCallback(execute, []) };
}

export default useGetProfile