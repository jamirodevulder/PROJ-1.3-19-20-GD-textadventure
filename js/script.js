const divLocation = document.getElementById('location');
const myPossibilities = document.getElementById('possibilities');
const myInput = document.getElementById('myInput');
const feedback = document.getElementById('feedback');
const imageLocation = document.getElementById('imageLocation');
const myDescription = document.getElementById('description');
const myInventory = document.getElementById('inventory');

let currentLocation = 4;

let locations = [];
let items = [];
let inventoryslots = [];


let itemspickup = [];

itemspickup[0] = " er licht hier een sleutel die je kan op pakken";
itemspickup[1] = " je wild de koffie machine gebruiken alleen zit er een slot op zoek naar iets waardoor je hem kan openen";

items[0] = "sleutel";
myInventory.innerHTML = "inventory :  ";
let usableItems= [];
usableItems[0] = "slot";


locations[0] = "kantine";
locations[1] = "trap";
locations[2] = "eind";
locations[3] = "docentenkamer";
locations[4] = "gang";
locations[5] = "medialab";
locations[6] = "toiletten";
locations[7] = "klaslokaal";
locations[8] = "examenlokaal";

images = [];
images[0] = "room0.jpg";
images[1] = "room1.jpg";
images[2] = "room2.jpg";
images[3] = "room3.jpg";
images[4] = "room4.jpg";
images[5] = "room5.jpg";
images[6] = "room6.jpg";
images[7] = "room7.jpg";
images[8] = "room8.jpg";

directions = [];
directions[0] = ["oost"];
directions[1] = ["west", "zuid"];
directions[2] = ["zuid"];
directions[3] = ["oost"];
directions[4] = ["noord", "west", "zuid"];
directions[5] = ["zuid"];
directions[6] = ["oost"];
directions[7] = ["noord", "west", "oost"];
directions[8] = ["noord", "west"];

descriptions = [];
function changeDescription(){
descriptions[0] = "u staat in een kantine. Hier zitten studenten te eten of computerspelletjes te doen";
descriptions[1] = "u staat op een trap naar de eerste etage. Om u heen lopen studenten omhoog en omlaag ";
descriptions[2] = "u heeft gewonnen";
descriptions[3] = "u staat in de lerarenkamer. De leraren eten hier hun lunch of drinken koffie of thee hier" + itemspickup[1];
descriptions[4] = "u staat in een gang. Studenten en leraren lopen richting de klaslokalen. je hebt zelf trek in koffie zoek de leerarenkamer";
descriptions[5] = "u staat in het medialab. Hier kan geexperimenteerd worden met bijvoorbeeld virtual reality brillen";
descriptions[6] = "u staat bij de toiletten" + itemspickup[0];
descriptions[7] = "u staat in een klaslokaal. De tafels staan recht achter elkaar en voorin is een projector en een smartboard";
descriptions[8] = "u staat in het examenlokaal. Hier zijn de vierdejaars studenten bezig met het voorbereiden van hun examen";
}

changeDescription();
myInput.addEventListener('keydown', getInput, false);

function getInput(evt) {
  if (evt.key == "Enter") {
    let inputArray = myInput.value.split(" ");

    if (inputArray[0] == "ga") {
      if (directions[currentLocation].indexOf(inputArray[1]) != -1) {
        switch (inputArray[1]) {
          case "noord":
            currentLocation -= 3;
            break;
          case "zuid":
            currentLocation += 3;
            break;
          case "oost":
            currentLocation += 1;
            break;
          case "west":
            currentLocation -= 1;
            break;
        }
      } else {
        feedback.innerHTML = "dat mag niet";
        setTimeout(removeFeedback, 2000);

      }
      giveLocation();
      myInput.value = "";
    }



    if (inputArray[0] == "pak") {
      for (var i = 0; i < items.length; i++) {

      if(inputArray[1] == items[i])
      {
        for (var i = 0; i < items.length; i++) {
          if(descriptions[currentLocation].includes(items[i]))
          {
            if(itemspickup[i] != "")
            {
            console.log("dit werkt");
            myInput.value = "";
            itemspickup[i] = "";
            changeDescription();
            descriptions[currentLocation].innerHTML = description[currentLocation] - itemspickup[i] ;
            myInventory.innerHTML = myInventory.innerHTML + items[i] +  " , ";
            giveLocation();
            }
            else {
              feedback.innerHTML = "je kan hier dit niet op pakken";
              myInput.value = "";
              setTimeout(removeFeedback, 4000);
            }
          }
      }
    }
  }
}




    if (inputArray[0] == "gebruik"){

      for (var i = 0; i < items.length; i++) {
       if(myInventory.innerHTML.includes(items[i]))
       {
            if(descriptions[currentLocation].includes("slot") && myInventory.innerHTML.includes(items[i]))
            {
              for (var i = 0; i < itemspickup.length; i++) {
               if(itemspickup.includes("slot"))
               {
                 itemspickup[i] = "";
               }
              }


              myInput.value = "";
              items[i]= "";
              itemspickup[i]= "";
              changeDescription();
              descriptions[3].innerHTML = "je hebt een heerlijke bakkie koffie! u heeft gewonnen";
              alert("u heeft gewonnen");
              myInventory.innerHTML = "inventory : ";
              location.reload();
              giveLocation();

            }
            else {
              feedback.innerHTML = "je kan hier niks gebruiken of je gebruikt niet het goeie item";
              myInput.value = "";
              setTimeout(removeFeedback, 4000);
            }
       }
      }


    }

    if (inputArray[0] != "ga" && inputArray[0] != "pak" && inputArray[0] != "gebruik" ){
      feedback.innerHTML = "mogelijke commando's zijn: ga, pak, gebruik en help";
      myInput.value = "";
      setTimeout(removeFeedback, 4000);
    }

  }
}

function giveLocation() {
  divLocation.innerHTML = locations[currentLocation];
  myDescription.innerHTML = descriptions[currentLocation];
  imageLocation.src = "media/" + images[currentLocation];
  myDirections = "mogelijke richtingen zijn: ";
  for (let i = 0; i < directions[currentLocation].length; i++) {
    myDirections += "<li>" + directions[currentLocation][i] + "</li>";
  }
  myPossibilities.innerHTML = myDirections;
  myInventory.innerHTML = myInventory.innerHTML;
}

function removeFeedback() {
  feedback.innerHTML = "";
}

giveLocation();
