import { SetStateAction, Dispatch } from "react";

export interface Props {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    msg: string;
    alertType: "success" | "danger" | "info"
};