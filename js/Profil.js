//-- chaîne de requêtes url pour récupérer les pages photographes en fonction de leurs ID
const url = new URLSearchParams(window.location.search);
const id = url.get('id');

fetch('data.json') // renvoie une promesse
.then((response) => response.json()) // renvoie aussi une promesse
.then((data) => {

    //-- chercher l'id associé à celui de l'url.
    //find() renvoie la valeur du 1er élément trouvé dans le tableau qui respecte la condition donnée par la fonction de test passée en argument. Sinon, la valeur undefined est renvoyée.
    let item = data.photographers.find(photographer => photographer.id == id);
    let photographer = new Photographer(item);

    photographer.displayProfile();
    photographer.displayInfo();
    photographer.displayFilters();

    //-- filtre sur les médias où le photographe appartient
    let medias = data.media.filter(media => media.photographerId == id);
    let portfolio = new Portfolio(medias);
    portfolio.hydrate(medias);
    portfolio.build(portfolio.all);
    portfolio.listenForDropdownToggle();
    portfolio.listenForFilters();
   // portfolio.ListenForSlider();
    


    

    
   
   
    
    



   
    
    

   
    
    
    

    
    



    





    

    

        


     
        
})







