 var main = {
  init: function () {
    this.gameSetup();
    this.clickSimulate();  
    this.loadContent();
  },
   

  loadContent: function (){
    $('#includedSVG').load('styles/images/svg/svg-defs.svg');
    $('#header').load('components/header/header.html', function(){
    });
    $('#content').load('components/game/game.html', function(){
        main.gameSetup();
        main.clickSimulate();
    });
  },

    gameSetup: function () {
 
        var userChoice;
        var i = 3;
        var computerChoice;

        $(".button").on("click", startup);

        function startup(e) {
            $(".button").off("click");

            userChoice = e.target.id;

            console.info(userChoice);

            computerChoice = main.compChoice();

            $(".score").hide();
            $('.lose').removeClass('lose');
            $('.win').removeClass('win');
            $('.tie').removeClass('tie');
            $('.computerVScomputer').removeClass('computerVScomputer');
            countDown();
        };


        function countDown() {
            count();
        };

        function count() {
          //count down as we need to tell the user that something is happening
            $(".result").text(i).addClass('counter');
            if (i === 0) {
                results();
            } else {
                i--;
                setTimeout(count, 400);
            }
        };

        function compare(choice1, choice2) {
            if (choice1 == choice2) {
                $(".result").text("Tie!").addClass('tie');
            } else if (
            (choice1 == "rock" && choice2 == "scissors") || (choice1 == "scissors" && choice2 == "paper") || (choice1 == "paper" && choice2 == "rock")) {
                $(".result").text("You win!").addClass('win');
            } else {
                $(".result").text("You lose!").addClass('lose');
            }

        };

        function results() {
            $(".score.left." + userChoice).show();
            $(".score.right." + computerChoice).show();

            compare(userChoice, computerChoice);

            $(".button").on("click", startup);
        };

        function reset (){
          $(".reset").on("click", function(){
            location.reload();
          });
          
        };
        reset();


    },

    compChoice: function () {
        computerChoice = Math.random();
        if (computerChoice < 0.34) return "rock";
        if (computerChoice <= 0.67) return "paper";
        return "scissors";

    },

    clickSimulate: function (){
      $("#computervcomputer").click(function () {
            main.computerVcomputer();
        });
    },


    computerVcomputer: function () {
        var comp1 = this.compChoice();
        $("#" + comp1).click();
        $('.content').addClass('computerVScomputer');

    }
 
 

};

$(document).ready(function () {
  main.init();
});
 