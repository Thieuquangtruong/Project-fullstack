import * as React from 'react';
import { PersonAddOutlined, PersonRemoveOutlined, DeleteOutline, EditOutlined, CloseOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme, useMediaQuery } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deletePost, setFriends, getPostById, selectPost } from "state";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";
import { toast } from "react-hot-toast";

import MyEditPostWidget from 'scenes/widgets/MyEditPostWidget';

import Dialog from '@mui/material/Dialog';

const HeaderPost = ({ friendId, name, subtitle, userPicturePath, postId, userId, post }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);

  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  const isFriend = friends.find((friend) => friend._id === friendId);
  const user = useSelector((state) => state.user);

  // open and close dialog edit post
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const patchFriend = async () => {
    const response = await fetch(
      `http://localhost:3001/users/${_id}/${friendId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    dispatch(setFriends({ friends: data }));
  };

  const deletePosts = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/posts/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });

      dispatch(deletePost({ id }));
      toast.success("Đã xóa bài viết thành công")
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <FlexBetween>
      <FlexBetween gap="1rem">
        <UserImage image={userPicturePath} size="55px" />
        <Box
          onClick={() => {
            navigate(`/profile/${friendId}`);
            navigate(0);
          }}
        >
          <Typography
            color={main}
            variant="h5"
            fontWeight="500"
            sx={{
              "&:hover": {
                color: palette.primary.light,
                cursor: "pointer",
              },
            }}
          >
            {name}
          </Typography>
          <Typography color={medium} fontSize="0.75rem">
            {subtitle}
          </Typography>
        </Box>
      </FlexBetween>
      <FlexBetween gap="1rem">
        {
          userId != user?._id &&
          <IconButton
            onClick={() => patchFriend()}
            sx={{ backgroundColor: primaryLight, p: "0.6rem" }}
          >
            {isFriend ? (
              <PersonRemoveOutlined sx={{ color: primaryDark }} />
            ) : (
              <PersonAddOutlined sx={{ color: primaryDark }} />
            )}
          </IconButton>
        }
        {
          userId == user?._id && <IconButton
            onClick={() => deletePosts(postId)}
            sx={{ backgroundColor: primaryLight, p: "0.6rem" }}
          >
            <DeleteOutline sx={{ color: primaryDark }} />
          </IconButton>
        }
        {
          userId == user?._id && <IconButton
            onClick={handleClickOpen}
            sx={{ backgroundColor: primaryLight, p: "0.6rem" }}
          >
            <EditOutlined sx={{ color: primaryDark }} />
          </IconButton>
        }
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth="true">
          <FlexBetween gap="1.5rem" sx={{ p: "1rem" }}>
            <Typography
              color={palette.neutral.dark}
              variant="h4"
              fontWeight="500"
              sx={{ p: "0.6rem" }}
            >
              Chỉnh sửa bài viết
            </Typography>
            <IconButton
              onClick={handleClose}
              sx={{ backgroundColor: primaryLight, p: "0.6rem" }}
            >
              <CloseOutlined sx={{ color: primaryDark }} />
            </IconButton>
          </FlexBetween>
          <Box width="100%" sx={{ p: "1rem" }} >
            <MyEditPostWidget post={post} picturePath={user.picturePath} postId={postId} handleClose={handleClose} />
          </Box>
        </Dialog>
      </FlexBetween>
    </FlexBetween>
  );
};

export default HeaderPost;
