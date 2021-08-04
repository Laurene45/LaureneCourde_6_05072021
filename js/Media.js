class Media
{
    constructor(data)
    {
        this.id = data.id;
        this.photographerId = data.photographerId;
        this.title = data.title;
        this.image = data.image;
        this.video = data.video;
        this.tags = data.tags;
        this.likes = data.likes;
        this.date = data.date;
        this.price = data.price;
        this.type = 'image';

        if (data.hasOwnProperty('video')){
            this.type = 'video';
        }   
    }

       
    renderImage(medias)
    {   
        if(this.type === 'image'){

            return `<figure class="media__card">
                        <a href="#" class="media__card__container" id="${this.photographerId}">
                            <img src="img/${this.photographerId}/${this.image}" alt="${this.title}">
                        </a>

                        <figcaption class="media__card__details">
                            <p class="media__card__details__title">${this.title}</p>
                            <p class="media__card__details__price">${this.price}€</p>
                            <button class="media__card__details__likes" data-id="${this.id}" aria-label="likes">${this.likes}</button>
                        </figcaption>
                    </figure>`

        }else{
            return `<figure class="media__card">
                        <a href="#" class="media__card__container" id="${this.photographerId}">
                            <video src ="img/${this.photographerId}/${this.video}" alt="${this.title}">
                            </video>
                        </a>

                        <figcaption class="media__card__details">
                            <p class="media__card__details__title">${this.title}</p>
                            <p class="media__card__details__price">${this.price}€</p>
                            <button class="media__card__details__likes" data-id="${this.id}" aria-label="likes">${this.likes}</button>
                        </figcaption>
                    </figure>`
        }      
    }
}