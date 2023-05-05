song = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreLeftWrist = 0;
inNumberLeftWristY = "";
function preload(){
    song = loadSound("music.mp3");
}
function setup(){
    canvas = createCanvas(600, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    posenet = ml5.poseNet(video, modelLoaded);
    posenet.on("pose", gotPoses);
}
function draw(){
    image(video, 0, 0, 600, 500);
    fill('red');
    stroke('red');
    if(scoreLeftWrist > 0.2){
    circle(leftWristX, leftWristY, 20);
    inNumberLeftWristY = Number(LeftWristY);
    remove_decimals = floor(inNumberLeftWristY);
    console.log("remove decimals = " + remove_decimals);
    volume = remove_decimals/500;
    document.getElementById("volume").innerHTML = volume;
    }
}
function play(){
    song.play();
    song.setVolume(volume);
    song.rate(1);
}
function modelLoaded(){
    console.log("posenet is initialized");
}
function gotPoses(results){
    if(results.length > 0){
        console.log(results);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("LeftWristX = " + leftWristX + " leftWristY = " + leftWristY);
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("RightWristX = " + rightWristX + " RightWristY = " + rightWristY);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
    }
}