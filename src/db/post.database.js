import Post from '../models/post.model';

const fetch = async () => {
  const posts = await Post.find({});
  return posts;
};


const findById = async (req) => {
  const findPost = await Post.findById(req);
  return findPost;
};

const post = async (req) => {
  const insertPost = new Post({
    name: req.body.name,
    location: {
      lng: req.body.lng,
      lat: req.body.lat,
    },
    contact: req.body.contact,
    address: req.body.address,
    city: req.body.city,
    state: req.body.state,
    postal_code: req.body.postal_code,
    country_code: req.body.country_code,
    phone: req.body.phone,
    email: req.body.email,
    website: req.body.website,
  });

  const newPost = await Post.create(insertPost);

  return newPost;
};

const update = async (postId, req) => {
  const updatePost = await Post.findByIdAndUpdate(postId, { $set: req.body }, { new: true });
  return updatePost;
};


const destroy = async (req) => {
  const destroyPost = await Post.deleteById(req);
  return destroyPost;
};


module.exports = {
  fetch,
  findById,
  post,
  update,
  destroy,
};
