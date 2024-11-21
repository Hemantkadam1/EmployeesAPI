articles = [
  { id: 1, title: 'Introduction to JavaScript', author: 'Jane Smith' },
  { id: 2, title: 'Advanced CSS Techniques', author: 'Tom Brown' },
];

let comments = [{ id: 1, articleId: 1, content: 'Very informative article!' }];

let users = [{ id: 1, name: 'Alice Johnson', email: 'alice@example.com' }];

function getAllArticles()
{
  return articles;
}
function getArticleById(id)
{
  return articles.find((article)=> article.id === id);
}
function getAllComments()
{
  return comments;
}
function getCommentsById(id)
{
  return comments.find((comment)=> comment.id === id);
}
function getUserById(id)
{
  return users.find((user)=> user.id === id);
}
module.exports = { getAllArticles , getArticleById, getAllComments ,getCommentsById ,getUserById }