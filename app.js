//*-------------- call functions when document is loaded -----------------*

$(function() {
    setUpQuizToolToggleButtons();
});

//*--------- set up scratch paper and logic table toggle -------------*

function setUpQuizToolToggleButtons() {

    $('#paper-header').click( function(event) {
        toggleQuizTool($(this), quizApp.state.isPaperShowing);
        quizApp.state.isPaperShowing = !quizApp.state.isPaperShowing;
    });

    $('#table-header').click( function(event) {
        toggleQuizTool($(this), quizApp.state.isTableShowing);
        quizApp.state.isTableShowing = !quizApp.state.isTableShowing;
    });
}

function toggleQuizTool($button, isShowing) {
    if (isShowing) {
        $button.next().addClass('hidden');
        $button.find('span').text('+');
    }
    else {
        $button.next().removeClass('hidden');
        $button.find('span').text('-');
    }
}


//*------------------ enter first quiz question ---------------------------*

/*function beginQuiz() {
$('.begin-quiz').click( function(event){
  state.page = 1;
  $('#quiz').children().remove().


  });
}*/


//*------- hold the state and content of the app in global quizApp ---------*

var quizApp = {

    //*------------- state of the landing page ---------------*

    state : {
        // landing page = (0), question 1 = (1), solution 1 = (2) ...
        // solution 10 = (20), results page = (21)
        page: 0,
        // 1 point for each correct answer
        points: 0,

        isPaperShowing : true,
        isTableShowing : true

    },


    //*------------ app content ----------------------------*

    questionsList : [
        ['Which is a logical equivalent to:'],
        []

    ],

    choicesList : [
        ['a && c', 'a && d', 'b && c', 'b && d'],
        []

    ],

    answersList : [
        'a && c',

    ],

    solutionText : [

    ],

    howGood : [
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
