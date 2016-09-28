var quizApp {

    var state = {
        // landing page = (0), question 1 = (1), solution 1 = (2) ...
        // solution 10 = (20), results page = (21)
        page: 0,
        // 1 point for each correct answer
        points: 0
    };

    var questionsList = [
        ['Which is a logical equivalent to:'],
        []

    ];

    var choicesList = [
        ['a && c', 'a && d', 'b && c', 'b && d'],
        []

    ];

    var answersList = [
        'a && c',

    ];

    var solutionText = [

    ];

    var howGood = [
        'godawful',
        'pathetic',
        'pathetic',
        'lousy',
        'lousy',
        'unremarkable',
        'unremarkable',
        'competent',
        'competent',
        'superb',
        'phenomenal'
    ];

};
