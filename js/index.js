const url = new URLSearchParams(window.location.search);
const tag = url.get('tag') || false;


fetch('data.json') // renvoie une promesse
.then((response) => response.json()) // renvoie aussi une promesse
.then((data) => {

        let list = new List();
        //-- afficher les 6 photographes (Photographer.js)
        data.photographers.forEach((item) => {
            let photographe = new Photographer(item);
            list.add(photographe);
        });

        let people = list.all // variable par defaut
        list.getTags();
        list.displayTags();
        if(tag)
        {
            let button = document.querySelector('[data-filter="' + tag + '"]');
            list.activateTag(button, tag);
            people = list.filter();

        }

            list.display(people); // passe tous les photographes une 1ere fois.
            
            //-- prends les tags de la page photographe et filtre sur le même tag sur l'index.html.
            list.listenForFilter();
            list.listenForFiltersTags();
            
           
        
        
        
           
})

        
        
        


