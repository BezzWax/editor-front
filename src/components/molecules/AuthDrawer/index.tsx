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
import { useRegisterUserMutation } from "store/services/authApi";
import { setAuthData } from "store/slice/authSlice";

type AuthDrawerProps = {
  open: boolean;
  onClose: () => void;
};

const AuthDrawer: FC<AuthDrawerProps> = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const [registerUser, { isLoading }] = useRegisterUserMutation();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [tab, setTab] = useState(0);

  const handleTabChange = (_: unknown, newValue: number) => {
    setTab(newValue);
  };

  const handleRegister = async () => {
    try {
      const response = await registerUser({
        email,
        username,
        password,
      }).unwrap();
      dispatch(setAuthData(response));
      onClose();
    } catch (err) {
      console.error("Registration failed:", err);
    }
  };

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box width={300} p={3} role="presentation">
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
              <TextField label="Email" fullWidth />
              <TextField label="Пароль" type="password" fullWidth />
              <Button variant="contained" color="primary">
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
