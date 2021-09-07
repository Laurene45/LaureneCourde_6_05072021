class Video extends Media
{
    constructor(data)
    {
        //appel le constructor de la classe Parent
        super(data);
        this.src = data.video;

    }

       
    render()
    { 
        return `<figure class="media__card">
                    <a href="#" class="media__card__container" data-media-id="${this.id}" id="${this.photographerId}" titre="${this.alt}">
                        <video>
                            <source src="img/${this.photographerId}/${this.src}" alt="${this.alt}" type="video/mp4">
                        </video>
                    </a>

                    <figcaption class="media__card__details">
                        <p class="media__card__details__title">${this.title}</p>
                        <p class="media__card__details__price">${this.price}€</p>
                        <button class="media__card__details__likes" data-reaction-id="${this.id}" aria-label="likes">${this.likes}</button>
                    </figcaption>
                </figure>`
     
    }

    showSlide()
    {
        document.getElementById('slide').innerHTML = 
        `<video controls autoplay>
            <source src="img/${this.photographerId}/${this.src}" type="video/mp4">
        </video>
        <figcaption class="media__card__details">
            <p class="media__card__details__title">${this.title}</p>
        </figcaption>`
    }

}