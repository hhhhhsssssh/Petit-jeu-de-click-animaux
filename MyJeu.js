let container = document.querySelector(".container");
let btn = document.querySelector(".startButton");
let scoreContainer = document.querySelector(".score");
let timeContainer = document.querySelector(".time");

btn.onclick = function () {
  let score = 0;
  let time = 10;
  container.innerHTML = ""; /*insérer un vide dans le container*/

  let targetImages = [
    "chat.png",
    "ours.png",
    "tigre.png",
    "singe.png",
    "pinguin.png",
    "hyppopotame.png",
  ];

  let interval = setInterval(function showTarget() {
    let target = document.createElement("img"); /*créer la cible*/
    target.id = "target";
    target.src = ""; /*image de la cible*/

    let randomIndex = Math.floor(
      Math.random() * targetImages.length
    ); /*random des images*/
    target.src = targetImages[randomIndex];

    let clicked = false; /*si la cible n'a pas été cliquéé*/

    container.appendChild(target);
    target.style.top =
      Math.random() * (550 - target.offsetHeight) +
      "px"; /*target.offsetHeight pour que target ne dépasse pas l'élément container*/
    target.style.left = Math.random() * (700 - target.offsetWidth) + "px";

    setTimeout(function () {
      /*faire disparaitre la cible 2 sec après*/ target.remove();
      if (!clicked) {
        /*si la cible n'a pas été cliquée*/
        let negativeOne = document.createElement("div"); /*création du -1*/
        negativeOne.className = "negative-one";
        negativeOne.innerHTML = "-1";

        let targetStyles =
          window.getComputedStyle(
            target
          ); /*récupérer l'emplacement des target pour faire partir les -1 du meme endroit*/
        negativeOne.style.top = targetStyles.getPropertyValue("top");
        negativeOne.style.left = targetStyles.getPropertyValue("left");

        container.appendChild(negativeOne);

        negativeOne.style.animation =
          "moveNegativeOne 2s linear"; /*faire remonter le "-1" jusqu'aux nuages*/

        setTimeout(function () {
          negativeOne.remove(); /*retirer le "-1" après l'animation*/
        }, 2000);

        score--; /*dimminuer le score*/
        scoreContainer.innerHTML = `Score : ${score}`;
      }
    }, 2000);

    target.onclick = function () {
      /*lorsqu'on clique sur target...*/
      score += 1; /*le score augmente de 1*/
      target.style.display = "none"; /*le target disparait*/
      clicked = true; /*si target cliqué, mettre la variable à true*/
    };
    time -= 1;

    scoreContainer.innerHTML = `Score : ${score}`; /*mettre à jour le score*/
    timeContainer.innerHTML = `Temps : ${time}`; /*mettre à jour le temps*/

    if (time == 0) {
      clearInterval(interval);
      container.innerHTML = "Le jeu est terminé.";
    }
  }, 1000); /*montrer une cible toutes les 1sec*/
};
