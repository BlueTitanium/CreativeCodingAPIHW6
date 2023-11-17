// https://github.com/PokeAPI/pokeapi-js-wrapper

const customOptions = {
    cache: true,
    cacheImages: true 
    //to make sure the servers dont get requested too much and so i dont get banned
  }
  const P = new Pokedex.Pokedex(customOptions);
  
  var PokemonImage;
  var imageLoaded = false;

  function setup() {
    createCanvas(400, 400);
    imageMode(CENTER)
  }
  
  function draw() {
    background(220);
    if(imageLoaded){
        image(PokemonImage,width/2,height/2,300,300);
    }
  }
  
  function mouseClicked(){
    let r;
    let id = floor(random(1,897));
    P.resource([
    "/api/v2/pokemon/"+id
  ]).then( response => {
    r = response;
    console.log(r[0].sprites.other['official-artwork'].front_default);
    PokemonImage = loadImage(r[0].sprites.other['official-artwork'].front_default);
    imageLoaded = true;
  })
  }