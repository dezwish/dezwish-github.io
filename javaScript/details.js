import {Ui} from "./ui.js";

export class Details{
    constructor(id){
        this.ui = new Ui();
        this.getGameDetails(id);
    }

    async getGameDetails(gameId){
        var url = `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${gameId}`;
        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': '770c5d3380mshb33f8cd935247f0p139ab1jsn7b517679428a',
                'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
            }
        };

        try {
            var response = await fetch(url, options);
            var result = await response.json();
            this.ui.showDetails(result);
            console.log(result);
        } catch (error) {
        	console.error(error);
        }

    }
}