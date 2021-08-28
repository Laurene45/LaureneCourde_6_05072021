class List
{
    constructor()
    //-- complète le constructor avec des methodes()
    {
        this.all = [];
        this.tags = new Set();
        this.tagSelected = new Set();
    }
    //Set() evite les doublons / stocke des valeurs uniques, type primitif ou des objets
    
    //-- Tags : activés dans la navigation
    activateTag(button, tag)
    {
        button.classList.add('actived')
        this.tagSelected.add(tag);
    }
     
    //-- ajoute les photographes
    add(photographe)
    {
        this.all.push(photographe)
    }

    //-- Tags : désactivés dans la navigation
    deactivate(button, tag)
    {
        button.classList.remove('actived')
        this.tagSelected.delete(tag);
    }

    //-- Affichage : apparaît les profils 6 photographes
    display(photographers)
    {   
        //vider le html au départ pour eviter d'avoir un doublon de profil photographes.
        document.getElementById ('photographers').innerHTML = ' ';

        photographers.forEach(photographe =>
        {
            document.getElementById ('photographers').innerHTML += photographe.render();
            // insert les balises HTML (rend() dans Photographer.js)
        })        
    }

    //--Tags: affichés dans la navigation en html
    displayTags()
    {
        let html = '<ul>';
        this.tags.forEach((tag)=>
        {
            html += `<a href='#'><li><span data-filter="${tag}" class="tag-filter">#${tag}</span></li></a>`
        })

        html += '</ul>'
        
        document.getElementById ('navbar').innerHTML = html; 
    }

    //-- Tags : filtrer (profils photographe avec # nav).
    filter()
    {
        let list =  new Set();

        this.tagSelected.forEach(tag =>
        {
            this.all.filter((photographe) =>
            {
                if (photographe.tags.includes(tag)){
                    list.add(photographe);
                }
            })
        })

        return list;
    }
    
    //-- Tags : récupère toute la liste Tags pour afficher dans navigation
    getTags()
    {
        this.all.forEach(photographe =>
        {
            photographe.tags.forEach(tag =>
            {
               this.tags.add(tag)
               // rempli le tableau set() dans le construtor (this.tags)
            })
        });
    }
    
    //-- Tags : écoute les tags de la navigation / filtre les photographes #
    listenForFilter()
    {
        document.querySelectorAll('.tag-filter').forEach(tag =>
        {
            tag.addEventListener('click', (e) =>
            {
                let tagDom = e.target;
                // tagDom prend l'element en lui-même; pas une chaîne de caractères

                let tag = tagDom.getAttribute('data-filter');
                //permet de savoir sur quel tag, on clique
                if (this.tagSelected.has(tag)) {
                    this.deactivate(tagDom, tag);

                }else {
                    this.activateTag(tagDom, tag);
                }

                let list = this.filter();
                if (this.tagSelected.size === 0) {
                    list = this.all;
                }
                this.display(list);
            })
        })  
    }

    //-- Tags: filtrer tags des profils 6 photographes
    listenForFiltersTags()
    {
        document.querySelectorAll('.profil-tag').forEach(tag =>
        {
            tag.addEventListener('click', (e) =>
            {
                let tagDom = e.target;
                // tagDom prend l'element en lui-même; pas une chaîne de caractères

                let tag = tagDom.getAttribute('data-filters-tag');
                
                
                //permet de savoir sur quel tag, on clique
                if (this.tagSelected.has(tag)) {
                    this.deactivate(tagDom, tag); 
                    
                    
                }else {
                    this.activateTag(tagDom, tag)
                }
                
                let list = this.filter();

                if (this.tagSelected.size === 0) {
                    list = this.all;
                }
                this.display(list); 
                
            })
        })
    }

}    