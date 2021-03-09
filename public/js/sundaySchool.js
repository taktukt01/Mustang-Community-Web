$(function(){
    baguetteBox.run('.tz-gallery');

    var scroll = new SmoothScroll('a[href*="#"]',{
        speed: 500
    });


    $("#moreInfoBtn").on('click', function(){
        $(".culturalparagraph").toggle();
        $(".titleHeader").toggle();

        
    });

    $("#close").on('click', function(){
        $(".culturalparagraph").toggle();
        $(".titleHeader").toggle();

    });
    $("#ModalCloseButton").on('click', function(){
        $(".culturalparagraph").toggle();
        $(".titleHeader").toggle();

    });
    
    
    
    $('#sidebarCollapse').on('click', function () {


        // sidebar is just clicked
        // if it is already activethen show the content next to it.
        if( $(this).hasClass('active')){
            $('.pageDetails').show();
        }
        else{
        $('.pageDetails').hide();
      
        }

        $('#sidebar').toggleClass('active');
        $(this).toggleClass('active');
    });

});