class Media
{
    constructor(data)
    {
        this.id = data.id;
        this.photographerId = data.photographerId;
        this.title = data.title;
        this.tags = data.tags;
        this.likes = data.likes;
        this.hasBeenLiked = false;
        this.date = data.date;
        this.price = data.price;
        this.alt = data.alt;
        this.media = [];
    }  

    hate(e)
    {
        this.likes--;
        e.target.classList.remove('fill'); // coeur like vide
    }
    
    love(e)
    {
        this.likes++;
        e.target.classList.add('fill'); // coeur like rempli
    }
    
    //-- Likes : ompteurs +/-
    react(e)
    {
        if(this.hasBeenLiked)
        {
            this.hate(e); 
        } else {
            this.love(e);

        }
        this.hasBeenLiked = !this.hasBeenLiked;
        e.target.innerText = this.likes; // affiche compteur +/- chiffré like par photos/videos
    }
}


