import {Details} from "./details.js";
import {Ui} from "./ui.js";

export class Relevant{
    constructor(){
        this.getRelevant();
        this.ui = new Ui();
    }

    async getRelevant(){
        const url = 'https://free-to-play-games-database.p.rapidapi.com/api/games?sort-by=release-date';
        const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '770c5d3380mshb33f8cd935247f0p139ab1jsn7b517679428a',
            'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
        }
    };
    
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result);
        this.ui.showRelevant(result);
        this.getId()
        this.ui.showDetails(result)
    } catch (error) {
        console.error(error);
    }
}

getId() {
    document.querySelectorAll(".gameCard").forEach((card) => {
       card.addEventListener("click", () => {
          const gameId = card.dataset.id;
          this.showDetails(gameId);
          console.log(gameId);
       });
    });
 }

 showDetails(gameId){
    const details = new Details(gameId);
    $('#carouselExampleIndicators').toggle()
    $('#detailsContainer').removeClass('d-none')
    $('.navbar').removeClass('sticky');
    $('.navbar').addClass('d-none');
    
 }

}