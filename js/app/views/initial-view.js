define(function () {
    const internals = {
        handlers: {},
        elements: {},
        questions: null,
    };

    const externals = {};

    externals.renderStartButton = function () {
        $('#button').removeAttr('hidden');
    };

    return externals;
});