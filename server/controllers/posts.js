import Post from "../models/Post.js";
import User from "../models/User.js";

/* CREATE */
export const createPost = async (req, res) => {
  try {
    const { userId, description, picturePath } = req.body;
    const user = await User.findById(userId);
    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      userPicturePath: user.picturePath,
      picturePath,
      likes: {},
      comments: [],
    });
    await newPost.save();

    res.status(201).json(newPost);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

/* READ */
export const getFeedPosts = async (req, res) => {
  try {
    const post = await Post.find().sort({ createdAt: "desc" });
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const post = await Post.find({ userId }).sort({ createdAt: "desc" });
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* UPDATE */
export const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(id);
    const isLiked = post.likes.get(userId);

    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const deletePost = async (req, res) => {
  try {
    const userId = req.user?.id
    const id = req.params.id

    const result = await Post.deleteOne({
      _id: id,
      userId: userId,
    })

    return res.status(200).json({ message: "delete post success" })
  } catch (error) {
    console.log(error)
    return res.status(500).json(error)
  }
}

export const getPostById = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Post.findById(id);

    return res.status(200).json(result)

  } catch (error) {
    console.log(error)
    return res.status(500).json(error);
  }
}

export const editPost = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Post.findByIdAndUpdate(id, req.body, {new: true});
    return res.status(200).json({message: "Cập nhật bài viết thành công", post: result})
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
}

