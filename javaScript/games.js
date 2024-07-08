import {Details} from "./details.js";
import {Ui} from "./ui.js";
import {Sort} from "./sort.js";
import { Relevant } from "./relevant.js";

export class Games{
    
    constructor(){
        this.getGames();
        this.ui = new Ui;
        this.sort = new Sort;
        this.relevant = new Relevant;
        const self = this;

        document.getElementById('allGames').addEventListener('click', function(){
            document.getElementById('currentGames').innerHTML = "Top free"
            document.querySelectorAll('.activeButton').forEach((active) => {
                active.classList.remove('activeButton')
            })
            document.querySelector('.nav-item').classList.add('activeButton');
            self.getGames();
        })
    }

    async getGames(){
        const url = 'https://free-to-play-games-database.p.rapidapi.com/api/games';
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
            console.log('Data fetches successfully');

            this.ui.showGames(result);
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
        $('#carouselExampleIndicators').hide()
        $('#detailsContainer').removeClass('d-none')
        $('.navbar').removeClass('sticky');
        $('.navbar').addClass('d-none');
     }


}

