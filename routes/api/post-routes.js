const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// create a new post
router.post('/', withAuth, async (req, res) => {
  try {
    const { body, title } = req.body;
    const postData = await Post.create({
      user_id: req.session.user_id,
      title,
      body
    });

    if (!postData) {
      return res.status(500).json({
        message: "Failed to create post."
      });
    }

    return res.status(200).json({message: `Post was successfully created.`});

  } catch (err) {
    err.message = err.message ?? `Failed to create post.`
    res.status(400).json(err);
  }
});

// update a post
router.put('/:id', withAuth, async (req, res) => {
  try {
    const { body, title } = req.body;
    const [updatedRows, updatedPosts] = await Post.update(
      { title, body },
      {
        where: { id: req.params.id, user_id: req.session.user_id}
      }
    );
    if (!updatedRows) {
      return res.status(400).json({
        message: "Failed to update post."
      });
    }

    return res.status(200).json({message: `Post updated.`});
  } catch (err) {
    res.status(400).json(err);
  }
});

// delete a post
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const deleteResult = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id
      }
    });
    if (!deleteResult) {
      return res.status(400).json({
        message: "Failed to delete post."
      });
    }

    return res.status(200).json({message: `Post deleted.`});
  } catch (err) {
    res.status(400).json(err);
  }
});

// add a comment to a post
router.post('/:id/comment', withAuth, async (req, res) => {
  try {
    const commentData = await Comment.create({
      post_id: parseInt(req.params.id),
      user_id: req.session.user_id,
      body: req.body.body
    });
    if (!commentData) {
      return res.status(500).json({
        message: "Failed to create comment."
      });
    }
    return res.status(200).json({ message: "Comment was successfully added."});
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;