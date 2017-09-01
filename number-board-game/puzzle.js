$(document).ready(function(){
	var activeNode="00";
	var numList=[];
	var nodesList=[];
	var sizeOfBoard=3;
	var numberOfMoves=0;

	function createBoard(){
		var boardContent="";
		for (var i = 0; i < sizeOfBoard; i++) {
			for (var j = 0; j < sizeOfBoard; j++) {
				boardContent = boardContent +'<div id="'+i+''+j+'" class="playBoad"></div>'
			}
		}
		$(".playBoadContainer").html(boardContent);
		$(".playBoadContainer").css("width",sizeOfBoard*100+50);
		$("#00").addClass("playerActive");
	}
	createBoard();
	function generateDrawValues(){
		var k=0;
		for(i=0;i<sizeOfBoard;i++){
			for(j=0;j<sizeOfBoard;j++){
				numList[k] = Math.floor(Math.random()*(6));;
				//numList[k] = 0;
				//numList[0] = 1;
				$("#"+i+""+j).html(numList[k]);
				nodesList[k] = ""+i+""+j;
				k++;
			}
		}
	}
	generateDrawValues();

	document.getElementById("upArrow").addEventListener("click",joyStick);
	document.getElementById("downArrow").addEventListener("click",joyStick);
	document.getElementById("leftArrow").addEventListener("click",joyStick);
	document.getElementById("rightArrow").addEventListener("click",joyStick);

	function joyStick(event){
		var p1 = activeNode.slice(0,1);
		var p2 = activeNode.slice(1,2);
		if(event.target.innerHTML=="UP" && p1!=0){
			activeNode = (Number(p1)-1)+p2;
			showingActive();
		} else if(event.target.innerHTML=="DOWN" && p1<sizeOfBoard-1){
			activeNode = (Number(p1)+1)+p2;
			showingActive();
		} else if(event.target.innerHTML=="RIGHT" && p2<sizeOfBoard-1){
			activeNode = p1+(Number(p2)+1);
			showingActive();
		} else if(event.target.innerHTML=="LEFT" && p2!=0){
			activeNode = p1+(Number(p2)-1);
			showingActive();
		}
	};

	document.onkeydown = function(evt) {
		var p1 = activeNode.slice(0,1);
		var p2 = activeNode.slice(1,2);
		evt = evt || window.event;
		if (evt.keyCode == 38 && p1!=0) {
			activeNode = (Number(p1)-1)+p2;
			showingActive();
		} else if (evt.keyCode == 40 && p1<sizeOfBoard-1) {
			activeNode = (Number(p1)+1)+p2;
			showingActive();
		} else if(evt.keyCode == 39 && p2<sizeOfBoard-1) {
			activeNode = p1+(Number(p2)+1);
			showingActive();
		} else if(evt.keyCode == 37 && p2!=0) {
			activeNode = p1+(Number(p2)-1);
			showingActive();
		}
	};
	function showingActive(){
		$(".playBoad").removeClass("playerActive");
		$("#totalMoves").html(++numberOfMoves)
		var k=0;
		for(i=0;i<sizeOfBoard;i++){
			for(j=0;j<sizeOfBoard;j++){
				if(activeNode==nodesList[k]){
					numList[k]= numList[k]+1;
					$("#"+i+""+j).html(numList[k]);
					$("#"+i+""+j).addClass("playerActive");
				}
				k++;
			}
		}
		var gameSolved = true;
		for(i=0;i<sizeOfBoard*sizeOfBoard;i++){
			if(numList[0]!=numList[i]){
				gameSolved=false;
				break;
			}
		}
		if(gameSolved){
			$("#puzzleOverlay").show();
		}
	  }
	document.getElementById("resetButton").addEventListener("click",resetGame);
	function resetGame(){
		$("#puzzleOverlay").hide();
		if(sizeOfBoard<5){
			sizeOfBoard++;
		}
		createBoard();
		generateDrawValues();
		activeNode="00";
		$(".playBoad").removeClass("playerActive");
		$("#00").addClass("playerActive");
	  }
});
