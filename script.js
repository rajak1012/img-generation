const accessKey = "bNh0EkvGucj72-F8TEQR8eVDk7BuAfO7KrUEDC3_7u0";

const searchForm = document.getElementById("search-form");
const searchBox = document.getElementById("search-box");
const searchResult = document.getElementById("search-result");
const showMoreBtn = document.getElementById("show-more-btn");

let keyword = "";
let page = 1;

async function searchImages() {
    keyword = searchBox.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=12`;

    try {
        const response = await fetch(url);
         
        const data = await response.json();//used to get the data / object using json
         
        // Clear previous results if page is 1 (new search)
        if (page === 1) {
            searchResult.innerHTML = "";
        }
        

        // Access the 'results' array in the response
        const results = data.results;
    
        results.forEach((result) => {
            const image = document.createElement("img");
            image.src = result.urls.small;
            image.alt = result.alt_description;
            //img element creat , result urls send 

            const imagelink = document.createElement("a");
            imagelink.href = result.links.html;
            imagelink.target = "_blank";
            imagelink.appendChild(image);
            searchResult.appendChild(imagelink);
            // console.log(imagelink)
            //img send to  next page using <a href > 
        });

        // Show the "Show more" button only if there are more results
        if (data.total_pages > page) {
            showMoreBtn.style.display = "block";
        } else {
            showMoreBtn.style.display = "none";
        }
         

    } catch (error) {
        console.error("Error fetching images:", error);
    }
}

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    page = 1;
    searchImages();
});

showMoreBtn.addEventListener("click", () => {
    page++;
    searchImages();
});
