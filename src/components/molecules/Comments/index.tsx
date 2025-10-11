import { FC, useState, ChangeEvent } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Divider,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import {
  useCommentMutation,
  useGetCommentsByArticleQuery,
} from "store/services/commentsApi";

interface Author {
  _id: string;
  email: string;
  username: string;
}

interface Comment {
  _id: string;
  text: string;
  author: Author;
  article: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface CommentsProps {
  articleId: string;
  currentUserId: string;
}

const Comments: FC<CommentsProps> = ({ articleId, currentUserId }) => {
  const [newComment, setNewComment] = useState("");

  const {
    data: comments = [],
    isLoading,
    isError,
  } = useGetCommentsByArticleQuery(articleId);

  const [postComment, { isLoading: isPosting }] = useCommentMutation();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewComment(e.target.value);
  };

  const handleSubmit = async () => {
    if (!newComment.trim()) return;

    try {
      await postComment({
        text: newComment,
        author: currentUserId,
        article: articleId,
      }).unwrap();
      setNewComment("");
    } catch (error) {
      console.error("Failed to post comment:", error);
    }
  };

  return (
    <Box sx={{ mt: 4, mb: 4, maxWidth: 800, mx: "auto" }}>
      {/* Comment Form */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Add a Comment
        </Typography>
        <TextField
          fullWidth
          multiline
          rows={3}
          value={newComment}
          onChange={handleInputChange}
          placeholder="Write your comment..."
          variant="outlined"
          sx={{ mb: 2 }}
          disabled={isPosting}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={isPosting || !newComment.trim()}
          startIcon={isPosting ? <CircularProgress size={20} /> : null}
        >
          Post Comment
        </Button>
      </Box>

      {/* Comments List */}
      <Typography variant="h5" gutterBottom>
        Comments ({comments.length})
      </Typography>
      <Divider sx={{ mb: 2 }} />

      {isLoading ? (
        <Box sx={{ textAlign: "center" }}>
          <CircularProgress />
        </Box>
      ) : isError ? (
        <Typography color="error" textAlign="center">
          Failed to load comments. Please try again.
        </Typography>
      ) : comments.length === 0 ? (
        <Typography variant="body1" color="text.secondary" textAlign="center">
          No comments yet. Be the first to comment!
        </Typography>
      ) : (
        comments.map((comment: Comment) => (
          <Card
            key={comment._id}
            sx={{
              mb: 2,
              p: 2,
              backgroundColor: "#f5f5f5",
              borderRadius: 2,
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
          >
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 1,
                }}
              >
                <Typography variant="subtitle1" fontWeight="bold">
                  {comment.author.username}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {comment.createdAt}
                </Typography>
              </Box>
              <Typography variant="body1" color="text.primary">
                {comment.text}
              </Typography>
            </CardContent>
          </Card>
        ))
      )}
    </Box>
  );
};

export default Comments;