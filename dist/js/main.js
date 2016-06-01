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
            $(".reset").removeClass('xs-block');
            $('.lose').removeClass('lose');
            $('.win').removeClass('win');
            $('.tie').removeClass('tie');
            $('.counter').removeClass('counter');
            countDown();
        };


        function countDown() {
            count();
        };

        function count() {
          //count down as we need to tell the user that something is happening
            $(".result").html(i);
            if (i === 0) {
                results();
                counter = 3
                i = counter
            } else {
                i--;
                setTimeout(count, 400);
            }
 
        };

        function compare(choice1, choice2) {
            if (choice1 == choice2) {

                $(".result").text("Tie!").addClass('tie');
                $(".reset").addClass('xs-block');
            } else if (
            (choice1 == "rock" && choice2 == "scissors") || (choice1 == "scissors" && choice2 == "paper") || (choice1 == "paper" && choice2 == "rock")) {
                $(".result").text("You win!").addClass('win');
                $(".score.left." + userChoice).prev('label').addClass('win');
                $(".reset").addClass('xs-block');
            } else {
                $(".result").text("You lose!").addClass('lose');
                $(".score.right." + computerChoice).prev('label').addClass('lose');
                $(".reset").addClass('xs-block');
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
        $('.simulate').addClass('counter');

    }
 
 

};

$(document).ready(function () {
  main.init();
});
 