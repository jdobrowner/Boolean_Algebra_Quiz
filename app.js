//*-------------- call functions when document is loaded -----------------*

$(function() {
    //setUpQuizToolsToggleButtons();
    beginQuiz();
    answerButtonHandlers();
});


//*---------- setup question page div and solution page div --------------*

function beginQuiz() {
    $('.quiz-container').on('click', '#begin-button', function(event) {

        quizApp.state.page = 0;
        var $landingPage = $('.landing-and-score-page');
        $landingPage.addClass('hidden');
        $landingPage.find('.words-container').children().remove();
        $landingPage.find('.button-container').children().remove();
        $('.progress-bar').removeClass('hidden');
        $('.quiz-container').removeClass('space-around');
        addQuestion();
    });
}


//*--------------- fill question page with content ---------------------*

function addQuestion() {
    $('.solution-page').addClass('hidden');
    $('.question-page').removeClass('hidden');

    var qNum = quizApp.state.questionNum;

    $('.notes-container').text(quizApp.questionsNotes[qNum]);
    $('.question-text').text(quizApp.questionsList[qNum]);
    $('.question-content').html(withVariables(quizApp.questionsContentList[qNum]));
    $('#a1').text(quizApp.choicesList[qNum][0]);
    $('#a2').text(quizApp.choicesList[qNum][1]);
    $('#a3').text(quizApp.choicesList[qNum][2]);
    $('#a4').text(quizApp.choicesList[qNum][3]);

    quizApp.state.page++;
}

//*----------- fill solution page with content -------------------------*

function addSolution() {
    $('.question-page').addClass('hidden');
    $('.solution-page').removeClass('hidden');

    var qNum = quizApp.state.questionNum;

    $('.correctness').text(quizApp.lastAnswerWas ? 'correct' : 'incorrect');
    $('.solution').text(quizApp.solutionText[qNum]);

    quizApp.state.page++;
    quizApp.state.questionNum++;
}

//*------------ add answer button event handlers -----------------------*

function answerButtonHandlers() {

    $('.quiz-container').on('click', '#a1', function(event) {
        //console.log('a1 clicked');
        determineCorrectness(1);
        switchPages();
    });
    $('.quiz-container').on('click', '#a2', function(event) {
        determineCorrectness(2);
        switchPages();
    });
    $('.quiz-container').on('click', '#a3', function(event) {
        determineCorrectness(3);
        switchPages();
    });
    $('.quiz-container').on('click', '#a4', function(event) {
        determineCorrectness(4);
        switchPages();
    });

    //*------- next question and retake quiz buttons --------*

    $('.quiz-container').on('click', '#next', function(event) {
        switchPages();
    });
    $('.quiz-container').on('click', '#retake', function(event) {
        resetQuiz();
    });

}

//*---------------- determine correctness of choice -------------------*

function determineCorrectness(n) {
    var qNum = quizApp.state.questionNum;
    quizApp.answersChosen.push(n);

    if (quizApp.answersChosen[qNum] === quizApp.answersList[qNum]) {
        quizApp.lastAnswerWas = true;
        quizApp.state.points++;
    } else {
        quizApp.lastAnswerWas = false;
    }

    colorProgressBar(qNum + 1, quizApp.lastAnswerWas);
}

//*------------------- add color to progress bar ----------------------*

function colorProgressBar(n, correct) {
    var color = correct ? 'green' : 'red';

    switch (n) {
        case 1:
            $('#pb1').addClass(color);
            break;
        case 2:
            $('#pb2').addClass(color);
            break;
        case 3:
            $('#pb3').addClass(color);
            break;
        case 4:
            $('#pb4').addClass(color);
            break;
        case 5:
            $('#pb5').addClass(color);
            break;
        case 6:
            $('#pb6').addClass(color);
            break;
        case 7:
            $('#pb7').addClass(color);
            break;
        default:
          break;
    }
}

//*----------- switch between questions and solutions pages -----------*

function switchPages() {
    if (quizApp.state.page === 20) finalPage();
    else quizApp.state.page % 2 === 0 ? addQuestion() : addSolution();
}

//*---------------------- set up final page --------------------------*

function finalPage() {
    $('.solution-page').addClass('hidden');
    $('.progress-bar').addClass('hidden');
    $('.quiz-container').addClass('space-around');

    var $score = $('.landing-and-score-page');
    $score.removeClass('hidden');

    var addText = '<h2><span class="huge">';
    addText += quizApp.howGood[quizApp.state.points] > 4 ? 'Congradulations!</span></br>You ' : 'Sorry,</span></br>but you '
    addText += 'are <span class="code">' + quizApp.howGood[quizApp.state.points] + '</span> at logic.</h2>';
    addText += '<p class="final-score">Your score:  <span class="code">' + quizApp.state.points + '</span> / 10</p>';
    var addButton = '<button id="retake" class="begin-quiz">try again</button>';
    $score.children('.words-container').html(addText);
    $score.children('.button-container').html(addButton);
}

//*------------------- reset state and commence quiz ---------------------*

function resetQuiz() {
    quizApp.state.page = 0;
    quizApp.state.points = 0;
    quizApp.state.questionNum = 0;
    quizApp.answersChosen = [];

    $('.landing-and-score-page').addClass('hidden');
    $('.progress-bar').removeClass('hidden');
    $('#pb1').removeClass('red green');
    $('#pb2').removeClass('red green');
    $('#pb3').removeClass('red green');
    $('#pb4').removeClass('red green');
    $('#pb5').removeClass('red green');
    $('#pb6').removeClass('red green');
    $('#pb7').removeClass('red green');
    $('.quiz-container').removeClass('space-around');
    addQuestion();
}

//*-------- add variables class to all variables in question content -------*

function withVariables(questionString) {
    var text = '';
    for (var i = 0; i < questionString.length; i++) {
        var char = questionString.charAt(i);
        if (char == 'a' || char == 'b' || char == 'c' || char == 'd') {
            text += "<span class='variable'>" + questionString[i] + "</span>";
        } else {
            text += questionString[i];
        }
    }
    return text;
}


//*------- hold the state and content of the app in global quizApp ---------*

var quizApp = {

    //*------------- state of the landing page ---------------*

    state: {
        // landing page = (-1), question 1 = (0), solution 1 = (1) ...
        // solution 10 = (19), results page = (20)
        page: -1,
        // 1 point for each correct answer
        points: 0,
        questionNum: 0,
        isPaperShowing: true,
        isTableShowing: true,
        lastAnswerWas: true
    },

    //*------------ app content ----------------------------*

    questionsNotes: [
        '// a, b, c, and d are unknown boolean variables',
        '// a, b, c, and d are unknown boolean variables',
        '// a, b, and c are unknown boolean variables',
        '// a, b, c, and d are unknown boolean variables',
        '// a and b are unknown boolean variables',
        '// a and b are unknown boolean variables',
        '// a and b are unknown boolean variables',
        '// a and b are unknown boolean variables',
        '// a and b are unknown boolean variables',
        '// a and b are unknown boolean variables',
    ],

    questionsList: [
        'Choose the logical equivalent to:',
        'Choose the logical equivalent to:',
        'Choose the logical equivalent to:',
        'Choose the logical equivalent to:',
        'Choose the logical equivalent to:',
        'Choose the logical equivalent to:',
        'What is the value of c?',
        'What is the value of c?',
        'What is the value of c?',
        'What is the value of c?'
    ],

    questionsContentList: [
        '( a || ( a && b )) && ( c && ( c || d ))',
        '!( a && b ) || ( !c || !d )',
        '( a || b ) || !( a && c )',
        '!( !a && !b && !c && !d )',
        'a || ( !a && b )',
        'a || ( b || !a )',
        'var c = a == b ? a && b : a || b;',
        'var c = a || b ? a : b;',
        'var c = a ? a : b;',
        'var c = a && b ? a : b;'
    ],

    choicesList: [
        ['a && c', 'a && d', 'b && c', 'b && d'],
        ['a && b && c && d', '!(a && b && c && d)', '!a || !b || c || d', '!(a || b || c || d)'],
        ['b && c', '!b && c', 'b || !c', '!b || c'],
        ['a || b || c || d', 'a && b && c && d', '!a || !b || !c || !d', '!(a || b || c || d)'],
        ['a || b', 'a && b', 'false', 'true'],
        ['a', 'b', 'a || b', 'true'],
        ['true', 'false', 'a && b', 'a || b'],
        ['true', 'false', 'a', 'b'],
        ['a', 'b', 'a || b', 'a && b'],
        ['a', 'b', 'a || b', 'a && b'],
    ],

    answersList: [1, 2, 3, 1, 1, 4, 4, 3, 3, 2],

    solutionText: ['( a ) && ( c ) by Absorption laws',
        "solution",
        "solution",
        "solution",
        "solution",
        "solution",
        "solution",
        "solution",
        "solution",
        "solution"
    ],

    answersChosen: [],

    howGood: [
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
    ]

};
