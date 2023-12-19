define(["views/quiz-view", "services/quiz-service"], function (
  quizView,
  quizService
) {
  const externals = {};
  const internals = {};

  externals.start = function () {
    internals.bindEventHandlers();
    quizView.render();
  };

  internals.bindEventHandlers = function () {
    quizView.bind("button", internals.buttonHandler);
  };

  internals.buttonHandler = function () {
    var categoryId = Math.floor(Math.random() * 25 ) + 9;

    quizService.getQuestions(categoryId, function (questions) {
      quizView.render(questions);
    });

  };

  return externals;
});
