$(function(){
    baguetteBox.run('.tz-gallery');

    var scroll = new SmoothScroll('a[href*="#"]');

    
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