import {Details} from "./details.js";
import {Ui} from "./ui.js";
import {Games} from './games.js';

export class Sort{
    constructor(){
        document.querySelectorAll('.nav-link').forEach((link) => {
            link.addEventListener('click', () => {
                console.log(link.dataset.category);
                this.sortGames(link.dataset.category)
                document.getElementById('currentGames').innerHTML = link.dataset.category;
                document.querySelectorAll('.activeButton').forEach((active) => {
                    active.classList.remove('activeButton')
                })
                link.classList.add('activeButton');
            })
        })
        this.ui = new Ui();
    }

    async sortGames(category){
        const url = `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${category}`;
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
            this.ui.showSorted(result)
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
        $('#detailsContainer').removeClass('d-none')
        $('#carouselExampleIndicators').toggle()
        $('.navbar').removeClass('sticky');
        $('.navbar').addClass('d-none');
        
     }


}
