define(["views/initial-view", "services/quiz-service"], function (
    initialView,
    quizService
) {
    const externals = {};
    const internals = {};

    let categoryId;

    internals.setCategory = function () {
        $('.dropdown ul li').click(function () {
            $('.dropdown ul li').each(function () {
                if ($(this).hasClass('selected')) {
                    $(this).removeClass('selected');
                }
            });
            $(this).addClass('selected');
            $('.dropdown h1').html($(this).html()).removeClass().addClass('selected-' + ($(this).index() + 1));

            if ($('.dropdown ul li.selected').length > 0) {
                initialView.renderStartButton();
                categoryId = $(this).attr('id');
            } else {
                initialView.removeStartButton();
                categoryId = null;
            }
        });
    };

    externals.getCategoryId = function () {
        return categoryId;
    };

    externals.start = function () {
        internals.setCategory();

    };

    return externals;
});