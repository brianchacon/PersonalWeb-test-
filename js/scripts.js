//const jsonData= require('../Files/proyects.json');

/* window.onscroll = function() {

  var home      = document.getElementById('home');
  var about     = document.getElementById('about');
  var portfolio = document.getElementById('portfolio');
  var contact   = document.getElementById('contact');

  var posicionhome       = home.getBoundingClientRect();
  var posicionabout      = about.getBoundingClientRect();
  var posicionportfolio  = portfolio.getBoundingClientRect();
  var posicioncontact    = contact.getBoundingClientRect();

  //Limpiamos los colores
  editElementsByClass("navImg",null,"navBotActive");

  let selected = "navBotHome";

  if(posicioncontact.y<98)
     selected = "navBotContact";   
  
  else if(posicionportfolio.y<98)
      selected = "navBotPortfolio";
  
  else if(posicionabout.y<98)
     selected = "navBotAbout";
  
  else if(posicionhome.y<98)
      selected = "navBotHome";
 
  //agregamos a quien debe tener la clase necesitamos agregar
  editElementClass(selected,"navBotActive",null);
  editElementClass(selected+"Mobile","navBotActive",null);
}; */


//Agregar y/o quitar clases a un elemento by id
/* function editElementClass(id,addClass,deleteClass){

  var elem = document.getElementById(id);

  if(deleteClass !=  null)
    elem.classList.remove(deleteClass);
  if(addClass !=  null) 
    elem.classList.add(addClass);
} */

//Agregar y/o quitar clases a un conjunto de elementos by class
/* function editElementsByClass(className,addClass,deleteClass){

  var elems = document.getElementsByClassName(className);

  for (var i = 0; i<elems.length; i++) {

    if(deleteClass !=  null)
      elems[i].classList.remove(deleteClass);
    if(addClass !=  null) 
      elems[i].classList.add(addClass);
  }
} */

var proyectList = [];

function loadProyects(){
  
  const dire = 'https://ideaschacon.com/ich/proyects/getAll.php';
  
  fetch(dire)
  .then(response => {
     return response.json();
  })
  .then(jsondata => {
    proyectList = jsondata;
    proyectList.forEach(proyect => {
      interpolation(proyect)
    });
  });
  
}

function interpolation(proyect){
  const id = proyect.id;
  const name = proyect.name;
  const company = proyect.company;
  const techs = proyect.techs;
  const description = proyect.description;
  const dateData = proyect.dateData;
  const imgUrls = proyect.imgUrls;
  const link = proyect.link;
  let buttons = "";
  let count = 0;
  imgUrls.forEach( url =>{
    count++;
    buttons += '<button class="portfolio-item-card-list-option" onclick="setImage('+id+',\''+url+'\','+count+','+imgUrls.length+')" id="btnItem'+id+'_'+count+'">'+count+'</button>';
  });
  const imgDefault = imgUrls.length >0 ?  imgUrls[0] : '';
  
  const newItemStr = 
    ' <div class="col-12 col-md-12 pageContainer" >'+
    '  <div class="portfolio-item-card-shadow">'+
    '      <div class="card portfolio-item-card">'+
    '          <div class="row">'+
    '              <div class="col-12" style="text-align: center;margin-bottom: 35px;">'+
    '                  <span class="text-span-colored-blue" style="font-size: 50px;">'+name+'</span>'+
    '              </div>'+
    '              <div class="col-7">'+
    '                  <span class="portfolio-item-card-preview">'+
    '                      <span class="portfolio-item-card-img-container">'+
    '                          <img src="'+imgDefault+'" alt="" class="" loading="lazy" id="imgPreview'+id+'">'+
    '                      </span>'+
    '                      <span class="portfolio-item-card-img-selector">'+
    '                          <span class="portfolio-item-card-list">'+
 buttons+
    '                          </span>'+
    '                      </span>'+
    '                  </span>'+
    ''+
    '              </div>'+
    '              <div class="col-5" style="border-left: 2px solid #e5e5e5;">'+
    '                  <h3>'+company+'</h3>'+
    '                  <span style="min-height: 16vh;">'+
    '                      <p class="portfolio-item-card-p-link">'+
    '                          <a class="" href="'+link+'" target="_blank" >'+
                                            link+
    '                          </a>'+
    '                      </p>'+
    '                      <p>'+description+'</p>'+
    '                  </span>'+
    ''+
    '                  <p class="date-text">'+dateData+'</p>'+
    '                  '+
    '                  <b>'+techs+'</b>'+
    '              </div>'+
    '          </div>'+
    '      </div>'+
    '  </div>'+
    ''+
    '</div>';

  document.getElementById('portfolio').innerHTML = document.getElementById('portfolio').innerHTML + newItemStr;

  document.getElementById('btnItem'+id+'_1').classList = ['portfolio-item-card-list-option active'];
}


function setImage(id,src,count,length){
  document.getElementById('imgPreview'+id).src = src;

  for(let i = 1; i<length+1; i++){

    document.getElementById('btnItem'+id+'_'+i).classList = ['portfolio-item-card-list-option'];
  }
  document.getElementById('btnItem'+id+'_'+count).classList = ['portfolio-item-card-list-option active'];
}

function selectMenuOption(id,className){
  //Obtenemos elementos activos y les quitamos la propiedad de activo
  let selectedList = document.getElementsByClassName('btn-menu-active');
  for(let i= 0; i< selectedList.length;i++){
    const elem = selectedList[i];
    
    var list2 = [];
    
    for(let j= 0; j< document.getElementById(elem.id).classList.length;j++){
      const c = document.getElementById(elem.id).classList[j];
    
      if(c == 'btn-menu-active'){
        list2[j] = 'btn-menu';
      } else {
        list2[j] = c ;
      }
    }
    
    document.getElementById(elem.id).classList = list2.join(' ');
  }

  //Marcamos nuevo elemento activo
  var list = [];
  
  for(let i= 0; i< document.getElementById(id).classList.length;i++){
    const c = document.getElementById(id).classList[i];
    if(c == 'btn-menu'){
      list[i] = 'btn-menu-active';
    } else {
      list[i] = c;
    }
  }
  
  document.getElementById(id).classList = list.join(' ');
}