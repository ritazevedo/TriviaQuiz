define(["views/quiz-view"], function (
  quizView
) {
  const internals = {}; // internal state
  const externals = {}; // external api

  internals.getCategoriesUrl = function() {
    return "https://opentdb.com/api_category.php";
  };

  externals.getCategories = async function() {
    let response = await fetch(internals.getCategoriesUrl());
    let data = await response.json();

    return data.trivia_categories;
  };

  internals.fromUrl = function (categoryId) {
    let url = "https://opentdb.com/api.php?amount=10";

    if (categoryId) {
      url += `&category=${categoryId}`;
    }

    return url;
  };

  externals.getQuestions = async function (categoryId, cb) {
    let response = await fetch(internals.fromUrl(categoryId));
    let data = await response.json();

    cb(data);

    return data;
  };

  return externals;
});
