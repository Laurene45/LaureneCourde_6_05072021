class Portfolio
{
    constructor()
    {
        this.all = [];
        this.id = [];
        this.likes = [];
        
    }

    //-- compteur total de likes
    createCount(media)
    {
        let totalLikes = document.querySelector('.info__likes');
        let counter= 0;

        for(let i = 0; i < this.all.length; i++)
        {
            counter += this.all[i].likes;
        }

        totalLikes.textContent = counter;
        
    }
    
    //-- ajoute et retire des likes
    counterLike() 
    {
        let totalLikes = document.querySelector('.info__likes');
        const likes = document.querySelectorAll('.media__card__details__likes');
        let sumLikes = 0;
        
        likes.forEach(like => {

            like.addEventListener('click', (e) => 
            {
                for(let i = 0; i < this.all.length; i++) {
                    if(this.all[i].id == like.getAttribute('data-id')) {

                        if(like.classList.contains('fill')) {
                            this.all[i].likes--;
                            sumLikes--;
                            like.classList.remove('fill');

                        }else {
                            this.all[i].likes++;
                            sumLikes++;
                            like.classList.add('fill');
                        }

                        like.innerHTML = this.all[i].likes;
                        totalLikes.innerHTML = sumLikes ;
                    }

                    this.createCount();
                }
            })
        })
    }


    //-- affiche les galeries images et videos
    display()
    {
        this.all.forEach(media =>
        {  
            document.getElementById('media').innerHTML += media.renderImage();      
        })   
    }


    //-- recupère les médias et remplit le squelette.
    hydrate(data)
    {
        //boucle sur tous les medias qu'on a
        data.forEach(item => 
        {
            //formate les données du Json pour les mettres en class Media
            let media = new Media(item);
            this.all.push(media) 
        });
    }

    //-- menu filter populaire/date/titre
    filters()
    {
        const filters = document.querySelectorAll('.filter__list__item');
	    const filterList = document.querySelector('.filter__list');

        filters.forEach(filter => 
        {
            filter.addEventListener('click', (e) => 
            {
                if(filter.classList.contains('selected')) {
                    if(filterList.classList.contains('open')) {
                        filterList.classList.remove('open');

                    }else {
                        filterList.classList.add('open');
                        filters.forEach(filter => filter.setAttribute('tabindex', '0'));
                    }	
                			
                }else {
                    filterList.classList.remove('open');
                    filters.forEach(filter => filter.setAttribute('tabindex', '-1'));
                };
                
            })
        })

    }
    
}   


