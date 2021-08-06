class Quiz {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      contestant = new Contestant();
      var contestantCountRef = await database.ref('contestantCount').once("value");
      if(contestantCountRef.exists()){
        contestantCount = contestantCountRef.val();
        contestant.getCount();
      }
      question = new Question()
      question.display();
    }
  }

  play(){
    //write code here to hide question elements
    question.hide();
    //write code to change the background color here
    background("yellow");
    //write code to show a heading for showing the result of Quiz
    textSize(30);
    text("Result of the Quiz",350,50);
    text("------------------------------",330,65);
    //call getContestantInfo( ) here
    Contestant.getPlayerInfo();
    //write condition to check if contestantInfo is not undefined
    if(allContestants !== undefined){
    //write code to add a note here
    var display_answer = 230;
      fill("blue");
      textSize(20);
      text("NOTE: Contestant who answered correct are highlighted in Green color!",130,230);
    
    //write code to highlight contest who answered correctly
    for(var plr in allContestants){
      var correctAns =  "2";
      if(correctAns === allContestants[plr].answer)
        fill("green")
        else
        fill("red");

        display_answer+= 30;
        textSize(20);
        text(allContestants[plr].name+":"+allContestants[plr].answer,200,display_answer);
    }
    }
  }

}
