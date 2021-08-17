class Portfolio 
{
    constructor()
    {
        this.all = [];
        this.id = [];
        this.likes = [];
        this.date = [];
        this.title = [];
        this.filter = new Set();
        this.filterSelected = new Set();
        document.getElementById('slider').innerHTML = this.buildSliderDOM();
        this.dropDownOpen = false; //etat open/close
        
    
        
    }

    //-- compteur total de likes en bas de page
    createCount(media)
    {
        
        let counter= 0;

        for(let i = 0; i < this.all.length; i++)
        {
            counter += this.all[i].likes;
        }

        document.querySelector('.info__likes').textContent = counter;
    }
    
    //-- construit l'affichage de la galerie 
    build(list)
    {
        this.display(list);
        this.listenForReactions(list);
    }
    

    //-- affiche les galeries images et videos
    //list lié aux filtres popularité/date/titre du dropdown
    display(list)
    {
        document.getElementById('media').innerHTML ='';

        list.forEach(media =>
        {  
            document.getElementById('media').innerHTML += media.render();     
        })  
    }
    

    //-- recupère les médias et remplit le squelette.
    hydrate(data)
    {
        let factory = new MediaFactory();
        //boucle sur tous les medias qu'on a
        data.forEach(item => 
        {
            //formate les données du Json pour les mettres en class Media
            let media = factory.build(item);
            this.all.push(media) 
        });    
    }


    //-- ouvre dropdown popularité/date/titre avec la flèche
    listenForDropdownToggle()
    {
        document.getElementById('filter__button').addEventListener('click', ()  => {

            let element = document.getElementById('filter__button');

            if(element.classList.contains('open'))
            {
                element.classList.remove('open');
                this.dropDownOpen = false;
            } else {
                element.classList.add('open');  
                this.dropDownOpen = true;
            }				
        })
    }


    //-- filtre sur populaire/date/titre en récupérant l'attribut data-name
    listenForFilters()
    {
        document.querySelectorAll(".filter__list__item").forEach(filter => {
            filter.addEventListener('click', (e) =>
            {
                if(this.dropDownOpen){
                    
                    let filter = e.target.getAttribute('data-name');
                    let list = this.orderBy(filter);
                    this.build(list);
                } 
            })
        })
    }   


    //-- ajoute et retire des likes sur le coeur
    listenForReactions(list) 
    {
        list.forEach(media => 
        {
            document.querySelector(`[data-reaction-id="${media.id}"]`).addEventListener('click', (e) => 
            {
                media.react(e); // compteur des likes +/- (media.js)
                this.createCount();
            })
            
        })
    }


    //-- filtrage sur populaire/titre/date
    orderBy(filter)
    {
        if(filter === 'popularity') 
        {
           return  this.all.sort((a, b) => b.likes - a.likes);
        }

        if(filter === 'date') 
        {
            return this.all.sort((a, b) => b.date.localeCompare(a.date));
        } 

        if(filter === 'title') 
        {
            return this.all.sort((a, b) => a.title.localeCompare(b.title))
        }
    }
        

    
    
    
    
    
  





















    //-- Lightbox : construction HTML 
    //-- construction html
    buildSliderDOM()
    {
        return `<div id="lightbox" class="lightbox">
                    <button class="lightbox__close" id="lightboxClose">Fermer</button> 
                    <button class="lightbox__next">Suivant</button> 
                    <button class="lightbox__prev">Précédent</button> 
                    <div class="lightbox__container">
                        <figure id="slide">
                        
                        </figure>
                    </div>
                </div> `    
        
    }


    ListenForSlider()
    {
        const items = document.querySelectorAll('.media__card__container');
            
            items.forEach(item => {
                item.addEventListener('click', (e) =>
                {
                    e.stopPropagation();
                    let parent = e.target.closest('.media__card__container');
                    let id = parent.getAttribute('data-media-id');
                    this.startSlider();
                    this.showSlide(id);
                    
                    console.log(id);

                    this.previousSlide();
                    this.nextSlide();
                    
                    
                })
            })
    }

    //Démarrer le slider de la lightbox
    startSlider()
    {
        document.getElementById('slider').classList.remove('hidden');
        document.getElementById('lightboxClose').addEventListener('click', () => 
        {
            this.hideSlider()

        })
        
    }
    
    //-- Afficher Lightbox avec le Render Video et images
    showSlide(id)
    {
        let media = this.all.find(media => media.id == id);
        media.showSlides();

    
        
    }

    //fermer le slider de la lightbox
    hideSlider()
    {
        document.getElementById('slider').classList.add('hidden');
    }


   
    // bouton next  et previous
    //ne recupère pas la source de l'image 
    nextSlide()
    {
        let nextBtn = document.querySelector('.lightbox__next');
        let lightbox = document.querySelector('#lightbox');
        let slider = document.querySelector('#slider');
        let link = document.querySelectorAll('.media__card__container');
        let media = [];
        

        nextBtn.addEventListener('click', (e) =>
        {

        
            e.preventDefault;
		   
            if (this.all.indexOf(media) < 0) {
                media = this.all[this.all.length - 1];
        
              } else {
                media = this.all[this.all.indexOf(media) - 1];
             
                console.log(media);
         
              }
        })

    }   


    previousSlide()
    {
        let previousBtn = document.querySelector('.lightbox__prev');
        let lightbox = document.querySelector('#lightbox');
        let slider = document.querySelector('#slider');
        let link = document.querySelectorAll('.media__card__container');
        let media = [];


        previousBtn.addEventListener('click', (e) =>
        {

           
            e.preventDefault;
            if (this.all.indexOf(media) + 1 >= this.all.length) {
                media = this.all[0];
              } else {
                media = this.all[this.all.indexOf(media) + 1];
              }
            console.log(media);
    
            
        })
     

    }
    

    
    
}
    

