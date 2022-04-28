let bullets = [];
let enemies = [];

//vars
let numberOfEnimies = 10;
let speedOfBullet = 5;
let speedOfenemies = 0.8;
let previousScore = 0;
let score = 0;
//game
function setup() {
  createCanvas(350, 400);
  for (let i = 0; i < numberOfEnimies; i++) {
    let enemy = {
      x: random(0, width),
      y: random(-400, 0),
    };
    enemies.push(enemy);
  }
}

function draw() {
  background(51);
  rectMode(CENTER);
  //draw the player

  circle(mouseX, height - 50, 25);
  //update and draw the bullet

  for (let bullet of bullets) {
    bullet.y -= speedOfBullet;
    circle(bullet.x, bullet.y, 10);
  }

  //draw enemy
  for (let enemy of enemies) {
    enemy.y += speedOfenemies;
    rect(enemy.x, enemy.y, 10);
    if (enemy.y > height) {
      text(`Sorry u lost.
Refresh to 
play again`,width/2,height/2)
      noLoop();
    }
  }
  //collisions
  for (let enemy of enemies) {
    for (let bullet of bullets) {
      if (dist(enemy.x, enemy.y, bullet.x, bullet.y) < 10 && bullet.y > 0) {
        enemies.splice(enemies.indexOf(enemy), 1);
        bullets.splice(bullets.indexOf(bullet), 1);

        let Newenemy = {
          x: random(0, width),
          y: random(-800, 0),
        };
        score++;
        enemies.push(Newenemy);
        document.querySelector(
          "#gameover"
        ).innerHTML = `Difficulty = ${Math.round(speedOfenemies * 10 - 7)}`;
        if (score - previousScore == 20) {
          speedOfenemies += 0.1;
          previousScore = score;
        }
      }
    }
  }
  textSize(30);

  text(score, 15, 45);
}

function mousePressed() {
  //spwan the bullet and adding to list
  let bullet = {
    x: mouseX,
    y: height - 50,
  };
  bullets.push(bullet);
}
