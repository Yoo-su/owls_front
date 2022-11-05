import { Fragment } from "react";
import { Snackbar as Snack } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import IconButton from "@mui/material/IconButton";
import { Props } from "./types";

const SnackAlert = ({ open, setOpen, msg, alertType }: Props) => {
    const handleStyle = (type: string) => {
        if (type === "success") {
            return {
                "& .MuiSnackbarContent-root": { backgroundColor: "#00ab66", color: "#fff" }
            }
        }
        else if (type === "danger") {
            return {
                "& .MuiSnackbarContent-root": { backgroundColor: "#b32134", color: "#fff" }
            }
        }
        else {
            return {
                "& .MuiSnackbarContent-root": { backgroundColor: "#24a0ed", color: "#fff" }
            }
        }
    }

    const handleClose = (
        event: React.SyntheticEvent | Event,
        reason?: string,
    ) => {
        if (reason === "clickaway") {
            return;
        }

        setOpen(false);
    };

    const action = (
        <IconButton color="inherit">
            <CloseIcon />
        </IconButton>
    );
    return (
        <Snack
            open={open}
            autoHideDuration={3000}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            onClose={handleClose}
            message={msg}
            action={action}
            sx={handleStyle(alertType)}
        />
    );
};

export default SnackAlert;