
//función: limpia los botones que han sido seleccionados en la tabla de CÉDULA
function LimpiarBotonesCed(){
  const botonesCed = document.querySelectorAll('input[name="ced"]');
  for(let radio of botonesCed){
      radio.checked = false;
  }
}


//función: limpia los botones que han sido seleccionados en la tabla de PLACA
function LimpiarBotonesPlaca(){
    const botonesPlaca = document.querySelectorAll('input[name="pl"]');
    for(let radio of botonesPlaca){
          radio.checked = false;
    }
}


//función: Borra todas las respuestas si no hay ningún botón de cédula presionado.
function BorrarMensajePorPlaca(){
  const botonesCed = document.querySelectorAll('input[name="ced"]');
  for(let radio of botonesCed){
      if(radio.checked===false){
        document.getElementById("cedula").innerHTML = "";
        document.getElementById("placa").innerHTML = "";
        document.getElementById("mensaje1").innerHTML = "";
        document.getElementById("mensaje2").innerHTML = "";
      }
  }
}

//función: Borra todas las respuestas si no hay ningún botón de placa presionado.
function BorrarMensajePorCed(){
  const botonesPlaca = document.querySelectorAll('input[name="pl"]');
  for(let radio of botonesPlaca){
      if(radio.checked===false){
        document.getElementById("cedula").innerHTML = "";
        document.getElementById("placa").innerHTML = "";
        document.getElementById("mensaje1").innerHTML = "";
        document.getElementById("mensaje2").innerHTML = "";
      }
  }
}


//función: Comprueba si puede salir por pico y cedula y sacar el carro en pico y placa
//retorna: bool
function ComprovarPcPp(lista, n){
  let diaEsta = false;
  if(lista != null && n != null){
      for(var i=0;i<lista.length;i++){
          if(lista[i].includes(n)){
              diaEsta = true;
              break;
          }else{
           diaEsta = false;
          }
      }
  }
return diaEsta;
}


//función: Comprueba si puede salir por pico y cedula y sacar el vehículo en picoVida
//retorna: Bool
function ComprobarPcPv(lista,n){
  let diaEsta = false;
  if(lista != null && n != null){
    for(var i=0;i<lista.length;i++){
      if(lista[i].includes(n)){
              diaEsta = true;
              break;
      }else{
        diaEsta = false;
      }
    }
  }
return diaEsta;
}


//función: Comprueba que botón de cédula fue seleccionado
//retorna: string
function CedulaSeleccionado(){
    const botonesradio = document.querySelectorAll('input[name="ced"]');
    let valor;
    for(let radio of botonesradio){
        if(radio.checked){
            valor = radio.value;
        }
    }
  return valor;
}


//función: Comprueba que botón de placa fue seleccionado
//retorna: string
function PlacaSeleccionada(){
    const botonesplaca = document.querySelectorAll('input[name="pl"]');
    let valor;
    for(let radio of botonesplaca){
        if(radio.checked){
          valor = radio.value;
        }
    }
  return valor;
}


//parametros: string
//función: basado en una cédula(string), crea una lista con los días que esa cédula puede salir
//retorna: list
function PicoCedula(c){
    let dias = ['LUNES', 'MARTES','MIÉRCOLES','JUEVES','VIERNES','SÁBADO','DOMINGO'];
    let picoCed = [['1','2'],['3','4'],['5','6'],['7','8'],['9','0'],['1','3','5','7','9'],['0','2','4','6','8']];
    let diasDisponible = [];
      if(c !=null){
        for(var i = 0; i<7; i++){
            if(picoCed[i].includes(c)){
              diasDisponible.push(dias[i]);
            }
        }
      }
    return diasDisponible;
}


//parametros: string
//función: basado en una placa(string) y una lista de días, elimina de la lista el día en que esa placa tiene pico y placa.
//retorna: list
function  PicoPlacaParticular(p){
    let dias = ['LUNES', 'MARTES','MIÉRCOLES','JUEVES','VIERNES','SÁBADO','DOMINGO'];
    let picoPla = [['5', '6'], ['7', '8'],['9', '0'], ['1', '2'] ,['3', '4'], [], []];
    let diasDisponibles = dias;
    for(let i = 0; i<7; i++){
        if(picoPla[i].includes(p)){
            diasDisponibles.splice(i,1);
        }
    }
  return diasDisponibles;
}


//parametros: string
//función: basado en una placa(string), crea una lista con los días en los cuales esa placa puede salir 24h
//retorna: list
function PicoVida(p){
  let dias = ['LUNES', 'MARTES','MIÉRCOLES','JUEVES','VIERNES','SÁBADO','DOMINGO'];
  let placa = parseInt(p);
  let diasDisp = [];
      if(placa !=null){
            if(placa%2===0){
                diasDisp.push(dias[0]);
                diasDisp.push(dias[2]);
                diasDisp.push(dias[4]);
              }else {
                diasDisp.push(dias[1]);
                diasDisp.push(dias[3]);
                diasDisp.push(dias[5]);
              }
      }
    return diasDisp;
}

var Boton = document.getElementById("consultar");
Boton.onclick = function(){
  var ced = CedulaSeleccionado();
  var placa = PlacaSeleccionada();
  if(ced != null ){
      if(placa != null){
          var pC = PicoCedula(ced);
          var pV = PicoVida(placa);
          var pP = PicoPlacaParticular(placa);
          var mensaje1;
          var mensaje2;
          console.log(pC);
          console.log(pV);
          console.log(pP);
                if(ComprobarPcPv(pV,pC[0])){//0
                  if(ComprobarPcPv(pV,pC[1])){//1
                      if(ComprovarPcPp(pP,pC[0])){
                        if(ComprovarPcPp(pP,pC[1])){
                          mensaje1 = "Usted puede salir el " + pC[0] +" con vehículo todo el día";
                          mensaje2 = "puede salir el " + pC[1] +" con vehículo todo el día.";
                        }else {
                              mensaje1 = "Usted puede salir el día " + pC[0] +" con vehículo todo el día";
                              mensaje2 = "puede salir el día " + pC[1] +" con vehículo en horarios permitidos.";
                        }
                      }else{
                            if(ComprovarPcPp(pP,pC[1])){
                              mensaje1 = "Usted puede salir el día " + pC[0] +" con vehículo en horarios permitidos";
                              mensaje2 = "puede salir el " + pC[1] +" con vehículo todo el día.";
                            }else {
                              mensaje1 = "Usted puede salir el día " + pC[0] +" con vehículo en horarios permitidos";
                              mensaje2 = "puede salir el día " + pC[1] +" con vehículo en horarios permitidos.";
                            }
                      }
                  }else{//else 1
                      if(ComprovarPcPp(pP,pC[0])){
                            mensaje1 = "Usted puede salir el " + pC[0] +" con vehículo todo el día";
                            mensaje2 = "puede salir el día " + pC[1] +" sin vehículo.";
                      }else{
                            mensaje1 = "Usted puede salir el día " + pC[0] +" con vehículo en horarios permitidos";
                            mensaje2 = "puede salir el día" + pC[1] +" sin vehículo.";
                      }

                    }
                }else{//else 0
                    if(ComprobarPcPv(pV,pC[1])){
                          if(ComprovarPcPp(pP,pC[1])){
                            mensaje1 = "Usted puede salir el día "+ pC[0]+ " sin vehículo";
                            mensaje2 = "puede salir el " + pC[1] +" con vehículo todo el día.";
                          }else{
                            mensaje1 = "Usted puede salir el día "+ pC[0]+ " sin vehículo";
                            mensaje2 = "puede salir el día " + pC[1] +" con vehículo en horarios permitidos.";
                          }
                    }else{
                      mensaje1 = "Usted puede salir el día "+ pC[0]+ " sin vehículo";
                      mensaje2 = "puede salir el día "+ pC[1]+ " sin vehículo.";
                    }
                }
                document.getElementById("cedula").innerHTML = "Con número de CÉDULA terminada en "+ced;
                document.getElementById("placa").innerHTML = "y con número de PLACA terminada en "+placa +":";
                document.getElementById("mensaje1").innerHTML = mensaje1;
                document.getElementById("mensaje2").innerHTML = "y " + mensaje2;
                LimpiarBotonesCed();
                LimpiarBotonesPlaca();
      }else {//placa es null
        var pC = PicoCedula(ced);
        document.getElementById("cedula").innerHTML = "Usted puede salir los días "+ pC[0] + " y " +pC[1]+" en horarios permitidos";
        document.getElementById("placa").innerHTML = "";
        document.getElementById("mensaje1").innerHTML = "";
        document.getElementById("mensaje2").innerHTML = "";
      }
    }else {//cedula es null
        document.getElementById("cedula").innerHTML = "Por favor seleccione un número de cédula";
        document.getElementById("placa").innerHTML = "";
        document.getElementById("mensaje1").innerHTML = "";
        document.getElementById("mensaje2").innerHTML = "";
    }
}
