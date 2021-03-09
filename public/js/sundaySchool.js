$(function () {
    baguetteBox.run('.tz-gallery');

    var scroll = new SmoothScroll('a[href*="#"]', {
        speed: 500
    });

    function toggleModals() {
        $(".culturalparagraph").toggle();
        $(".titleHeader").toggle();
    }

    $("#moreInfoBtn").on('click', toggleModals());

    $("#close").on('click', toggleModals());
    $("#ModalCloseButton").on('click', toggleModals());
    $('button.close').on('click', toggleModals());


    $('#sidebarCollapse').on('click', function () {


        // sidebar is just clicked
        // if it is already activethen show the content next to it.
        if ($(this).hasClass('active')) {
            $('.pageDetails').show();
        } else {
            $('.pageDetails').hide();

        }

        $('#sidebar').toggleClass('active');
        $(this).toggleClass('active');
    });

});