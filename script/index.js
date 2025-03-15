//Remove Active Buttons
function removeActiveClass() {
  const activeButtons = document.getElementsByClassName("active");

  for (let btn of activeButtons) {
    btn.classList.remove("active");
  }
}
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

      <button id="btn-${cat.category_id}" onclick="loadCategoryVideos(${cat.category_id})" class="btn btn-sm hover:bg-red-500 hover:text-white">${cat.category}</button>
    `;

    //append the element
    categoryContainer.appendChild(categoryDiv);
  }
}
//Dynamic Video API
function loadVideos() {
  fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then((response) => response.json())
    .then((data) => {
      displayVideos(data.videos);
      removeActiveClass();
      document.getElementById("btn-all").classList.add("active");
    });
}
const displayVideos = (videos) => {
  const videoContainer = document.getElementById("video-container");

  videoContainer.innerHTML = ""; //এইটার কারণে আগে ভিডিও গুলা গায়েব হয়ে যাবে

  if (videos.length == 0) {
    videoContainer.innerHTML = `
      <div class="col-span-full mt-40 justify-center items-center text-center flex flex-col">
        <img class="w-[120px]" src="./resources/Icon.png" alt="">
        <h2 class="text-2xl font-bold">OOOPS Sorry . There is No Content Here</h2>
     </div>`;
    return;
  }

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

//Load By Category API
const loadCategoryVideos = (id) => {
  const url = `https://openapi.programming-hero.com/api/phero-tube/category/${id}`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      const clickedButton = document.getElementById(`btn-${id}`);
      removeActiveClass();
      clickedButton.classList.add("active");

      clickedButton.classList.add("active");
      displayVideos(data.category);
    });
};

//Function Call Area (DONT REMOVE ANYTHING)
loadCategories();
