
// rando gradient
//add css to dom sliders
//diff blending modes , add colour to my constructors
//specify which corner radius controls
//Gravity button

let button
let slider1
let slider2
let slider3
let slider4
let slider5
let slider6
let slider7

let containerDiv
let containerDiv2


let selection = 0;

let shapes = []; // an empty array of something

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB)

  // Save button

  button = createButton("Download.JPEG");
  button.mousePressed(download);

  function download() {
    saveCanvas('Sandbox_Type', 'jpg');
  }

 


  //colour sliders
  let containerDiv = createDiv();
  containerDiv.addClass('slider-container');

  slider1 = createSlider(0, 100, random(0, 100)).parent(containerDiv);
  slider2 = createSlider(0, 100, random(0, 100)).parent(containerDiv);
  slider3 = createSlider(0, 100, random(0, 100)).parent(containerDiv);
  
  //cornerRadius
  let containerDiv2 = createDiv();
  containerDiv2.addClass('slider-container2');
  slider4 = createSlider(0, 100, 0).parent(containerDiv2);
  slider5 = createSlider(0, 100, 0).parent(containerDiv2);
  slider6 = createSlider(0, 100, 0).parent(containerDiv2);
  slider7 = createSlider(0, 100, 0).parent(containerDiv2);
  
  


  rectMode(CENTER);
  shapes.push(new cricleShape());

}





function draw() {


  blendMode(BLEND);

  background(slider1.value(), slider2.value(), slider3.value());

  blendMode(DIFFERENCE);

  // This displays all objects in my array? asuuming .length and .display is pure javascript?

  for (let i = 0; i < shapes.length; i++) {
    shapes[i].display();

  }
}

// This lets you select the object on top

function mousePressed() {
  for (let i = shapes.length - 1; i >= 0; i--) {
    if (shapes[i].drag()) {
      selection = i;
      break;
    };
  }
}


function mouseReleased() {
  for (let i = 0; i < shapes.length; i++) {
    shapes[i].dontDrag();
  }
}

// This creates new objects in the array/ deletes them  

function keyPressed() {
  if (key == 'r') {
    shapes.push(new rectangleShape());
    selection++;
  } else if (key == 'c') {
    shapes.push(new cricleShape());
    selection++;
  } else if (key == 'q')
    shapes.splice(selection, 1);
  // Here ive added splice to delete the last object, how do i make the delete selectable? 

  if (key == "w") {
    shapes[selection].height += 10;
  }
  if (key == "s") {
    shapes[selection].height -= 10;
  }
  if (key == "d") {
    shapes[selection].width += 10;
  }
  if (key == "a") {
    shapes[selection].width -= 10;
  }



}

// cricleShape class
// this.x and this.y refer to the position.
class cricleShape {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.width = random(10, 200);
    this.height = random(10, 200);
    this.speed = 1;

    this.isDragged = false;
  }

  move() {
    this.x += random(-this.speed, this.speed);
    this.y += random(-this.speed, this.speed);
  }

  display() {

    if (this.isDragged) {
      this.x = mouseX;
      this.y = mouseY;
    }
    ellipse(this.x, this.y, this.width, this.height);


  }

  drag() {

    let smallesDimension = this.width;
    if (this.height < smallesDimension) {
      smallesDimension = this.height;
    }
    if (mouseIsPressed) {
      let distFromCenter = dist(mouseX, mouseY, this.x, this.y)

      if (distFromCenter < smallesDimension / 2) {
        this.isDragged = true;
        return true;
      }
    }

  }

  dontDrag() {
    this.isDragged = false;
  }
}


class rectangleShape {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.width = random(10, 200);
    this.height = random(10, 200);
    this.speed = 1;

    this.isDragged = false;
  }

  drag() {

    

    if (mouseIsPressed) {
      if (mouseX > this.x - this.width / 2 && mouseX < this.x + this.width / 2 && mouseY > this.y - this.height / 2 && mouseY < this.y + this.height / 2) {
        this.isDragged = true;
        return true;

      }
    }

  }

  dontDrag() {
    this.isDragged = false;
  }
  display() {


    if (this.isDragged) {
      this.x = mouseX;
      this.y = mouseY;
    }
    rect(this.x, this.y, this.width, this.height, slider4.value(), slider5.value(), slider6.value(), slider7.value());

  }
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

