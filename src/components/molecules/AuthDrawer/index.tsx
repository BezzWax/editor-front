/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Drawer,
  Box,
  Tabs,
  Tab,
  Typography,
  TextField,
  Button,
  Stack,
} from "@mui/material";
import { FC, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useLoginUserMutation, useRegisterUserMutation } from "store/services/authApi";
import { setAuthData } from "store/slice/authSlice";

type AuthDrawerProps = {
  open: boolean;
  onClose: () => void;
};

const AuthDrawer: FC<AuthDrawerProps> = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const [loginUser, { isLoading: isLoginLoading }] = useLoginUserMutation();

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [registerUser, { isLoading }] = useRegisterUserMutation();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [tab, setTab] = useState(0);

  const handleTabChange = (_: unknown, newValue: number) => {
    setTab(newValue);
  };

  const handleLogin = async () => {
    try {
      const response = await loginUser({
        email: loginEmail,
        password: loginPassword,
      }).unwrap();
      dispatch(setAuthData(response));
      toast.success(`Добро пожаловать, ${response.user.username}!`);
      onClose();
    } catch (err: any) {
      console.error("Login failed:", err);
      const messages = err?.data?.message;
      if (Array.isArray(messages)) {
        messages.forEach((msg: string) => toast.error(msg));
      } else if (typeof messages === "string") {
        toast.error(messages);
      } else {
        toast.error("Произошла ошибка при входе");
      }
    }
  };

  const handleRegister = async () => {
    try {
      const response = await registerUser({
        email,
        username,
        password,
      }).unwrap();

      dispatch(setAuthData(response));
      toast.success(`Добро пожаловать, ${response.user.username}!`);
      onClose();

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error("Registration failed:", err);

      const messages = err?.data?.message;
      if (Array.isArray(messages)) {
        messages.forEach((msg: string) => toast.error(msg));
      } else if (typeof messages === "string") {
        toast.error(messages);
      } else {
        toast.error("Произошла ошибка при регистрации");
      }
    }
  };

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box width={300} p={3} role="presentation">

      {}
        <Tabs value={tab} onChange={handleTabChange} centered>
          <Tab label="Войти" />
          <Tab label="Регистрация" />
        </Tabs>

        {tab === 0 ? (
          <Box mt={3}>
            <Typography variant="h6" gutterBottom>
              Авторизация
            </Typography>
            <Stack spacing={2}>
              <TextField
                label="Email"
                fullWidth
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
              />
              <TextField
                label="Пароль"
                type="password"
                fullWidth
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleLogin}
                disabled={isLoginLoading}
              >
                Войти
              </Button>
            </Stack>
          </Box>
        ) : (
          <Box mt={3}>
            <Typography variant="h6" gutterBottom>
              Регистрация
            </Typography>
            <Stack spacing={2}>
              <TextField
                label="Email"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                label="Имя пользователя"
                fullWidth
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <TextField
                label="Пароль"
                type="password"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleRegister}
                disabled={isLoading}
              >
                Зарегистрироваться
              </Button>
            </Stack>
          </Box>
        )}
      </Box>
    </Drawer>
  );
};

export default AuthDrawer;
