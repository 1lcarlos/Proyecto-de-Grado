

$(document).ready(function () {

	var mymap = L.map('mapdiv', {
			zoomControl: true,			
		})
		.setView([4.66, -74.11], 11); // con el contructor map se crea el mapa y se centra la vista y el zoom
	

	var grayscale = L.tileLayer('http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png'),
		osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'),
		topomap = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png'),
		image = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}').addTo(mymap);
	

	//L.control.sideBySide(grayscale, image).addTo(mymap);//Este es el controlador del swipe

//Variables Globales
	const contenedorMapa = document.querySelector('#contenedor-mapa');


	var basemaps = {
		"topographic": topomap,
		"grayscale": grayscale,
		"osm": osm,
		"Imagen Satelital": image
	};


	
	var escala = new L.control.scale({imperial:false}).addTo(mymap);

	L.control.layers(basemaps).addTo(mymap) //finaliza el control de agregar y quitar capas


	


	mymap.on('mousemove', function (e) {
		var str = "Latitude: " + e.latlng.lat.toFixed(5) + "  Longitude: " + e.latlng.lng.toFixed(5) + "  Zoom Level: " + mymap.getZoom();
		$("#map_coords").html(str); // Agrego una funcion que reacciona al movimiento del mouse y muestra las coordenadas actuales en el footer.
	});	
	
	


	$('#estac').click(function esco_Esta(){


	  //var esta = $('#filter').val();
    //agregarEstacion(esta);
    agregarEstacion("TESTEO_MILI");
    // var gasTipo = $('#filter3').val();
    // return gasTipo;
	
    });  
    
   
    function pintarDatos(gas, feature){
      switch (gas) {
      case 'PM_10':
              if (feature.properties.PM_10 > 0 && feature.properties.PM_10 < 54) {
                return {
                  radius: feature.properties.PM_10,
                  fillColor: "#CCE5FF",
                  color: "#000",
                  weight: 1,
                  opacity: 1,
                  fillOpacity: 0.5};          		
              } else 
                if(feature.properties.PM_10 >= 54 && feature.properties.PM_10 < 154){
                  return {
                  radius: feature.properties.PM_10,
                  fillColor: "#00E400",
                  color: "#000",
                  weight: 1,
                  opacity: 1,
                  fillOpacity: 0.5};
              } else 
                if(feature.properties.PM_10 >= 154 && feature.properties.PM_10 < 254){
                
                return  {
                  radius: feature.properties.PM_10,
                  fillColor: "#FFFF00",
                  color: "#000",
                  weight: 1,
                  opacity: 1,
                  fillOpacity: 0.5};
              }else
                if(feature.properties.PM_10 >= 254 && feature.properties.PM_10 < 354){
                
                return {
                  radius: feature.properties.PM_10,
                  fillColor: "#FF7E00",
                  color: "#000",
                  weight: 1,
                  opacity: 1,
                  fillOpacity: 0.5};
              }else
                if(feature.properties.PM_10 >= 354 && feature.properties.PM_10 < 424){
                
                return {
                  radius: feature.properties.PM_10,
                  fillColor: "#FF0000",
                  color: "#000",
                  weight: 1,
                  opacity: 1,
                  fillOpacity: 0.5};	
              }else 
                {
                
                return {
                  radius: feature.properties.PM_10,
                  fillColor: "#8F3F97",
                  color: "#000",
                  weight: 1,
                  opacity: 1,
                  fillOpacity: 0.5} ;
              }        						
                  break;
      case 'PM_2_5': 
              if (feature.properties.PM_2_5 > 0 && feature.properties.PM_2_5 < 12) {
                return {
                  radius: feature.properties.PM_2_5,
                  fillColor: "#CCE5FF",
                  color: "#000",
                  weight: 1,
                  opacity: 1,
                  fillOpacity: 0.5};          		
              } else 
                if(feature.properties.PM_2_5 >= 12 && feature.properties.PM_2_5 < 35){
                  return {
                  radius: feature.properties.PM_2_5,
                  fillColor: "#00E400",
                  color: "#000",
                  weight: 1,
                  opacity: 1,
                  fillOpacity: 0.5};
              } else 
                if(feature.properties.PM_2_5 >= 35 && feature.properties.PM_2_5 < 55){
                
                return  {
                  radius: feature.properties.PM_2_5,
                  fillColor: "#FFFF00",
                  color: "#000",
                  weight: 1,
                  opacity: 1,
                  fillOpacity: 0.5};
              }else
                if(feature.properties.PM_2_5 >= 55 && feature.properties.PM_2_5 < 150 ){
                
                return {
                  radius: feature.properties.PM_2_5,
                  fillColor: "#FF7E00",
                  color: "#000",
                  weight: 1,
                  opacity: 1,
                  fillOpacity: 0.5};
              }else
                if(feature.properties.PM_2_5 >= 150 && feature.properties.PM_2_5 < 250){
                
                return {
                  radius: feature.properties.PM_2_5,
                  fillColor: "#FF0000",
                  color: "#000",
                  weight: 1,
                  opacity: 1,
                  fillOpacity: 0.5};	
              }else 
                {
                
                return {
                  radius: feature.properties.PM_2_5,
                  fillColor: "#8F3F97",
                  color: "#000",
                  weight: 1,
                  opacity: 1,
                  fillOpacity: 0.5} ;
              }     						
                break;
      case 'CO':
        if (feature.properties.CO > 0 && feature.properties.CO < 12) {
          return {
            radius: feature.properties.CO * 50,
            fillColor: "#CCE5FF",
            color: "#000",
            weight: 1,
            opacity: 1,
            fillOpacity: 0.5};          		
        } else 
          if(feature.properties.CO >= 12 && feature.properties.CO < 35){
            return {
            radius: feature.properties.CO * 50,
            fillColor: "#00E400",
            color: "#000",
            weight: 1,
            opacity: 1,
            fillOpacity: 0.5};
        } else 
          if(feature.properties.CO >= 35 && feature.properties.CO < 55){
          
          return  {
            radius: feature.properties.CO * 50,
            fillColor: "#FFFF00",
            color: "#000",
            weight: 1,
            opacity: 1,
            fillOpacity: 0.5};
        }else
          if(feature.properties.CO >= 55 && feature.properties.CO < 150 ){
          
          return {
            radius: feature.properties.CO * 50,
            fillColor: "#FF7E00",
            color: "#000",
            weight: 1,
            opacity: 1,
            fillOpacity: 0.5};
        }else
          if(feature.properties.CO >= 150 && feature.properties.CO < 250){
          
          return {
            radius: feature.properties.CO * 50,
            fillColor: "#FF0000",
            color: "#000",
            weight: 1,
            opacity: 1,
            fillOpacity: 0.5};	
        }else 
          {
          
          return {
            radius: feature.properties.CO * 50,
            fillColor: "#8F3F97",
            color: "#000",
            weight: 1,
            opacity: 1,
            fillOpacity: 0.5} ;
        }         								
      
          break;
      case 'NO2':

            if (feature.properties.NO2 > 0 && feature.properties.NO2 < 12) {
              return {
                radius: feature.properties.NO2,
                fillColor: "#CCE5FF",
                color: "#000",
                weight: 1,
                opacity: 1,
                fillOpacity: 0.5};          		
            } else 
              if(feature.properties.NO2 >= 12 && feature.properties.NO2 < 35){
                return {
                radius: feature.properties.NO2,
                fillColor: "#00E400",
                color: "#000",
                weight: 1,
                opacity: 1,
                fillOpacity: 0.5};
            } else 
              if(feature.properties.NO2 >= 35 && feature.properties.NO2 < 55){
              
              return  {
                radius: feature.properties.NO2,
                fillColor: "#FFFF00",
                color: "#000",
                weight: 1,
                opacity: 1,
                fillOpacity: 0.5};
            }else
              if(feature.properties.NO2 >= 55 && feature.properties.NO2 < 150 ){
              
              return {
                radius: feature.properties.NO2,
                fillColor: "#FF7E00",
                color: "#000",
                weight: 1,
                opacity: 1,
                fillOpacity: 0.5};
            }else
              if(feature.properties.NO2 >= 150 && feature.properties.NO2 < 250){
              
              return {
                radius: feature.properties.NO2,
                fillColor: "#FF0000",
                color: "#000",
                weight: 1,
                opacity: 1,
                fillOpacity: 0.5};	
            }else 
              {
              
              return {
                radius: feature.properties.NO2,
                fillColor: "#8F3F97",
                color: "#000",
                weight: 1,
                opacity: 1,
                fillOpacity: 0.5} ;
            } 
            break;
      case 'SO2':
        if (feature.properties.SO2 > 0 && feature.properties.SO2 < 12) {
          return {
            radius: feature.properties.SO2 * 50,
            fillColor: "#CCE5FF",
            color: "#000",
            weight: 1,
            opacity: 1,
            fillOpacity: 0.5};          		
        } else 
          if(feature.properties.SO2 >= 12 && feature.properties.SO2 < 35){
            return {
            radius: feature.properties.SO2 * 50,
            fillColor: "#00E400",
            color: "#000",
            weight: 1,
            opacity: 1,
            fillOpacity: 0.5};
        } else 
          if(feature.properties.SO2 >= 35 && feature.properties.SO2 < 55){
          
          return  {
            radius: feature.properties.SO2 * 50,
            fillColor: "#FFFF00",
            color: "#000",
            weight: 1,
            opacity: 1,
            fillOpacity: 0.5};
        }else
          if(feature.properties.SO2 >= 55 && feature.properties.SO2 < 150 ){
          
          return {
            radius: feature.properties.SO2 * 50,
            fillColor: "#FF7E00",
            color: "#000",
            weight: 1,
            opacity: 1,
            fillOpacity: 0.5};
        }else
          if(feature.properties.SO2 >= 150 && feature.properties.SO2 < 250){
          
          return {
            radius: feature.properties.SO2 * 50,
            fillColor: "#FF0000",
            color: "#000",
            weight: 1,
            opacity: 1,
            fillOpacity: 0.5};	
        }else 
          {
          
          return {
            radius: feature.properties.SO2 * 50,
            fillColor: "#8F3F97",
            color: "#000",
            weight: 1,
            opacity: 1,
            fillOpacity: 0.5} ;
        }         								
      
          break;
      
      case 'NO':

            if (feature.properties.NO > 0 && feature.properties.NO < 12) {
              return {
                radius: feature.properties.NO,
                fillColor: "#CCE5FF",
                color: "#000",
                weight: 1,
                opacity: 1,
                fillOpacity: 0.5};          		
            } else 
              if(feature.properties.NO >= 12 && feature.properties.NO < 35){
                return {
                radius: feature.properties.NO,
                fillColor: "#00E400",
                color: "#000",
                weight: 1,
                opacity: 1,
                fillOpacity: 0.5};
            } else 
              if(feature.properties.NO >= 35 && feature.properties.NO < 55){
              
              return  {
                radius: feature.properties.NO,
                fillColor: "#FFFF00",
                color: "#000",
                weight: 1,
                opacity: 1,
                fillOpacity: 0.5};
            }else
              if(feature.properties.NO >= 55 && feature.properties.NO < 150 ){
              
              return {
                radius: feature.properties.NO,
                fillColor: "#FF7E00",
                color: "#000",
                weight: 1,
                opacity: 1,
                fillOpacity: 0.5};
            }else
              if(feature.properties.NO >= 150 && feature.properties.NO < 250){
              
              return {
                radius: feature.properties.NO,
                fillColor: "#FF0000",
                color: "#000",
                weight: 1,
                opacity: 1,
                fillOpacity: 0.5};	
            }else 
              {
              
              return {
                radius: feature.properties.NO,
                fillColor: "#8F3F97",
                color: "#000",
                weight: 1,
                opacity: 1,
                fillOpacity: 0.5} ;
            } 
            break;


      default: console.log('no funciona');
        break;
    }} 


    function mostrarInfo(gas, quake){
        switch (gas) {
          case 'PM_10':
            const fechaVista = new Date (quake.feature.properties.end);

            var list = document.getElementById("displayed-list");
            list.innerHTML = "";
            var li = document.createElement("li");
            li.innerHTML = `
            MEDICION PM 10: ${quake.feature.properties.PM_10}	</br>
            FECHA: ${fechaVista.toString()}					
              `
            list.appendChild(li);
            break;
          case 'PM_2_5':
              var list = document.getElementById("displayed-list");
              list.innerHTML = "";
              var li = document.createElement("li");
              li.innerHTML = `
              MEDICION PM 2.5: ${quake.feature.properties.PM_2_5}	</br>
              FECHA: ${quake.feature.properties.end.getDate}					
                `
              list.appendChild(li);
              break;

          case 'NO':
                var list = document.getElementById("displayed-list");
                list.innerHTML = "";
                var li = document.createElement("li");
                li.innerHTML = `
                MEDICION NO: ${quake.feature.properties.NO}	</br>
                FECHA: ${quake.feature.properties.end.getDate}					
                  `
                list.appendChild(li);
                break;
          case 'SO2':
                  var list = document.getElementById("displayed-list");
                  list.innerHTML = "";
                  var li = document.createElement("li");
                  li.innerHTML = `
                  MEDICION SO2 ${quake.feature.properties.SO2}	</br>
                  FECHA: ${quake.feature.properties.end.getDate}					
                    `
                  list.appendChild(li);
                  break;
          case 'CO':
                    var list = document.getElementById("displayed-list");
                    list.innerHTML = "";
                    var li = document.createElement("li");
                    li.innerHTML = `
                    MEDICION CO ${quake.feature.properties.CO}	</br>
                    FECHA: ${quake.feature.properties.end.getDate}					
                      `
                    list.appendChild(li);
                    break;
        
          default:
            console.log('no funciona')
            break;
        }
    }



	
function agregarEstacion(wfs){
		var boundaries9 = new L.WFS({
			url: 'http://localhost:8080/geoserver/calidad_aire_postgres/ows',
		 typeNS: wfs,
		 typeName: wfs,
		 crs: L.CRS.EPSG4326,
		 geometryField: 'geom',
		 style: {
		   color: 'red',
		   weight: 1,
		   
		   
			 } 
			 
	   }).once('load', function enviarformulario() {
							 
                 var geoJsons = boundaries9.toGeoJSON();
                 console.log(geoJsons)
                 console.log(new Date(geoJsons.features[0].properties.FECHA).getTime());
                 console.log(geoJsons.features[0].properties.NO2);
                 console.log(geoJsons.features[0].properties.NO );
                 
                  
                 
                 
                 var timeline = L.timeline(geoJsons,{                     
                    pointToLayer: function (feature, latlng) { 
                        console.log(feature); 
                        const gas = $('#filter3').val();
                        return L.circleMarker(latlng,pintarDatos(gas,feature))
                                }

                }).addTo(mymap);  
                
                const fechaIni = document.querySelector('input[name="trip-start"]').value;
				        const fechaFin = document.querySelector('input[name="trip-end"]').value;

          
           var timelineControl = L.timelineSliderControl({
                    // start: inicio,
                    // end: fin,   
                    start: new Date(fechaIni).getTime(),
                    end: new Date(fechaFin).getTime(),
                    formatOutput: function (date) {
                      return new Date(date).toString();
                    },
                    duration: 30000
                  });
           function updateList(timeline) {
                  var displayed = timeline.getLayers();
                  //var list = document.getElementById("displayed-list");
                  //list.innerHTML = "";
                  displayed.forEach(function (quake) {
                    const gas = $('#filter3').val();
                    console.log(gas);
                    mostrarInfo(gas,quake);


                    // var li = document.createElement("li");
                    // li.innerHTML = `
                    // MEDICION ${quake.feature.properties.gas}	
                    // FECHA: ${quake.feature.properties.end}					
                    //   `
                    // list.appendChild(li);
                  });
                }

                
                timelineControl.addTo(mymap);
                timelineControl.addTimelines(timeline);
                timeline.addTo(mymap);
                timeline.on("change", function (e) {
                  updateList(e.target);
                });
                updateList(timeline);    

		 });//fin duncion enviar formulario

    }//fin funcion agregar estacion 2 
	
});