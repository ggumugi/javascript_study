const options = {
   method: 'GET',
   headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNDBmMWMzNTE4YzMwNjIyMTUzYjQ1YWFkMDRmZjM5ZiIsIm5iZiI6MTczMDA3NjA0MS42MzQ4OTQsInN1YiI6IjY3MWFlOGNhNGJlMTU0NjllNzBkYTAzMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6e5SpGKIAq_rmVzGqdKV8bJHsjasDx9hhIEgWpZqwA4',
   },
}

// 현재 페이지의 url을 사용하여 URLSearchParams 객체 생성
const urlParams = new URLSearchParams(window.location.search)

// 특정 쿼리 스트링 값 가져오기 (예 : ?movie_id=573435)
const movieId = urlParams.get('movie_id')

const movieDetailUrl = `https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR`

const mainContainer = document.querySelector('main .container')
// 1. 영화 상세정보 바인딩
const getDetailMovie = async (movieDetailUrl) => {
   try {
      const response = await fetch(movieDetailUrl, options)
      const data = await response.json()

      // w300 = width 300px
      const imgSrc = `https://image.tmdb.org/t/p/w300${data.poster_path}`
      const rowHtml = `
        <div class="row">
                  <div class="col-sm-3" style="text-align:center">
                     <img src="${imgSrc}" class="poster-detail" alt="${data.title}" style="max-width:100%"/>
                  </div>
                  <div class="col-sm-9 movie-detail">
                     <h2>${data.title}</h2>
                     <ul class="movie-info">
                        <li>개봉일 ${data.release_date}</li>
                        <li>
                           ${data.genres.map((genre) => {
                              return genre.name
                           })}
                        </li>
                        <li>${data.runtime}분</li>
                     </ul>
                     <p>평점 ${data.vote_average.toFixed(1) == 0.0 ? '미반영' : data.vote_average.toFixed(1)}</p>
                     <p>${data.overview}</p>
                  </div>
               </div>`
      mainContainer.innerHTML += rowHtml
      await getCreditsMovie(movieCreditsUrl) // 영화 상세 설명을 가져오고 나서 실행한다
   } catch (error) {
      console.log('에러 발생 : ', error)
   }
}

getDetailMovie(movieDetailUrl)

// 2. 출연 배우 데이터 바인딩
const movieCreditsUrl = `https://api.themoviedb.org/3/movie/${movieId}/credits?language=ko-KR`

const getCreditsMovie = async (movieCreditsUrl) => {
   try {
      const response = await fetch(movieCreditsUrl, options)
      const data = await response.json()

      //console.log(data)

      let castRowHtml = `<div class="row" style="margin-top: 30px">`

      // 배우 6명만 출력
      for (let i = 0; i < 6; i++) {
         let profileImg = !data.cast[i].profile_path ? `./images/person.png` : `https://image.tmdb.org/t/p/w200${data.cast[i].profile_path}`

         castRowHtml += `
          <div class="col-sm-2 p-3">
                     <div class="card">
                        <img src="${profileImg}" alt="${data.cast[i].name}" class="card-img-top" />
                     </div>
                     <div class="card-body">
                        <p class="card-text">${data.cast[i].name}</p>
                     </div>
                  </div>
           `
      }
      castRowHtml += `</div>`

      // 기존에 영화 상세정보가 있기 때문에 누적합산으로 추가해준다

      mainContainer.innerHTML += castRowHtml
   } catch (error) {
      console.log('에러 발생 : ', error)
   }
}

// 비동기 문제로 배우가 위에 뜰 때도 있고(배우 정보가 먼저 불러와짐) 아래 뜰 때도 있음(영화 정보가 먼저 불러와짐)
