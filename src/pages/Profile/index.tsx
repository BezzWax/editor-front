import { FC, useState } from "react";
import {
  Box,
  Typography,
  Avatar,
  Button,
  TextField,
  Stack,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import { ArticleEditor } from "components";

const Profile: FC = () => {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("john@example.com");

  return (
    <Box p={4} maxWidth={600} mx="auto">
      <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
        <Stack spacing={2} alignItems="center">
          <Avatar sx={{ width: 80, height: 80 }}>{name.charAt(0)}</Avatar>
          {editing ? (
            <>
              <TextField
                label="Имя"
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
              />
              <TextField
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
              />
            </>
          ) : (
            <>
              <Typography variant="h5">{name}</Typography>
              <Typography color="text.secondary">{email}</Typography>
            </>
          )}
          <Button variant="contained" onClick={() => setEditing(!editing)}>
            {editing ? "Сохранить" : "Редактировать"}
          </Button>
        </Stack>
      </Paper>

      <Dialog
        open={editing}
        onClose={() => setEditing(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Новая статья</DialogTitle>
        <DialogContent>
          <ArticleEditor />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default Profile;
