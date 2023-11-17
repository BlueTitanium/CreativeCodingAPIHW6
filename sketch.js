//TANEIM MIAH

// https://github.com/PokeAPI/pokeapi-js-wrapper

/* CHOSE PROMPT C
C) API
Choose an API to explore and incorporate in a sketch (ex. OpenWeatherAPI.)
Incorporate at least four points of "data" from your API.
For full points, these functions should modify something significant/meaningful to the output. (ex. OpenWeatherAPI - display the current weather in LA, use conditionals to change visual properties of the sketch, etc.)
  1. Pokemon Image shows on screen. Default style if mouse is on top half of screen and shiny if mouse is on bottom half of screen. 
  2. Pokemon Type(s) appear on screen and change background colors. If there are two types, it'll take the blend of colors based on the two types. 
  3. Pokemon Name appears on screen in pokemon font and changes color based on pokemon types
  4. Pokemon Speed changes the amount of shake given to the object when the mouse is moved to the right

In addition to the criteria of your chosen prompt, include the following: 
An interactive component (via mouse or keyboard) that changes a visible and/or audible change
  1. Mouse click changes the pokemon
  2. Mouse Y on top half is default art, and Mouse Y on bottom half is shiny art
  3. Mouse X makes the art shake more depending on the speed of the pokemon
Sketch should include functions for setting the visual environment like fill(), stroke(), background(), and/or more
  - set bg, text, and rectangle

PROMPTS:
  -A: What were you trying to accomplish during this sketch?
  I wanted to make a sketch that used the PokeAPI so that I could learn how to interact with APIs in P5JS because I haven't done that before. I decided to definitely put the name and image of the pokemon on the screen. I also had the idea of making the background color based on the type chart of the pokemon. Since I like that every pokemon has a shiny variant, I wanted to include that somehow, so I made it based on the Mouse Y position. I also wanted to include the speed of the pokemon, so I showed that via text and also movement of the actual image based on the mouse X position.
  -B: Describe the phenomenology (or details of your personal experience) completing this assignment.
  I had to reference the classwork as well as the P5JS reference to figure out how to use APIs and images well. One of the tricky things that I had to figure out was making the shiny image have a silhouette background edge based on a color. I also learned how to do complementary colors in p5js through a google search. It's just the hue + 180. I also referenced the PokeAPI website as well as the PokeAPI JS wrapper so I can cache the images. I also referenced pokemon wiki sites so I could learn more about the pokemon to help me produce my sketch.
*/



const customOptions = {
    cache: true,
    cacheImages: true 
    //to make sure the servers dont get requested too much and so i dont get banned
  }
  const P = new Pokedex.Pokedex(customOptions);
  
  var PokemonImage;
  var PokemonImageShiny;
  var edge;
  var PokemonName;
  var PokemonTypes;
  var pokemonSpeed;
  var GroundColor;
  var imageLoaded = false;


function preload(){
  //https://www.dafont.com/pokemon.font
  fontPoke = loadFont('Pokemon.ttf');
  fontPokeFilled = loadFont('PokemonInner.ttf');
  fontPixel = loadFont('Pixel.ttf');
}

  function setup() {
    createCanvas(400, 400);
    imageMode(CENTER);
    noStroke();
    getNewPokemon();
    GroundColor = color('#000000');
    colorMode(HSB);
  }
  
  function draw() {
    blendMode(BLEND);

    var mappedX = map(mouseX,20,380,0,.1,true);

    //inspired from this https://editor.p5js.org/cassie/sketches/yty3MJffd
    var skyColor = color((hue(GroundColor)+180)%360,saturation(GroundColor),brightness(GroundColor));
    background(skyColor);
    
    
    //ground
    push();
    fill(GroundColor);
    
    
    rect(0, height/2, width, height);
    pop();

    if(imageLoaded){
      textAlign(CENTER, CENTER);
      
      
      
      textSize(30);
      
      textFont(fontPokeFilled);
      fill(GroundColor);
      text(PokemonName, width/2, 30);

      fill("#000000");
      textFont(fontPoke);
      text(PokemonName, width/2, 30);

      fill(skyColor)
      textFont(fontPixel);
      textSize(20);
      if(PokemonTypes.length > 1){
        text(PokemonTypes[0].type.name.toUpperCase() + " / " + PokemonTypes[1].type.name.toUpperCase(), width/2, height-40);
        GroundColor = lerpColor(getTypeColor(PokemonTypes[0].type.name), getTypeColor(PokemonTypes[1].type.name), .5);
      } else {
        text(PokemonTypes[0].type.name.toUpperCase(), width/2, height-40);
        GroundColor =getTypeColor(PokemonTypes[0].type.name);
        
      }
      text("Speed: "+pokemonSpeed, width/2, height-20);


      if(mouseY > height/2){//shiny
        push();
        translate(random(-pokemonSpeed,pokemonSpeed)*mappedX,random(-pokemonSpeed,pokemonSpeed)*mappedX);
        blendMode(DIFFERENCE); 
        edge.filter(THRESHOLD,0);
        tint(255,100);
        image(edge,width/2+4,height/2+4,304,304);
        blendMode(BLEND);
        tint(255,255);
        image(PokemonImageShiny,width/2,height/2,300,300);
        pop();
        push();
        translate(width/2+150,height/2);
        rotate(PI/2);
        textFont(fontPixel);
        textSize(15);
        fill("#000000");
        text("SHINY!",0,0);
        pop();
      } else { // default
        push();
        translate(random(-pokemonSpeed,pokemonSpeed)*mappedX,random(-pokemonSpeed,pokemonSpeed)*mappedX);
        image(PokemonImage,width/2,height/2,300,300);
        pop();
      }
    }
  }
  
  function mouseClicked(){
    getNewPokemon();
  }

  function getNewPokemon(){
    let r;
    let id = floor(random(1,897));
    P.resource([
    "/api/v2/pokemon/"+id,
    
  ]).then( response => {
    r = response;
    console.log(r[0]);
    PokemonImage = loadImage(r[0].sprites.other['official-artwork'].front_default);
    PokemonImageShiny = loadImage(r[0].sprites.other['official-artwork'].front_shiny);
    edge = loadImage(r[0].sprites.other['official-artwork'].front_shiny);
    pokemonSpeed = r[0].stats[5].base_stat;
    PokemonName = r[0].species.name.toUpperCase();
    PokemonTypes = r[0].types;
    imageLoaded = true;
  })
  }

  function getTypeColor(type){
    //change ground color based on pokemon type
    //https://pokemon.fandom.com/wiki/Types
    switch (type) {
      case "normal":
        return color('#a8a878');
      case "fire":
        return color('#f08030');
      case "water":
        return color('#6890f0');
      case "grass":
        return color('#78c850');
      case "electric":
        return color('#f8d030');
      case "ice":
        return color('#98d8d8');
      case "fighting":
        return color('#c03028');
      case "poison":
        return color('#a040a0');
      case "ground":
        return color('#e0c068');
      case "flying":
        return color('#a890f0');
      case "psychic":
        return color('#f85888');
      case "bug":
        return color('#a8b820');
      case "rock":
        return color('#b8a038');
      case "ghost":
        return color('#705898');
      case "dragon":
        return color('#7038f8');
      case "dark":
        return color('#705848');
      case "steel":
        return color('#b8b8d0');
      case "fairy":
        return color('#f0b6bc');
      default:
        return color('#ffffff')
        break;
    }
  }