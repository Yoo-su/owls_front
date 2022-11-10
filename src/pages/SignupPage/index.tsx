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
import SnackAlert from 'components/common/SnackAlert';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { signup } from 'api/user';

const theme = createTheme();

const SignupPage = () => {
    /* 스낵바 알림 메시지 관련 state */
    const [openAlert, setOpenAlert] = React.useState(false);
    const [alertType, setAlertType] = React.useState<"success" | "danger" | "info">("success");
    const [alertMsg, setAlertMsg] = React.useState("");

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        signup(data.get("name") || '', data.get("nickname") || '', data.get("email") || '', data.get("password") || '')
            .then(res => {
                if (res.data.success === false) {
                    setAlertMsg(res.data.msg);
                    setAlertType("danger");
                    setOpenAlert(true);
                }
                else {
                    setAlertMsg("회원가입이 완료되었습니다");
                    setAlertType("success");
                    setOpenAlert(true);
                    setTimeout(() => {
                        window.location.href = "/signin";
                    }, 2000);
                }
            })
            .catch((err) => {
                setAlertMsg("오류가 발생했습니다");
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
                        Sign up
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="given-name"
                                    name="name"
                                    required
                                    fullWidth
                                    id="name"
                                    label="이름"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="nickname"
                                    label="닉네임"
                                    name="nickname"
                                    autoComplete="nickname"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="이메일 주소"
                                    name="email"
                                    autoComplete="email"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="비밀번호"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            회원가입
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="/signin" variant="body2">
                                    이미 계정이 있으신가요? 로그인
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

export default SignupPage;