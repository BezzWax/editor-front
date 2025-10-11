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
  Container,
} from "@mui/material";
import { AllArticles, ArticleEditor } from "components";
import { getUserData } from "utils";
import { useGetArticleByUserIdQuery } from "store/services/articlesApi";

const Profile: FC = () => {
  const user = getUserData();
  const [editing, setEditing] = useState(false);

  const { data } = useGetArticleByUserIdQuery(user.username);

  return (
    <Box p={4} maxWidth={1200} mx="auto">
      <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
        <Stack spacing={2} alignItems="center">
          <Avatar sx={{ width: 80, height: 80 }}>
            {user?.username.charAt(0)}
          </Avatar>
          {editing ? (
            <>
              <TextField label="Name" value={user?.username} fullWidth />
              <TextField label="Email" value={user?.email} fullWidth />
            </>
          ) : (
            <>
              <Typography variant="h5">{user?.username}</Typography>
              <Typography color="text.secondary">{user?.email}</Typography>
            </>
          )}
          <Button variant="contained" onClick={() => setEditing(!editing)}>
            {editing ? "Save" : "Create article"}
          </Button>
        </Stack>
      </Paper>

      <Dialog
        open={editing}
        onClose={() => setEditing(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>New article</DialogTitle>
        <DialogContent>
          <ArticleEditor onChange={() => setEditing(!editing)} />
        </DialogContent>
      </Dialog>

      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <AllArticles data={data} />
      </Container>

    </Box>
  );
};

export default Profile;
