// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyBq3ET1iX1YLLeMq7A5-NnqKJe5aTkr-Hw",
  authDomain: "ashley-miller.firebaseapp.com",
  databaseURL: "https://ashley-miller.firebaseio.com",
  projectId: "ashley-miller",
  storageBucket: "ashley-miller.appspot.com",
  messagingSenderId: "101599743809",
  appId: "1:101599743809:web:a20a13981b43228f"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

let database = firebase.database()
let scoreboard = {}
let good= document.getElementById("who")
let score
let x
let y
let x2
let y2
let x3
let y3
let vadors
let level
let radius
let speed
let time

function setup() {
  createCanvas(windowWidth, windowHeight);
  x=500 
  y= 400
  x2=500
  y2=500
  x3=[200,300,500,600,700,250,650,550]
  y3=[200,400,600,700,900,800,100,375]
  score=0
  vadors=5
  level=1
  radius=40
  speed=8
  time=180
  s=width/1301
}

function draw() {
  if (time > 0) {

  background(0,190,150);
  fill(255,182,193);
  circle(x,y,60*s);
  fill(50,265,50);
  circle(x2,y2,50*s)
  x=x+3
  y=y+1
  if (keyIsDown(RIGHT_ARROW)) {
    x2=x2+5;
  }
  if (keyIsDown(UP_ARROW)) {
   y2=y2-5
  }   
  if(keyIsDown(LEFT_ARROW)) {
    x2=x2-5;
  }
  if (keyIsDown(DOWN_ARROW)) {
    y2=y2+5;
  }
  if(x>width){
     x=0}
  if(y>height){
    y=0}
  for (i=0; i<vadors; i=i+1) {
    fill(0,0,0);
    circle(x3[i],y3[i],radius*s)
    x3[i]=x3[i]+speed
    y3[i]=y3[i]+5
    if(x3[i]>width){
      x3[i]=0}
    if(y3[i]>height){
      y3[i]=0}
    if (dist(x2,y2,x3[i],y3[i]) <50 + radius) {
    score = score - 1}
  }
  textSize(30)
  text("score:"+score,500,30)
  text("level:"+level,500,90)
  text("time:"+time.toFixed(2) , 500, 60)
  if (dist( x,y,x2,y2) < 60 + 50) {
	score = score + 1}

  if (score > 70 && level == 1) {
vadors = vadors + 2
level = 2
radius=radius + 5 
}
if (score > 130 && level == 2) {
vadors = vadors + 2
level = 3
radius=radius + 10    
}
if (score > 160 && level == 3) {
vadors = vadors + 2
level = 4
radius=radius + 5
}
if (score > 190 && level == 4) {
vadors = vadors + 8
level = 5
radius=radius + 20 
speed=speed+8
}
time=time-0.10
  }
  else {good.innerHTML = "Name?<input id='points'><button onclick='restart()'>Restart</button><button onclick='all time leadeboard'</button>"
noLoop()
}
}

function restart() { 
        let points = document.getElementById("points")
		name = points.value 
	    database.ref(name).set(score)
		if (name != "") { 
			scoreboard[name] = score
		}
        alert("Scoreboard: " + JSON.stringify(scoreboard,null,1)) 
		time = 180
		score = 0
        level=1
		loop()
		good.innerHTML = ""
        generate_leaderboard()
}

function generate_leaderboard() {
  scores = Object.values(scoreboard)
  names = Object.keys(scoreboard)
  
  if (scores.length >= 3) {
    let leaderboard = { }
    for (i=0; i<3; i=i+1) {
      max = Math.max(...scores)
      index = scores.indexOf(max)
      leaderboard[names[index]] = max
      names.splice(index,1)
      scores.splice(index,1)
    }
    alert("Leaderboard: " + JSON.stringify(leaderboard,null,1))
  }
}
function generate_alltime_leaderboard() {
	let alltime_leaderboard = { }
	database.ref().orderByValue().limitToLast(3).on("value", function(snapshot) {
		snapshot.forEach(function(data) {
		alltime_leaderboard[data.key] = data.val()
		});
    	});
	if (Object.values(alltime_leaderboard).length > 0) {
	  alert("All-time leaderboard: " + JSON.stringify(alltime_leaderboard,null,1))
    	}
}

generate_alltime_leaderboard()
