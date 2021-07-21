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
    
    // --- insert le profile des photographes et leurs tags en HTML
    render(){
        let tags = ' ';
        this.tags.forEach(tag => {
   
            tags += `<li><span>#${tag}<span></li>`

        })
        return `<article class="profiles">
                <a href="photographers-page.html?id=${this.id}" title="${this.name}">
                    <img src="img/Photographers_ID_Photos/${this.portrait}" alt="${this.alt}">
                    <h2 class="name">${this.name}</h2>
                </a>
                <p class="location">${this.city}, ${this.country}</p>
                <p class="tagline">${this.tagline}</p>
                <p class="price">${this.price}€/jour</p>
                <ul class="filter">${tags}</ul>
            </article>`
    }
}