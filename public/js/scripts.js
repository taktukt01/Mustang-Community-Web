/*!
    * Start Bootstrap - Freelancer v6.0.4 (https://startbootstrap.com/themes/freelancer)
    * Copyright 2013-2020 Start Bootstrap
    * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-freelancer/blob/master/LICENSE)
    */
    (function($) {
    "use strict"; // Start of use strict
  
    // Smooth scrolling using jQuery easing



  
// For Gallery
    // $("#mdb-lightbox-ui").load("mdb-addons/mdb-lightbox-ui.html");



   
    // $('.executiveMembers').click(function(){
// $(this).hide();

    // });

    
     
    function addExecMember(name, email,phone,fbLink){
      var code =`<li class="list-group-item"><strong> ` + name + `</strong>
      <ul>
      <li>
          Phone Number:` + phone + 
          `</li>
      
      <li>
      Email address: ` + email + `
      
      </li>
      
      <li>
      
      <a class="btn btn-outline-dark btn-social mx-1" href=`+email+`><i class="fab fa-fw fa-facebook-f"></i></a>
      
      </li>`
      ;
      
return code;
    }

    // This is a shortcut. 
    // In the future I would like to grab from an excel sheet and 
    // extract the data from there onto here
    // Adding Executive Members
    
    document.getElementById("execMember").innerHTML += addExecMember("Sonam Sangpo, President" , 
    "taktukgg@gmail.com","92939923932","https://www.facebook.com/taktuk2s/");


    document.getElementById("execMember").innerHTML += addExecMember("Tashi Lhagyal, Vice President","","");


    document.getElementById("execMember").innerHTML += addExecMember("Jamyang Choesang, Secretary","","","");

    document.getElementById("execMember").innerHTML += addExecMember("Karsang Gyamtso, Senior Adviser","","","");

    document.getElementById("execMember").innerHTML += addExecMember("Bhomo Lhakpa, Co-Adviser","","","");

    document.getElementById("execMember").innerHTML += addExecMember("Tsering Dhundup, Accountant","","","");

    document.getElementById("execMember").innerHTML += addExecMember("Tsering Wangdu, Co-accountant","","","");

    document.getElementById("execMember").innerHTML += addExecMember("Rinzin Gelek, Treasury","","","");

    document.getElementById("execMember").innerHTML += addExecMember("Tenzin Thupten, Co-treasury","","","");


    // Adding Board Members

    document.getElementById("boardMember").innerHTML += addExecMember("Sonam Duke","","","","");
    document.getElementById("boardMember").innerHTML += addExecMember("Tenzin Sonam","","","","");
    document.getElementById("boardMember").innerHTML += addExecMember("Pema Dorjee","","","","");
    document.getElementById("boardMember").innerHTML += addExecMember("Lhamo Dolkar","","","","");
    document.getElementById("boardMember").innerHTML += addExecMember("Kunga Sangpo","","","","");
    document.getElementById("boardMember").innerHTML += addExecMember("Lobsang Wangdi","","","","");
    document.getElementById("boardMember").innerHTML += addExecMember("Jamyang Choesang","","","","");


    //Adding New Members

    document.getElementById("newMember").innerHTML += addExecMember("Jigme Bista","","","");
    document.getElementById("newMember").innerHTML += addExecMember("Wangdi p Bista","","","");
    document.getElementById("newMember").innerHTML += addExecMember("Pema Tsering","","","");
    document.getElementById("newMember").innerHTML += addExecMember("Tashi Tsering","","","");
    document.getElementById("newMember").innerHTML += addExecMember("Dechen Wangmo","","","");
    document.getElementById("newMember").innerHTML += addExecMember("Karma Dhundup","","","");

  
  
 
    // Activate scrollspy to add active class to navbar items on scroll
    $('body').scrollspy({
      target: '#mainNav',
      offset: 80
    });
  

    $('img[data-enlargable]').addClass('img-enlargable').click(function(){
      var src = $(this).attr('src');
      var modal;
      function removeModal(){ 
        
        modal.remove(); 
        $('body').off('keyup.modal-close'); }
        
      modal = $('<div>').css({
          background: 'RGBA(0,0,0,.5) url('+src+') no-repeat center',
          backgroundSize: 'contain',
          width:'100%', height:'100%',
          position:'fixed',
          zIndex:'10000',
          top:'0', left:'0',
          cursor: 'zoom-out'
      }).click(function(){
removeModal();

      }).appendTo('body');
      //handling ESC
      $('body').on('keyup.modal-close', function(e){
        if(e.key==='Escape'){ 
removeModal();
         } 
      });
  });


  
    // Floating label headings for the contact form
    $(function() {
      $("body").on("input propertychange", ".floating-label-form-group", function(e) {
        $(this).toggleClass("floating-label-form-group-with-value", !!$(e.target).val());
      }).on("focus", ".floating-label-form-group", function() {
        $(this).addClass("floating-label-form-group-with-focus");
      }).on("blur", ".floating-label-form-group", function() {
        $(this).removeClass("floating-label-form-group-with-focus");
      });
    });
  
  })(jQuery); // End of use strict
  