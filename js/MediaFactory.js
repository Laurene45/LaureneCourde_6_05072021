class MediaFactory
{
    build(data)
    {   
        //permet d'insérer tous types de médias
        if (data.hasOwnProperty('video'))
        {
            return new Video(data);
        }   

        if (data.hasOwnProperty('image'))
        {
            return new Image(data);
        }
    }

    
    
       
}