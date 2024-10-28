// 서버한테 같이 전달하는 포스트잇 같은 느낌

const options = {
   method: 'GET', // RestFul 방식 중 GET 방식으로 요청
   headers: {
      accept: 'application/json', // json 객체 형태로 데이터를 받겠다고 서버에 요청

      // 보안을 위해 서버에서 주는 인증키
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNDBmMWMzNTE4YzMwNjIyMTUzYjQ1YWFkMDRmZjM5ZiIsIm5iZiI6MTcyOTgyNTU4NS4wMDc2MTcsInN1YiI6IjY3MWFlOGNhNGJlMTU0NjllNzBkYTAzMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.r0n3jw1asuVg5vYtGCaoSnJshm2WaKoWsKJ4L4gNsRs',
   },
}
// fetch: 서버에 request를 요청하는 자바스크립트에서 제공하는 함수
// fetch(request 주소, request 할 때 서버에 같이 전달하는 옵션)
// 물음표 뒤는 쿼리스트링 : 서버에 보내는 값들

// promise, async, await = 비동기
// request 해주는 과정을 비동기로 동작시키고 있다
// 사용자가 웹사이트를 사용할 때 서버에서 관련 자료를 받지 못하더라도 다른 기능을 사용하게 하기 위해선 서버에서 자료를 받아오는 과정을 비동기로 적용 해야한다
const url = 'https://api.themoviedb.org/3/movie/now_playing?language=ko&page=1&region=KR'
const getPlayingMovies = async (url) => {
   try {
      const response = await fetch(url, options) // 서버에서 데이터를 가져올 때까지 기다려준다

      const data = await response.json() // await는 fetch가 비동기적으로 실행되므로 fetch 내에서 순차적으로 작업을 처리해야할 때 await를 붙인다
      const results = data.results
      const container = document.querySelector('main .container')
      let rowsHtml = '' // 모든 row를 담을 문자열 변수

      for (let i = 0; i < results.length; i += 4) {
         let rowHtml = '<div class="row">'
         for (let j = 0; j < 4; j++) {
            const index = i + j
            if (index >= results.length) break
            const movie = results[index]
            rowHtml += `
             <div class="col-sm-3 p-3">
                     <div class="card">
                        <a href="./detail.html?movie_id=${movie.id}"> <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" class="card-img-top poster" alt="${movie.title}" /></a>

                        <div class="card-body">
                           <p class="card-text title">${movie.title}</p>
                           <p class="card-text average">${movie.vote_average.toFixed(1)}</p>
                        </div>
                     </div>
                  </div>
             `
         }
         rowHtml += '</div>'
         rowsHtml += rowHtml
      }

      container.innerHTML = rowsHtml
   } catch {
      console.log('에러 발생', error)
   }
}
getPlayingMovies(url)

// getPlayingMovies(url)
//    .then((res) => res.json()) // res 에는 다양한 정보들이 모두 포함되어 있어서 .json을 붙여 json 객체만 가져온다
//    .then((res) => console.log(res))
//    .catch((err) => console.error(err)) // requset 할 때 문제 발생시 실행
