const form = document.querySelector("#searchForm");
form.addEventListener("submit", async function (e) {
    e.preventDefault();
    const searchTerm = form.elements.query.value;
    const config = {
        params: { q: searchTerm },
    };//possible to add more pairs of key:value

    const res = await axios.get(`http://api.tvmaze.com/search/shows`, config);
    makeImages(res.data);
    form.elements.query.value = " "; //clear the input
})

const makeImages = (shows) => {
    for (let result of shows) {
        if (result.show.image) { //only if a medium img exists
            const img = document.createElement("IMG");
            img.src = result.show.image.medium;
            document.body.append(img);
        }

    }
}



