//appeler l'api fetch() pour récupérer les ressources
// utiliser un live server
// tout ce qui circule sur le net est une chaîne de caractère
fetch("data.json")
    .then((response) => {
        return response.json();
    
    })

    .then((data) => {
        console.log(data);
        showPhotographers(data);
        
    });










// fonctions 
// --- afficher photographes sur index.html
function showPhotographers(data){
    for(let i = 0; i < data.photographers.length; i++) {
        let photographe = data.photographers[i];
        console.log(photographe);

        let sectionPhotographers = document.getElementById('photographers');
        let articlePhotographers = document.createElement('article');
        articlePhotographers.className ='profiles';
    
        let templatePhotographer = `
        <a href="photographers.html?id=${photographe.id}" title="${photographe.name}">
            <img src="img/Photographers_ID_Photos/${photographe.portrait}" alt="${photographe.alt}">
            <h2 class="name">${photographe.name}</h2>
        </a>
        <p class="location">${photographe.city}, ${photographe.country}</p>
        <p class="tagline">${photographe.tagline}</p>
        <p class="price">${photographe.price}€/jour</p>
        
        `
        sectionPhotographers.appendChild(articlePhotographers);
        articlePhotographers.innerHTML = templatePhotographer;
        
    }
}    
