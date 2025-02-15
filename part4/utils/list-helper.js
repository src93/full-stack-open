const dummy = (blogs) => {
  return 1
}

const totalLikes = (posts) => {
  if (posts.length === 0) return 0;
  return posts.reduce((acc, current) => {
    return acc += current.likes
  }, 0);
}

const favoritePost = (posts) => {
  if (posts.length === 0) return null;
  const favorite = posts.reduce((acc, current) => {
    return acc.likes > current.likes ? acc : current
  }, posts[0]);
  return {
    title: favorite.title,
    author: favorite.author,
    likes: favorite.likes
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoritePost
}