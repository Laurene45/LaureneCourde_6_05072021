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

        list.getTags();
        list.displayTags();
        //-- prends les tags de la page photographe et filtre sur le même tag sur l'index.html.
        list.display(list.all); // passe tous les photographes une 1ere fois.
        list.listenForFilter();
        list.listenForFiltersTags();

        
    })

        
        
        


