//Dynamic Button API

function loadCategories() {
  //fetch the data

  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories));
}

function displayCategories(categories) {
  const categoryContainer = document.getElementById("category-container");

  for (let cat of categories) {
    const categoryDiv = document.createElement("div");
    categoryDiv.innerHTML = `
      <button class="btn btn-sm hover:bg-red-500 hover:text-white">${cat.category}</button>
    `;
    //append the element
    categoryContainer.appendChild(categoryDiv);
  }
}

//Dynamic Video API

function loadVideos() {
  fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then((response) => response.json())
    .then((data) => displayVideos(data.videos));
}

const displayVideos = (videos) => {
  const videoContainer = document.getElementById("video-container");

  videos.forEach((video) => {
    const videoCard = document.createElement("div");

    videoCard.innerHTML = `
    <div class="card bg-base-100">
                <figure class="relative">

                    <img class="w-full h-[150px] object-cover" src="${video.thumbnail}" />
                    <span class="absolute bottom-2 right-2 text-white bg-black px-2 text-sm rounded">3hrs 56 min
                        ago</span>
                </figure>




                <div class="flex gap-3 px-1 py-5 shadow">

                    <div class="profile">
                        <div class="avatar">
                            <div class="ring-primary ring-offset-base-100 w-6 rounded-full ring ring-offset-2">
                                <img src="${video.authors[0].profile_picture}" />
                            </div>
                        </div>
                    </div>



                    <div class="intro">
                        <h2 class="text-sm font-semibold">${video.title}</h2>
                        <p class="text-sm text-gray-400 flex gap-1 ">${video.authors[0].profile_name}
                            <img class="w-5 h-5" src="https://img.icons8.com/?size=48&id=98A4yZTt9abw&format=png"
                                alt="">
                        </p>

                        <p class="text-sm text-gray-400 flex gap-1 ">${video.others.views} views</p>
                    </div>


                </div>
            </div>
    
    `;

    //append
    videoContainer.appendChild(videoCard);
  });
};

//Function Call Area (DONT REMOVE ANYTHING)
loadCategories();
loadVideos();
