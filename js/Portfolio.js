class Portfolio 
{
    constructor()
    {
        this.all = [];
        this.dropDownOpen = false; //etat open/close
        this.currentSliderIndex = 0; // enregistre l'index du slider actuel
    }

    //-- Like : compteur total de likes en bas de page
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
    build()
    {
        this.display();
        this.listenForReactions();
        this.listenForSlider(); // écoute le slider lightbox
        //this.listenForPrevious();
        //this.listenForNext();
    }
    
    //-- affiche les galeries images et videos
    display()
    {
        document.getElementById('media').innerHTML ='';

        this.all.forEach(media =>
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

    //-- Dropdown : ouvre avec la flèche popularité/date/titre
    listenForDropdownToggle()
    {
        document.getElementById('filter__button').addEventListener('click', ()  => {

            let element = document.getElementById('filter__button');
            

            if(element.classList.contains('open'))
            {
                element.classList.remove('open');
                this.dropDownOpen = false;
                document.getElementById('current-filter').style.display ="block";   
                document.getElementById('listbox').style.display ="none"; 

            } else {
                element.classList.add('open');  
                this.dropDownOpen = true;
                document.getElementById('current-filter').style.display ="none";
                document.getElementById('listbox').style.display ="block";
                                      
            }				
        })
    }

    //-- Filtres : populaire/date/titre en récupérant l'attribut data-name
    listenForFilters()
    {
        document.querySelectorAll(".filter__list__item").forEach(filter => {
            filter.addEventListener('click', (e) =>
            {
                if(this.dropDownOpen){
                    
                    let filter = e.target.getAttribute('data-name');
                    this.updateDropdownfilter(filter);
                    this.orderBy(filter);
                    this.build();

                }
            })
        })
    }   

    //-- Dropdown : mis à jour avec le data-name sélectionné
    updateDropdownfilter(filter)
    {
        document.getElementById('current-filter').innerText = filter ;
    }
    

    //-- Like coeur : ajoute et retire des likes sur le coeur
    listenForReactions() 
    {
        this.all.forEach(media => 
        {
            document.querySelector(`[data-reaction-id="${media.id}"]`).addEventListener('click', (e) => 
            {
                media.react(e); // compteur des likes +/- (media.js)
                this.createCount();
                
            })
            
        })
    }


    //-- Filtres : populaire/titre/date
    orderBy(filter)
    {
        if(filter === 'Popularité') 
        {
           this.all = this.all.sort((a, b) => b.likes - a.likes);
        }

        if(filter === 'Date') 
        {
            this.all = this.all.sort((a, b) => b.date.localeCompare(a.date));
        } 

        if(filter === 'Titre') 
        {
            this.all = this.all.sort((a, b) => a.title.localeCompare(b.title))
        }
    }
        
    //-- Lightbox
    listenForSlider()
    {
        const items = document.querySelectorAll('.media__card__container');
            
            items.forEach(item => {
                item.addEventListener('click', (e) =>
                {
                    e.stopPropagation();
                    let parent = e.target.closest('.media__card__container');
                    let id = parent.getAttribute('data-media-id');
                    this.startSlider();
                    this.currentSliderIndex = this.all.findIndex(element => element.id == id);
                    // findIndex: methode qui récupère un index dans un tableau
                    this.showSlide();
                })
            })
    }

    // -- LightBox : démarrer le slider
    startSlider()
    {
        document.getElementById('slider').classList.remove('hidden');
        document.getElementById('lightboxClose').addEventListener('click', () => 
        {
            this.hideSlider()
        })  
    }
    
    //-- Lightbox : affichage avec le Render Video et images
    showSlide()
    {
        this.all[this.currentSliderIndex].showSlide();
        console.log(this.currentSliderIndex, this.all[this.currentSliderIndex].title);
        
    }

    //-- Lightbox : fermer le slider
    hideSlider()
    {
        document.getElementById('slider').classList.add('hidden');
    }

    //-- Lightbox : boutons next et previous
    listenForNext()
    {
        document.querySelector('.lightbox__next').addEventListener('click', (e) =>
        {
            e.stopPropagation();
            //si l'index est égale au nombre d'élément du filtered
            if((this.currentSliderIndex +1) === this.all.length)
            {
                this.currentSliderIndex = 0; // repasse à la première slide
            } else {
                this.currentSliderIndex += 1; // avancer les slides +1
            }
            this.showSlide();
        })

    }   

    listenForPrevious()
    {
        document.querySelector('.lightbox__prev').addEventListener('click', (e) =>
        {
            // si on est sur l'index 0, il faut aller à la dernière -1
            
            if((this.currentSliderIndex) == 0)
            {
                this.currentSliderIndex = this.all.length -1
            } else {
                this.currentSliderIndex -= 1; // recule les slides -1
            }
            this.showSlide();  
        })
    }


    //-- Formulaire : lance la modal
    launchModal()
    {
        document.querySelector(".modal-btn").addEventListener("click", () =>
        {
            const contactBg = document.querySelector("#contact");
            const contactBtn = document.querySelector(".modal-btn");
            const contactName = document.querySelector("#contactName");
            const main= document.querySelector("main");

            document.body.classList.add('modalOpen');
            contactName.textContent = "Contactez-moi " +  
            contactBtn.getAttribute('data-name');
            contactBg.style.display = "block";
            main.setAttribute('aria-hidden', 'true');
            contactBg.setAttribute('aria-hidden', 'false');
        })
    
    }
   
    // -- Formulaire : ferme la modal
    closeModal()
    {
        document.querySelector("#contactClose").addEventListener("click", () =>
        {
            const contactCloseBtn = document.querySelector("#contactClose");
            const contactBg = document.querySelector("#contact");
            const main= document.querySelector("main");

            document.body.classList.remove('modalOpen');
            contactBg.style.display = "none";
            main.setAttribute('aria-hidden', 'false');
            contactBg.setAttribute('arria-hidden', 'true');


        })
    }
    
    //-- Formulaire : envoi
    sendForm()
    {
        const form = document.getElementById("form");

        form.addEventListener("submit", (e) => {
            e.preventDefault();
            this.submitForm();
        })
        
    }


    //-- Formulaire: affichage des 3 champs dans les logs
    submitForm()
    {
        const firstname = document.getElementById("firstname");
        const lastname = document.getElementById("lastname");
        const email = document.getElementById("email");
        const message = document.getElementById("message");

	    console.log("Nom: " + firstname.value + ", prénom: " + lastname.value + ", email: " + email.value + ", message: " + message.value);		
    }


}
    

