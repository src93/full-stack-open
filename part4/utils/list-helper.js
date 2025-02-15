const dummy = (blogs) => {
  return 1
}

const totalLikes = (posts) => {
  if (posts.length === 0) return 0;
  return posts.reduce((acc, current) => {
    return acc += current.likes
  }, 0);
}

module.exports = {
  dummy,
  totalLikes
}