define(function () {
  const internals = {
    handlers: {},
    elements: {},
    questions: null,
  };

  const externals = {};

  let numberOfCorrectAnswers = 0;
  let currentQuestionIndex = 0;
  let correctAnswer;

  internals.createQuestion = function (question) {
    const answers = question.incorrect_answers.slice();
    correctAnswer = question.correct_answer;

    answers.push(correctAnswer);

    const shuffledAnswers = answers.sort(() => Math.random() - 0.5);

    const answerButtons = shuffledAnswers.map(answer => {
      const isCorrect = answer === correctAnswer;
      const buttonClass = isCorrect ? 'option correct-answer' : 'option';
      return `<button class="${buttonClass}" data-correct="${isCorrect}">${answer}</button>`;
    }).join('');


    const questionHtml = `
      <div>
        <p><strong>${question.question}</strong></p>
        <div class="answers">${answerButtons}</div>
      </div>
    `;

    $("#question").append(questionHtml);

    return questionHtml;
  };

  internals.updateProgress = function (currentIndex, totalQuestions) {
    const progress = (currentIndex / totalQuestions) * 100;
    $("#progress-container").css({
      "width": `${progress}%`, "background": "white",
    });
    $(".progress").html(`${currentIndex}/${totalQuestions}`);
  };

  internals.renderProgressBar = function () {
    const progressBar = `<div id="progressBar"><div id="progress-container"><progress></progress></div></div>`;
    $("#category").append(progressBar);
    return progressBar;
  };

  internals.renderProgress = function (currentIndex, totalQuestions) {
    const progress = `<div class="progress">${currentIndex}/${totalQuestions}</div>`;
    $("#category").append(progress);
    return progress;
  };

  internals.showCategory = function (question) {
    const category = "<div class='category'>" +
      "<p><h2>Category: " +
      question.category +
      "</h2></p>" +
      "</div>"
    $("#category").append(category);
    return category;
  };

  internals.showNumberOfCorrectAnswers = function () {
    $(".correctAnswers").empty();
    var number = "<div class='correctAnswers'>" +
      "<p><h2>Number of Correct Answers: " +
      numberOfCorrectAnswers +
      "</h2></p>" +
      "</div>"
    $("#category").append(number);
    return number;
  };


  internals.renderQuestion = function (question) {
    const questionHtml = internals.createQuestion(question);
    internals.showNumberOfCorrectAnswers();
    internals.elements.questionList.html(questionHtml);
  };

  internals.renderNextQuestion = function (questions) {
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.results.length) {
      const nextQuestion = questions.results[currentQuestionIndex];
      internals.renderQuestion(nextQuestion);
    } else {
      console.log("You had answered all questions.");
      internals.renderButton();
    }
  };


  internals.renderButton = function () {
    if (!internals.elements.button) {
      $("#button").click(internals.handlers["button"]);
      internals.elements.app.append(internals.elements.button);
    }
  };

  externals.bind = function (event, handler) {
    internals.handlers[event] = handler;
  };

  externals.render = function (questions) {
    internals.questions = questions;

    internals.elements.app = $("#question");

    internals.elements.questionList = $("#question");
    internals.elements.app.append(internals.elements.questionList);

    if (questions && Array.isArray(questions.results) && questions.results.length > 0) {
      $("#1").remove();
      $("#2").remove();
      $("#3").remove();
      $("#4").remove();
      $("#5").remove();
      $("#6").remove();
      $("#button").remove();
      console.log(questions.results[0]);
      internals.renderProgressBar();
      internals.renderProgress(currentQuestionIndex, questions.results.length);
      internals.showCategory(questions.results[0]);
      internals.renderQuestion(questions.results[0]);

    } else {
      console.log("Error");
    }

    internals.renderButton();
  };

  internals.showCorrect = function () {
    const correct = "<div>" +
      "<p><h2><strong>Correct!</strong></h2></p>" +
      "</div>";
    $("#output").append(correct);
    return correct;
  };

  internals.showIncorrect = function () {
    const incorrect = "<div>" +
      "<p><h2><strong>Wrong answer!</strong></h2></p>" +
      "</div>";
    $("#output").append(incorrect);
    return incorrect;
  };

  $('body').on('click', '.option', function () {
    const selectedAnswer = $(this).text();

    if (selectedAnswer === correctAnswer) {
      $(this).css({
        "background-color": "#50C878",
        "border-color": "white",
        "color": "white"
      });
      internals.showCorrect();
      numberOfCorrectAnswers++;

    } else {
      $(this).css({
        "background-color": "#EE4B2B",
        "border-color": "white",
        "color": "white"
      });

      $('.option').filter(function () {
        return $(this).text() === correctAnswer;
      }).css({
        "background-color": "#50C878",
        "border-color": "white",
        "color": "white"
      });

      internals.showIncorrect();

    }

    setTimeout(() => {
      internals.renderNextQuestion(internals.questions);
      internals.updateProgress(currentQuestionIndex, internals.questions.results.length);
      $("#output").empty();
    }, 2000);

  });

  return externals;
});
