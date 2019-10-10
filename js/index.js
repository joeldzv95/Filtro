/*
  Creación de una función personalizada para jQuery que detecta cuando se detiene el scroll en la página
*/
$.fn.scrollEnd = function (callback, timeout) {
  $(this).scroll(function () {
    var $this = $(this);
    if ($this.data('scrollTimeout')) {
      clearTimeout($this.data('scrollTimeout'));
    }
    $this.data('scrollTimeout', setTimeout(callback, timeout));
  });
};
/*
  Función que inicializa el elemento Slider
*/
var slider;

function inicializarSlider() {
  slider = $("#rangoPrecio").ionRangeSlider({
    type: "double",
    grid: false,
    min: 0,
    max: 100000,
    from: 200,
    to: 80000,
    prefix: "$",
    onChange: function () {

    }


  });
}

/*
  Función que reproduce el video de fondo al hacer scroll, y deteiene la reproducción al detener el scroll
*/
function playVideoOnScroll() {
  var ultimoScroll = 0,
    intervalRewind;
  var video = document.getElementById('vidFondo');
  $(window)
    .scroll((event) => {
      var scrollActual = $(window).scrollTop();
      if (scrollActual > ultimoScroll) {
        video.play();
      } else {
        //this.rewind(1.0, video, intervalRewind);
        video.play();
      }
      ultimoScroll = scrollActual;
    })
    .scrollEnd(() => {
      video.pause();
    }, 10)
}

inicializarSlider();
playVideoOnScroll();

$(function () {
  showAll();
  //filterCity();
  //filterType();
  getFilter();

})


function showAll() {
  
  $('#mostrarTodos').on('click', function () {
    var datos;
    datos = {
      ciudad: "todos",
      tipo: "todos",
      precioI: "todos",
      precioF: "todos"
    }
    $.ajax({
      url: "./server.php",
      data: datos,
      success: function (data) {
        show(data);
      }
      });
 /*    
    $('.divider').append(`<div class="row">
                            <div class="col l4 img"> 
                          </div> 
                          <div class="col l6">
                          <span>Direccion:` .$value['Direccion']`</span><br>`)
    */}) 
}

function show(dato){
  $('.divider').html('');
  
  for (let index = 0; index < dato.length; index++) {
    $('.divider').append(`<div class="row">
                            <div class="col l4 img"> 
                              <img src="img/home.jpg" >
                            </div> 
                            <div class="col l6">
                              <span>Direccion :`+dato[index].Direccion+`</span><br>
                              <span>Ciudad :`+dato[index].Ciudad+`</span><br>
                              <span>Teléfono :`+dato[index].Telefono+`</span><br>
                              <span>Código Postal :`+dato[index].Codigo_Postal+`</span><br>
                              <span>Tipo :`+dato[index].Tipo+`</span><br>
                              <span>Precio :`+dato[index].Precio+`</span><br>
                            </div>
                          </div>`)
                          
    console.log(dato[index]);
  }
  
}

/* 

<div class="row">
                  <div class="col l4 img">
                    <img src="img/home.jpg" >
                  </div>
                  <div class="col l6">
                    <span>Direccion: '.$value['Direccion'].'</span><br>
                    <span>Ciudad : '.$value['Ciudad'].'</span><br>
                    <span>Telefono : '.$value['Telefono'].'</span><br>
                    <span>Codigo_Postal : '.$value['Codigo_Postal'].'</span><span>
                    <span>Tipo:'.$value['Tipo'].'  </span><br>
                    <span>Precio :'.$value['Precio'].'</span><br>
                  </div>
                </div>'
                
*/
/*
function filterCity(){

}

function filterType(){
  $('#selectTipo').on('change', function(){
    var valType = $("#selectTipo option:selected").text();
    console.log(valType);
  })
}
*/


function getFilter() {
  $('#submitButton').on('click', function () {

    var valCity = $("#selectCiudad option:selected").text()
  
    var valType = $("#selectTipo option:selected").text();
    
    var valPrice = slider[0]["value"];
    var pos = valPrice.indexOf(";");

    var valPriceI = valPrice.slice(0, pos);
 
    var valPriceF = valPrice.slice(pos + 1, valPrice.length);
   



    if (valCity == "Elige una ciudad") {
      valCity = "todos";
    }
    if (valType == "Elige un tipo") {
      valType = "todos"
    }


    var datos;
    datos = {
      ciudad: valCity,
      tipo: valType,
      precioI: valPriceI,
      precioF: valPriceF
    }
 
    $.ajax({
      url: "./server.php",
      data: datos,
      dataType: 'json',
      success: function (data) {
        show(data);

      }
    })

  })
}
