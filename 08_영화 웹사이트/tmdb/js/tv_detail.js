const options = {
   method: 'GET',
   headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNDBmMWMzNTE4YzMwNjIyMTUzYjQ1YWFkMDRmZjM5ZiIsIm5iZiI6MTczMDA3NjA0MS42MzQ4OTQsInN1YiI6IjY3MWFlOGNhNGJlMTU0NjllNzBkYTAzMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6e5SpGKIAq_rmVzGqdKV8bJHsjasDx9hhIEgWpZqwA4',
   },
}

const urlParams = new URLSearchParams(window.location.search)

const tvId = urlParams.get('series_id')

const tvDetailUrl = `https://api.themoviedb.org/3/tv/${tvId}?language=ko-KR`

const mainContainer = document.querySelector('main .container')

const getDetailTv = async (tvDetailUrl) => {
   try {
      const response = await fetch(tvDetailUrl, options)
      const data = await response.json()
      let overview = data.overview == '' ? '- None -' : data.overview
      console.log(data)

      const imgSrc = `https://image.tmdb.org/t/p/w300${data.poster_path}`
      const rowHtml = `
        <div class="row">
                  <div class="col-sm-3" style="text-align:center">
                     <img src="${imgSrc}" class="poster-detail" alt="${data.name}" style="max-width:100%"/>
                  </div>
                  <div class="col-sm-9 movie-detail">
                     <h2>${data.name}</h2>
                     <ul class="movie-info">
                        <li>원제 : ${data.original_name}</li>
                        <li>원어 : ${data.original_language.toUpperCase()}</li>
                        <li>
                           장르 : ${data.genres.map((genre) => {
                              return ' ' + genre.name
                           })}
                        </li>
                     </ul>
                    
                     <p>평점 ${data.vote_average.toFixed(1) == 0.0 ? '미반영' : data.vote_average.toFixed(1)}</p>
                     <p>첫 방영일 : ${data.first_air_date}</br>
                     최근 방영일 : ${data.last_air_date}</p>
                     
                     </br>
                     <p>줄거리 : </p>
                     
                     
                     
                     <p>${overview}</p>
                  </div>
               </div>`
      mainContainer.innerHTML += rowHtml

      let secondCon = `<div class="row">`
      secondCon += `<div class="col-sm-12 season">`
      let seasons = ''
      for (let i = 0; i < data.seasons.length; i++) {
         let season = `<p><a href="#">시즌 ${i + 1}(에피소드 : ${data.seasons[i].episode_count})</a> - ${data.seasons[i].air_date == null ? '미' : data.seasons[i].air_date} 방영</P>`
         seasons += season
      }
      secondCon += seasons
      secondCon += `</div>
       </div>`
      mainContainer.innerHTML += secondCon
   } catch (error) {
      console.log('에러 발생 : ', error)
   }
}

getDetailTv(tvDetailUrl)
