import postDB from '../db/post.database';
import logger from '../configs/winston.config';

const getPosts = async (req, res) => {
  try {
    const posts = await postDB.fetch();

    if (posts.length > 0) {
      return res.status(200).json({
        message: 'Posts fetched successfully',
        count: posts.length,
        data: posts,
      });
    }

    return res.status(404).json({
      code: 'NO_RECORDS_FOUND',
      description: 'No posts found in the system',
    });
  } catch (error) {
    //   log the error so that we can review it
    logger.info(`An error occured with this request. ${error.message}`);

    // return an error to the requestor
    return res.status(500).json({
      code: 'SERVER_ERROR',
      description: `Something went wrong, Please try again: ${error.message}`,
    });
  }
};

const getPostById = async (req, res) => {
  try {
    const post = await postDB.findById(req.params.id);
    if (post) {
      return res.status(200).json({
        message: `post with id ${req.params.id} fetched successfully`,
        data: post,
      });
    }

    return res.status(404).json({
      code: 'BAD_REQUEST_ERROR',
      description: 'No post found in the system',
    });
  } catch (error) {
    logger.info(`An error occured with this request. ${error.message}`);
    return res.status(500).json({
      code: 'SERVER_ERROR',
      description: 'something went wrong, Please try again',
    });
  }
};


const createPost = async (req, res) => {
  try {
    const newPost = await postDB.post(req);

    if (newPost) {
      logger.info(`the new vendor information is ${newPost}`);
      return res.status(201).json({
        message: 'new post created successfully',
        data: newPost,
      });
    }
  } catch (error) {
    logger.info(error.message);
    return res.status(500).json({
      code: 'SERVER_ERROR',
      description: 'something went wrong, Please try again',
    });
  }
};

const updatePost = async (req, res) => {
  try {
    const postExists = await postDB.findById(req.params.id);

    if (postExists) {
      const updatedPost = await postDB.update(req.params.id, req);

      if (updatedPost) {
        return res.status(201).json({
          message: 'post updated successfully',
          data: updatedPost,
        });
      }
    }
    return res.status(404).json({
      code: 'BAD_REQUEST_ERROR',
      description: 'No post found in the system',
    });
  } catch (error) {
    logger.info(error.message);
    return res.status(500).json({
      code: 'SERVER_ERROR',
      description: 'something went wrong, Please try again',
    });
  }
};

const deletePost = async (req, res) => {
  try {
    const post = await postDB.destroy(req.params.id);
    if (post) {
      return res.status(204).json({});
    }

    return res.status(404).json({
      code: 'BAD_REQUEST_ERROR',
      description: 'No post found in the system',
    });
  } catch (error) {
    logger.info(error.message);
    return res.status(500).json({
      code: 'SERVER_ERROR',
      description: 'something went wrong, Please try again',
    });
  }
};


module.exports = {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
};
