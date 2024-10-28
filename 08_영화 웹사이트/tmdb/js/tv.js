const options = {
   method: 'GET',
   headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNDBmMWMzNTE4YzMwNjIyMTUzYjQ1YWFkMDRmZjM5ZiIsIm5iZiI6MTczMDA3NjA0MS42MzQ4OTQsInN1YiI6IjY3MWFlOGNhNGJlMTU0NjllNzBkYTAzMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6e5SpGKIAq_rmVzGqdKV8bJHsjasDx9hhIEgWpZqwA4',
   },
}

const tv_url = 'https://api.themoviedb.org/3/tv/popular?language=ko-KR&page=1'

const getTvPrograms = async (tv_url) => {
   try {
      const response = await fetch(tv_url, options)
      const data = await response.json()

      const container = document.querySelector('main .container')
      const results = data.results

      let tvhtml = ''
      for (let i = 0; i < results.length; i += 2) {
         let rowHtml = `<div class="row">`
         for (let j = 0; j < 2; j++) {
            const index = i + j
            if (index >= results.length) break
            const tvProgram = results[index]
            let overview = tvProgram.overview == '' ? '- None -' : tvProgram.overview
            rowHtml += `
             <div class="card md-3 tv_p" style="max-width: 600px;">
                <div class="row g-0 tv_card">
                    <a href="./tv_detail.html?series_id=${tvProgram.id}"  class="col-md-6">
                    <img src="https://image.tmdb.org/t/p/w500${tvProgram.poster_path}" class="img-fluid rounded-start" alt="${tvProgram.name}" style ="border-radius:5px" >
                    </a>
                    <div class="col-md-6">
                        <div class="card-body">
                            <h5 class="card-title">${tvProgram.name}</h5>
                            <p class="card-text">평점 : ${tvProgram.vote_average.toFixed(1)}</p>
                            <p class="card-text">줄거리 : </p>
                            <p class="card-text story">${overview}</p>
                            <p class="card-text"><small class="text-body-secondary">첫 방영일 : ${tvProgram.first_air_date}</small></p>
                        </div>
                    </div>
                </div>
            </div>
             `
         }
         rowHtml += `</div>`
         tvhtml += rowHtml
      }
      container.innerHTML = tvhtml
   } catch (e) {
      console.log('에러 발생 : ', e)
   }
}

getTvPrograms(tv_url)
