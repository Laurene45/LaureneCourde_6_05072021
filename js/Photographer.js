class Photographer
{
    constructor(data)
    {
        this.name= data.name;
        this.id= data.id;
        this.city= data.city;
        this.country= data.country;
        this.tags= data.tags;
        this.tagline= data.tagline;
        this.price= data.price;
        this.portrait= data.portrait;
        
    }


    // Affichage profil sur la page photographers.html
    displayInfo()
    {
        document.getElementById('info').innerHTML = this.renderInfo();
    }
    
    displayFilters()
    {
        document.getElementById('filter').innerHTML = this.renderFilters();
    }
    
    displayProfile()
    {
        document.getElementById('presentation').innerHTML = this.renderProfile();
    }
    

    // --- insert le profil des photographes et leurs tags en HTML ... index.html
    render()
    {
        let tags = ' ';
        this.tags.forEach(tag => {
   
            tags += `<a href='#'><li><span data-filters-tag="${tag}" class="profil-tag">#${tag}</span></li></a>`

        })
        return `<article class="profiles">
                <a href="photographers.html?id=${this.id}" title="${this.name}">
                    <img src="img/Photographers_ID_Photos/small/${this.portrait}" alt="${this.name}">
                    <h2 class="name">${this.name}</h2>
                </a>
                <p class="location">${this.city}, ${this.country}</p>
                <p class="tagline">${this.tagline}</p>
                <p class="price">${this.price}€/jour</p>
                <ul class="filter">${tags}</ul>
            </article>`
    }


    // --- insert les données de la fiche photographe ... photographers.html
    // informations
    renderInfo()
    {
        return `<p class="info__likes"></p>
                <p class="info__price">${this.price}€/jour</p>`
    }

    // filtres 
    renderFilters()
    {
        return `<span class="filter__label" id="orderBy">Trier par</span>
                <div class="filter__list" id="filter__button" aria-labelledby="orderBy">
                    <div class="filter__list" role="button" aria-haspopup="listbox" aria-expanded="true" aria-labelledby="orderBy">
                        <button class="filter__list__item selected" data-name="popularity" tabindex="0" role="option" aria-activedescendant="true" aria-selected="true">Popularité</button>
                        <button class="filter__list__item" data-name="date" tabindex="0" role="option" aria-activedescendant="true" aria-selected="false">Date</button>
                        <button class="filter__list__item" data-name="title" tabindex="0" role="option" aria-activedescendant="true" aria-selected="false">Titre</button>    
                    </div>
                </div>`

                
    }


    // presentation
    renderProfile()
    {
        let tags = ' ';
        this.tags.forEach(tag => {
   
            tags += `<a href='index.html?tag=${tag}'><li><span data-filter="${tag}" class="presentation__info__tag">#${tag}</span></li></a>`

        })
        
        return `<div class="presentation__info">
                    <button class="presentation__info__contact btn" id="${this.id}" data-name="${this.name}">Contactez-moi</button>
                    <h1>${this.name}</h1>
                    <p class="presentation__info__location">${this.city}, ${this.country}</p>
                    <p class="presentation__info__description">${this.tagline}</p>
                    <ul class="tag">${tags}</ul>
                </div>

                <div class="presentation__image">
                    <img class="portrait" src="img/Photographers_ID_Photos/small/${this.portrait}" alt="${this.name}">
                </div>`
    }  
   
   
}


