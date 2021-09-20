const $cardDescArea = $(".card-desc-con");
const $input = $('input[type="text"]');
let pokemon = {
  name: "",
  type: "",
  abilities: [],
  moves: [],
};
let $userInput;
let pokemonData;
let cardExist = false;

console.log($cardDescArea);

// button click to change the modal display to none

$(".mc-btn").on("click", function (event) {
  event.preventDefault();
  $(".bg-modal").css("display", "none");
});

//genrates pokemon for what the user searches
$(".search-input").on("keypress", function (event) {
  if (event.keyCode == 13) {
    if (cardExist) {
      pokemon = {
        name: "",
        type: "",
        abilities: [],
        moves: [],
      };
      $(".card-desc").remove();
    }
    // console.log("entered");
    event.preventDefault();

    $userInput = $input.val();

    $.ajax({
      url: "https://pokeapi.co/api/v2/pokemon/" + $userInput.toLowerCase(),
    }).then(
      (data) => {
        // console.log(data);
        pokemon.name = data.name;
        pokemon.type = data.types[0].type.name;
        setAbilities(data.abilities);
        setMoves(data.moves);
        // console.log("------ pokemon Obj ------");
        // console.log(pokemon);
        // console.log("------ pokemon Obj ------");
        appendCard(pokemon);
        cardExist = true;
        // console.log("then  function****");
        // console.log(pokemon);
        $input.val("");
      },
      (error) => {
        alert("Search input is not a character", error);
      }
    );

    return false; // prevent the button click from happening
  }
});

const setAbilities = (abilities) => {
  if (abilities.length > 1) {
    pokemon.abilities.push(abilities[0].ability.name);
    pokemon.abilities.push(abilities[1].ability.name);
  } else {
    pokemon.abilities.push(abilities[0].ability.name);
  }
};

const setMoves = (moves) => {
  //   pokemon.moves.push(moves[0].move.name);
  if (moves.length > 2) {
    for (let i = 0; i <= 2; i++) {
      pokemon.moves.push(moves[i].move.name);
    }
  } else {
    pokemon.moves.push(moves[0].move.name);
  }
};

const appendCard = () => {
  //html string template
  let card = `<div class="card-desc">
<div class="img-con">
    <img src="./img/Pokeball.png" alt="">
    <h2 class="char-hd">${pokemon.name}</h2>
</div> 
<div class="desc">

    <p><span class="desc-keys">Types</span>:  ${pokemon.type}</p>
    <p><span class="desc-keys">Ability</span>: ${pokemon.abilities.join(
      ", "
    )}<p>
    <p><span class="desc-keys">Moves</span>: ${pokemon.moves.join(", ")}</p>
</div>   
</div>`;

  console.log("appendCard  function****");
  //   console.log($cardDescArea);

  $cardDescArea.append(card);
};

let isNewcomers = false;
$(".newcomers-btn").on("click", function (event) {
  event.preventDefault();

  if (isNewcomers) {
    $(".newcomers").css("display", "none");
    $(".card-desc-con").css("display", "flex");
    isNewcomers = false;
  } else {
    $(".newcomers").css("display", "flex");
    $(".card-desc-con").css("display", "none");
    isNewcomers = true;
  }
});

// go back from the newcomers page
$(".gb-btn").on("click", function (event) {
  event.preventDefault();
  $(".newcomers").css("display", "none");
  $(".card-desc-con").css("display", "flex");
  isNewcomers = false;
});

// generate a random number to repersent an ID to search for Pokemon
let rndmNum = 0;
$(".rndm-btn").on("click", function (event) {
  event.preventDefault();
  rndmNum = Math.floor(Math.random() * (500 - 1) + 1);
  console.log(rndmNum);

  if (cardExist) {
    pokemon = {
      name: "",
      type: "",
      abilities: [],
      moves: [],
    };
    $(".card-desc").remove();
  }

  $.ajax({
    url: "https://pokeapi.co/api/v2/pokemon/" + rndmNum,
  }).then(
    (data) => {
      pokemon.name = data.name;
      pokemon.type = data.types[0].type.name;
      setAbilities(data.abilities);
      setMoves(data.moves);

      appendCard(pokemon);
      cardExist = true;
      $input.val("");
    },
    (error) => {
      alert("Oops something went wrong", error);
    }
  );
});
