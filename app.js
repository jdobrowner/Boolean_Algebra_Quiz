//*-------------- call functions when document is loaded -----------------*

$(function() {
    setUpQuizToolsToggleButtons();
    beginQuiz();
});

//*--------- set up scratch paper and logic table toggle -------------*

function setUpQuizToolsToggleButtons() {

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


//*---------- setup question page div and solution page div --------------*

function beginQuiz() {
$('.begin-quiz').click( function(event){

  quizApp.state.page = 1;
  var $quizDiv = $('#quiz');

  $quizDiv.children().remove();
  $quizDiv.append('<div id="question-page"></div>');
  $quizDiv.append('<div id="solution-page" class="hidden"></div>');

  var $qDiv = $('#question-page');
  var $sDiv = $('#solution-page');

  $qDiv.append('<p id="notes"></p>');
  $qDiv.append('<p id="question-text"></p>');
  $qDiv.append('<p id="question-content"></p>');
  $qDiv.append('<button id="a1" class="answer"></button>');
  $qDiv.append('<button id="a2" class="answer"></button>');
  $qDiv.append('<button id="a3" class="answer"></button>');
  $qDiv.append('<button id="a4" class="answer"></button>');

  $sDiv.append('<p id="answered"></p>');
  $sDiv.append('<p id="solution"></p>');
  $sDiv.append('<button id="next">next question</button>');

  addQuestion();
  });
}


//*--------------- fill question page with content ---------------------*

function addQuestion() {
  $('#solution-page').addClass('hidden');
  $('#question-page').removeClass('hidden');

  var qNum = quizApp.state.questionNum;

  $('#notes').text(quizApp.questionsNotes[qNum]);
  $('#question-text').text(quizApp.questionsList[qNum]);
  $('#question-content').text(quizApp.questionsContentList[qNum]);
  $('#a1').text(quizApp.choicesList[qNum][0]);
  $('#a2').text(quizApp.choicesList[qNum][1]);
  $('#a3').text(quizApp.choicesList[qNum][2]);
  $('#a4').text(quizApp.choicesList[qNum][3]);

  quizApp.state.page++;
}

//*----------- fill solution page with content -------------------------*

function addSolution() {
  $('#question-page').addClass('hidden');
  $('#solution-page').removeClass('hidden');

  var qNum = quizApp.state.questionNum;

  $('#answered').text(quizApp.lastAnswerWas ? 'correct' : 'incorrect');
  $('#solution').text(quizApp.solutionText[qNum]);

  quizApp.state.page++;
  quizApp.state.questionNum++;
}

//*------------ add answer button event handlers -----------------------*

function answerButtonHandlers() {

  $('a1').click( function(event) {
    determineCorrectness(1);
  });
  $('a2').click( function(event) {
    determineCorrectness(2);
  });
  $('a3').click( function(event) {
    determineCorrectness(3);
  });
  $('a4').click( function(event) {
    determineCorrectness(4);
  });

}

//*---------------- determine correctness of choice -------------------*

function determineCorrectness(n) {
  var qNum = quizApp.state.questionNum;
  quizApp.answersChosen.push(n);

  if (quizApp.answersChosen[qNum] === quizApp.answersList[qNum]) {
    quizApp.lastAnswerWas = true;
    quizApp.state.points++;

    console.log('points = ' + quizApp.state.points);
  }
  else {
    quizApp.lastAnswerWas = false;
  }
}


//*------- hold the state and content of the app in global quizApp ---------*

var quizApp = {

    //*------------- state of the landing page ---------------*

    state : {
        // landing page = (-1), question 1 = (0), solution 1 = (1) ...
        // solution 10 = (19), results page = (20)
        page : -1,
        // 1 point for each correct answer
        points : 0,
        questionNum : 0,
        isPaperShowing : true,
        isTableShowing : true,
        lastAnswerWas : true
    },

    //*------------ app content ----------------------------*

    questionsNotes : [
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

    questionsList : [
        ['Which is a logical equivalent to:'],
        ['Which is a logical equivalent to:'],
        ['Which is a logical equivalent to:'],
        ['Which is a logical equivalent to:'],
        ['Which is a logical equivalent to:'],
        ['Which is a logical equivalent to:'],
        ['What is the value of c?'],
        ['What is the value of c?'],
        ['What is the value of c?'],
        ['What is the value of c?']
    ],

    questionsContentList : [
        ['( a || ( a && b ) ) && ( c && ( c || d ) )'],
        ['!( a && b ) || ( !c || !d )'],
        ['( a || b ) || !( a && c )'],
        ['!( !a && !b && !c && !d )'],
        ['a || (!a && b)'],
        ['a || (b || !a)'],
        ['var c = a == b ? a && b : a || b;'],
        ['var c = a || b ? a : b;'],
        ['var c = a ? a : b;'],
        ['var c = a && b ? a : b;']
    ],

    choicesList : [
        ['a && c', 'a && d', 'b && c', 'b && d'],
        ['a && b && c && d', '!( a && b && c && d )', '!a || !b || c || d', '!( a || b || c || d )'],
        ['b && c', '!b && c', 'b || !c', '!b || c'],
        ['a || b || c || d', 'a && b && c && d', '!a || !b || !c || !d', '!( a || b || c || d )'],
        ['a || b', 'a && b', 'false', 'true'],
        ['a', 'b', 'a || b', 'true'],
        ['true', 'false', 'a && b', 'a || b'],
        ['true', 'false', 'a', 'b'],
        ['a', 'b', 'a || b', 'a && b'],
        ['a', 'b', 'a || b', 'a && b'],
    ],

    answersList : [1, 2, 3, 1, 1, 4, 4, 3, 3, 2],

    solutionText : ['( a ) && ( c ) by Absorption laws',
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

    answersChosen : [],

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
