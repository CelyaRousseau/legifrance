var menuLeft      = document.getElementById( 'cbp-spmenu-s1' ),
    showLeft      = document.getElementById( 'showLeft' ),
    body          = document.body;
 
  showLeft.onclick = function() {
      classie.toggle( this, 'active' );
      classie.toggle( menuLeft, 'cbp-spmenu-open' );
      disableOther( 'showLeft' );
  };