export class Ui{
    showGames(data){
        const gamesContainer = document.getElementById('gamesContainer');
        let games = ''
        document.getElementById('noResults').innerHTML = data.length + ' results';
        for(var i = 0; i < data.length; i++){
            const descMaxLength = 70;
            let description = data[i].short_description;
            if(description.length > descMaxLength){
                description = description.substring(0, descMaxLength) + '...';
            }
            const titleMaxLength = 20;
            let title = data[i].title;
            if(title.length > titleMaxLength){
                title = title.substring(0, titleMaxLength) + '...';
            }

            var platformHtml = document.querySelectorAll('platform');
            var platform = '';
            if(data[i].platform == 'PC (Windows)'){
                data[i].platform = '<i class="bi bi-windows" title="Available On Windows"></i>';
            } else {
                data[i].platform = '<i class="fa-solid fa-desktop" title="Available Online"></i>';
            }
            platformHtml.innerHTML = platform;

            games += `<div class="col">
                        <div class="gameCard" data-id="${data[i].id}">
                            <div class="contentDiv">
                                <figure>
                                    <img src="${data[i].thumbnail}" class="w-100" alt="">
                                    <figcaption class="my-2"><span class="fs-4">${title}<span></figcaption>
                                    <span style="color: rgb(148, 64, 148);">${data[i].developer}</span>
                                </figure>
                                <p class="fs-5">${description}</p>
                            </div>
                            <div class="bottomDiv">
                                <span class="platform">
                                    ${data[i].platform}
                                </span>
                                <span class="badge">${data[i].genre}</span>
                            </div>
                        </div>
                    </div>`



        }

        
        gamesContainer.innerHTML = games;
    }

    showDetails(data){
        const detailsContainer = document.getElementById('detailsContainer')
        const detailsData = `<div class="detailsScreen my-4 w-100" style="z-index: 10">
        <i class="fa fa-times" id="closeButton"></i>
        <div class="row detailsCard g-4 gap-2">
            <div class="col-md leftSide">
              <div class="row">  
                  <div class="col mainDisplayImage">
                    <i class="fa fa-arrow-left" aria-hidden="true"></i>
                    <i class="fa fa-arrow-right" aria-hidden="true"></i>
                    <img src="${data.thumbnail}" class="w-100 mainThumbnail" alt="">
                  </div>
              </div>
              <div class="row screenshots">
                  <div class="col-3">
                    <img class="ss" src="${data.thumbnail}" id="${data.screenshots?.[0]?.id}" alt="">
                  </div>
                  <div class="col-3">
                    <img class="ss" src="${data.screenshots?.[0]?.image}" id="${data.screenshots?.[1]?.id}" alt="">
                  </div>
                  <div class="col-3">
                    <img class="ss" src="${data.screenshots?.[1]?.image}" id="${data.screenshots?.[2]?.id}" alt="">
                  </div>
                  <div class="col-3">
                    <img class="ss" src="${data.screenshots?.[2]?.image}" id="${data.screenshots?.[3]?.id}" alt="">
                  </div>
                </div>
                <a href="${data.game_url}"><button>Game Link</button></a>
            </div>
  
            <div class="col-md rightSide">
              <h1>${data.title}<span class="fs-5">(${data.release_date})</span></h1>
              <hr>
              <span class="badge">${data.genre}</span> <span class="badge">${data.platform}</span> <br>
              <span >Developer <a href="">${data.developer}</a> | Publisher <a href="">${data.publisher}</a></span>
              <p class="my-3">${data.description}</p>
              <div id="accordion">
                <div class="card">
                  <div class="card-header" id="headingOne">
                    <h5 class="mb-0">
                      <button class="btn" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                        System Requirements
                      </button>
                    </h5>
                  </div>
              
                  <div id="collapseOne" class="collapse" aria-labelledby="headingOne" data-parent="#accordion">
                    <div class="card-body">
                      <span class="fs-5">Os </span> <span>Windows 7 64-Bit (SP1) or Windows 10 64-Bit</span><br>
                      <span class="fs-5">Processor </span> <span>Intel Core i3-4340 or AMD FX-6300</span><br>
                      <span class="fs-5">Memory </span> <span>8GB RAM</span><br>
                      <span class="fs-5">Graphics </span> <span>NVIDIA GeForce GTX 670 / GeForce GTX 1650 or Radeon HD 7950</span><br>
                      <span class="fs-5">Storage </span> <span>175GB HD space</span><br>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </div>
      </div>
        `;

        detailsContainer.innerHTML = detailsData;
        
        $('#closeButton').on('click', function(){
            $('#carouselExampleIndicators').toggle()
            $('#detailsContainer').addClass('d-none')
            $('.navbar').removeClass('d-none');
            $('.navbar').addClass('sticky');

        })


        document.querySelectorAll(".ss").forEach((screenshot) => {
            screenshot.addEventListener("click", () => {
               const screenshotImage = screenshot.getAttribute('src');
            //    this.showDetails(gameId);
            //    data.thumbnail = screenshotImage;
            document.querySelector('.mainThumbnail').setAttribute('src', screenshotImage);
            });
        });
        
        var index = 0;

        document.querySelector('.fa-arrow-right').addEventListener('click', function(e){
            index +=1;
            var screenshotsArray = document.querySelectorAll(".ss");
            if(index == screenshotsArray.length){
                index = 0;
            }
            for(var i = 0; i < screenshotsArray.length; i++){
                document.querySelector('.mainThumbnail').setAttribute('src', screenshotsArray[index].getAttribute('src'))
            }
            console.log(index);
        })

        document.querySelector('.fa-arrow-left').addEventListener('click', function(e){
            index -=1;
            var screenshotsArray = document.querySelectorAll(".ss");
            if(index <= 0){
                index = screenshotsArray.length;
            }
            for(var i = 0; i < screenshotsArray.length; i++){
                document.querySelector('.mainThumbnail').setAttribute('src', screenshotsArray[index].getAttribute('src'))
            }
            console.log(index);
        })


    }

    showSorted(data){
        const gamesContainer = document.getElementById('gamesContainer');
        gamesContainer.innerHTML = '';
        let games = ''
        document.getElementById('noResults').innerHTML = data.length + ' results';

        for(var i = 0; i < data.length; i++){
            const descMaxLength = 70;
            let description = data[i].short_description;
            if(description.length > descMaxLength){
                description = description.substring(0, descMaxLength) + '...';
            }
            const titleMaxLength = 20;
            let title = data[i].title;
            if(title.length > titleMaxLength){
                title = title.substring(0, titleMaxLength) + '...';
            }

            var platformHtml = document.querySelectorAll('platform');
            var platform = '';
            if(data[i].platform == 'PC (Windows)'){
                data[i].platform = '<i class="bi bi-windows" title="Available On Windows"></i>';
            } else {
                data[i].platform = '<i class="fa-solid fa-desktop" title="Available Online"></i>';
            }
            platformHtml.innerHTML = platform;

            games += `<div class="col">
                        <div class="gameCard" data-id="${data[i].id}">
                            <div class="contentDiv">
                                <figure>
                                    <img src="${data[i].thumbnail}" class="w-100" alt="">
                                    <figcaption class="my-2"><span class="fs-4">${title}<span></figcaption>
                                    <span style="color: rgb(148, 64, 148);">${data[i].developer}</span>
                                </figure>
                                <p class="fs-5">${description}</p>
                            </div>
                            <div class="bottomDiv">
                                <span class="platform">
                                    ${data[i].platform}
                                </span>
                                <span class="badge">${data[i].genre}</span>
                            </div>
                        </div>
                    </div>`



        }

        
        gamesContainer.innerHTML = games;
    }

    showRelevant(data){
        const relevantContainer = document.querySelector('.carousel-inner');
        let games = ''
        for(var i = 0; i < 5; i++){
            const descMaxLength = 200;
            let description = data[i].short_description;
            if(description.length > descMaxLength){
                description = description.substring(0, descMaxLength) + '...';
            }
            const titleMaxLength = 20;
            let title = data[i].title;
            if(title.length > titleMaxLength){
                title = title.substring(0, titleMaxLength) + '...';
            }

            var platformHtml = document.querySelectorAll('platform');
            var platform = '';
            if(data[i].platform == 'PC (Windows)'){
                data[i].platform = '<i class="bi bi-windows" title="Available On Windows"></i>';
            } else {
                data[i].platform = '<i class="fa-solid fa-desktop" title="Available Online"></i>';
            }
            platformHtml.innerHTML = platform;

            games += `<div class="carousel-item">
                        <div class="gameCard" data-id="${data[i].id}">
                            <div class="row" style="width: 100%;">
                                <div class="contentDiv col-lg-6 p-3">
                                    <figure>
                                        <img src="${data[i].thumbnail}" class="w-100" alt="">
                                        <figcaption class="my-2"><span class="fs-4">${data[i].title}<span></figcaption>
                                        <span style="color: whitesmoke; background-color: blueviolet; border-radius: 15px; padding: 5px;">${data[i].developer}</span>
                                    </figure>
                                </div>
                                <div class="col-lg-6 p-3">
                                    <p class="fs-5">${description}</p>
                                </div>
                                <div class="bottomDiv">
                                    <span class="platform">
                                        ${data[i].platform}
                                    </span>
                                    <span class="badge">${data[i].genre}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    `
        }
        relevantContainer.innerHTML = games;
        document.querySelectorAll('.carousel-item')[0].classList.add('active');

    }
}