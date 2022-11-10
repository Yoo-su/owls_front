import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import SnackAlert from 'components/common/SnackAlert';
import { signin } from "api/user";
import { useAppDispatch } from 'store/hook'
import { setUser } from 'store/slice/userSlice';

const theme = createTheme();

const SignInPage = () => {
    /* 스낵바 알림 관련 */
    const [openAlert, setOpenAlert] = React.useState(false);
    const [alertType, setAlertType] = React.useState<"success" | "danger" | "info">("success");
    const [alertMsg, setAlertMsg] = React.useState("");

    const dispatch = useAppDispatch();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        signin(data.get('email') || '', data.get('password') || '')
            .then(res => {
                localStorage.setItem("token", res.data.access_token);
                localStorage.setItem("user", JSON.stringify(res.data.user));
                dispatch(setUser({ userEmail: res.data.user.email, userNickname: res.data.user.nickname }));
                window.location.href = "/";
            })
            .catch((err) => {
                if (err.response.data.statusCode === 401) {
                    setAlertMsg("로그인 정보를 확인해주세요");
                }
                else {
                    setAlertMsg("오류가 발생했습니다")
                }
                setAlertType("danger");
                setOpenAlert(true);

            })
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            로그인
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="/signup" variant="body2">
                                    {"회원가입"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
            <SnackAlert open={openAlert} setOpen={setOpenAlert} msg={alertMsg} alertType={alertType} />
        </ThemeProvider>
    );
}

export default SignInPage;