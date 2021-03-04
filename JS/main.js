

$(document).ready(function () {

	var mymap = L.map('mapdiv', {
			zoomControl: true,			
		})
		.setView([4.66, -74.11], 11); // con el contructor map se crea el mapa y se centra la vista y el zoom
	

	var grayscale = L.tileLayer('http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png'),
		osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'),
		topomap = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png'),
		image = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}').addTo(mymap);

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

//FUNCIONES
//Establece un color segun la magnirud de la medicion y la escala del IBOCA para gases contaminantes
function coloresPM10(valorGas){
	if (valorGas > 0 && valorGas < 54) {
		const color = "#CCE5FF"
		return(color);		
	} else 
		if(valorGas >= 54 && valorGas < 154){
		const color = "#00E400"
		return(color);
	} else 
		if(valorGas >= 154 && valorGas < 254){
		const color = "#FFFF00"
		return(color);
	}else
		if(valorGas >= 254 && valorGas < 354){
		const color = "#FF7E00"
		return(color);
	}else
		if(valorGas >= 354 && valorGas < 424){
		const color = "#FF0000"
		return(color);	
	}else 
		{
		const color = "#8F3F97"
		return(color);
	}
}
function coloresPM25(valorGas){
	if (valorGas > 0 && valorGas < 12) {
		const color = "#CCE5FF"
		return(color);		
	} else 
		if(valorGas >= 12 && valorGas < 35){
		const color = "#00E400"
		return(color);
	} else 
		if(valorGas >= 35 && valorGas < 55){
		const color = "#FFFF00"
		return(color);
	}else
		if(valorGas >= 55 && valorGas < 150){
		const color = "#FF7E00"
		return(color);
	}else
		if(valorGas >= 150 && valorGas < 250){
		const color = "#FF0000"
		return(color);	
	}else 
		{
		const color = "#8F3F97"
		return(color);
	}
}

function coloresNO(valorGas){
	if (valorGas >0 && valorGas < 100) {
		const color = "#CCE5FF"
		return(color);		
	} else 
		if(valorGas >= 101 && valorGas < 188){
		const color = "#00E400"
		return(color);
	} else 
		if(valorGas >= 189 && valorGas < 677){
		const color = "#FFFF00"
		return(color);
	}else
		if(valorGas >= 678 && valorGas < 1221){
		const color = "#FF7E00"
		return(color);
	}else
		if(valorGas >= 1222 && valorGas < 2349){
		const color = "#FF0000"
		return(color);	
	}else 
		{
		const color = "#8F3F97"
		return(color);
	}
}

function coloresCO(valorGas){
	if (valorGas >0 && valorGas < 4.4) {
		const color = "#CCE5FF"
		return(color);		
	} else 
		if(valorGas >= 4.5 && valorGas < 9.4){
		const color = "#00E400"
		return(color);
	} else 
		if(valorGas >= 9.4 && valorGas < 12.4){
		const color = "#FFFF00"
		return(color);
	}else
		if(valorGas >= 12.4 && valorGas < 15.4){
		const color = "#FF7E00"
		return(color);
	}else
		if(valorGas >= 15.4 && valorGas < 30.4){
		const color = "#FF0000"
		return(color);	
	}else 
		{
		const color = "#8F3F97"
		return(color);
	}
}

function coloresSO2(valorGas){
	if (valorGas >0 && valorGas < 35) {
		const color = "#CCE5FF"
		return(color);		
	} else 
		if(valorGas >= 35 && valorGas < 75){
		const color = "#00E400"
		return(color);
	} else 
		if(valorGas >= 75 && valorGas < 185){
		const color = "#FFFF00"
		return(color);
	}else
		if(valorGas >= 185 && valorGas < 304){
		const color = "#FF7E00"
		return(color);
	}else
		if(valorGas >= 304 && valorGas < 604){
		const color = "#FF0000"
		return(color);	
	}else 
		{
		const color = "#8F3F97"
		return(color);
	}
}


function limpiarMapa(marker){
	$('#Limpiar').click(function remove() {
		mymap.removeLayer(marker);
		var bounds = [[4.83510, -73.78624], [4.48333, -74.43358]];
		mymap.fitBounds(bounds);		

}); 
}

// ESCOGE EL DIA CLAVE COMPARA LA FECHA CON LA QUE ESCOGE EL USUARIO
function diaClave(propie){

	for(i=0; i< propie.length; i++){
		var info = propie[i].properties;	

		const latitud = info.LATITUD;	  
		const longitud = info.LONGITUD;		   
		const fecha = info.FECHA;
		const pm10 = info.PM_10;
		const pm25 = info.PM_2_5;
		const NO2 = info.NO2;
		const NO = info.NO;
		const co = info.CO;
		const so2 = info.SO2;

		const fechaFormulario = document.querySelector('input[name="trip"]').value;	
			
		
		const unicaFecha = new Date(fechaFormulario);
		const transcurso1 = unicaFecha.getTime()
			

		//capturar la fecha del WFS y convertirla a milisegundos
		
		
		const fechaWFS = new Date(info.FECHA);			   	
		const fechaWFStra = fechaWFS.getTime();	
											
												   
			if(fechaWFStra === transcurso1){
					 const informacion = new Estaciones(latitud, longitud, fecha, pm10, pm25, NO2, NO, co, so2 )	
							 const fech = informacion.fecha;
							 const pm_10 = informacion.pm10;
							 const pm_2_5 = informacion.pm25;
							 const no2 = informacion.NO2;
							 const No = informacion.NO;
							 const Co = informacion.co;
							 const So2 = informacion.so2;
							
					 const gas = $('#filter2').val();							 
							 //escogerGas(gas);
					switch (gas) {
						case 'PM_10':

							var marker = L.circle([latitud, longitud], {radius: (pm_10*10), stroke:true, color: coloresPM10(pm_10) }).bindPopup(`
							<h5>Información</h5>
							<ol>
							<li>Fecha: ${fechaFormulario}</li>
							<li>Medicion de Gas Promedio PM10: ${pm_10.toString()}</li>
								</ol>` ).addTo(mymap);								
								mymap.fitBounds(marker.getBounds(), { padding: [20, 20] });	
								limpiarMapa(marker);
													
						break;
						case 'PM_2_5':

							var marker = L.circle([latitud, longitud], {radius: (pm_2_5*10), stroke:true, color: coloresPM25(pm_2_5) }).bindPopup(`<ol>
							<li>${fechaFormulario}</li>	
							<li>${pm_2_5.toString()}</li>							
								</ol>` ).addTo(mymap);
								mymap.fitBounds(marker.getBounds(), { padding: [20, 20] });	
								limpiarMapa(marker);
																				
						break;
						case 'N02':

							var marker = L.circle([latitud, longitud], {radius: (no2*10), stroke:true, color: coloresNO(no2) }).bindPopup(`<ol>
							<li>${fechaFormulario}</li>
							<li>${no2.toString()}</li>
								</ol>` ).addTo(mymap);
								mymap.fitBounds(marker.getBounds(), { padding: [20, 20] });
								limpiarMapa(marker);
																					
						break;
						case 'NO':

							var marker = L.circle([latitud, longitud], {radius: (No*10), stroke:true, color: coloresNO(No) }).bindPopup(`<ol>
							<li>${fechaFormulario}</li>	
							<li>${No.toString()}</li>
								</ol>` ).addTo(mymap);
								mymap.fitBounds(marker.getBounds(), { padding: [20, 20] });	
								limpiarMapa(marker);
																				
						break;
						case 'CO':

							var marker = L.circle([latitud, longitud], {radius: (Co*10), stroke:true, color: coloresCO(Co) }).bindPopup(`<ol>
							<li>${fechaFormulario}</li>
							<li>${Co.toString()}</li>
								</ol>` ).addTo(mymap);
								mymap.fitBounds(marker.getBounds(), { padding: [20, 20] });	
								limpiarMapa(marker);
																				
						break;
						case 'SO2':

							var marker = L.circle([latitud, longitud], {radius: (So2*10), stroke:true, color: coloresSO2(So2) }).bindPopup(`<ol>
							<li>${fechaFormulario}</li>					
							<li>${So2.toString()}</li>
								</ol>` ).addTo(mymap);
								mymap.fitBounds(marker.getBounds(), { padding: [20, 20] });	
								limpiarMapa(marker);
																				
						break;
					
						default: console.log('no funciona');
							break;
					}
					break;	 
					 
									 
						 }
				 else{
							 console.log('no selecciono nada')
						 }
		 }

}
	

	mymap.on('mousemove', function (e) {
		var str = "Latitude: " + e.latlng.lat.toFixed(5) + "  Longitude: " + e.latlng.lng.toFixed(5) + "  Zoom Level: " + mymap.getZoom();
		$("#map_coords").html(str); // Agrego una funcion que reacciona al movimiento del mouse y muestra las coordenadas actuales en el footer.
	});
// Constructor de Estaciones
	function Estaciones( latitud, longitud, fecha, pm10, pm25, NO2, NO, co, so2){		
		this.latitud = latitud;
		this.longitud = longitud;
		this.fecha = fecha;
		this.pm10 = pm10;
		this.pm25 = pm25;
		this.NO2 = NO2;
		this.NO = NO;
		this.co = co;
		this.so2 = so2;
	}
	
	
	$('#seleccion').click(function esco_Esta(){
		//spinner();
		if ($('#filter2').val().length == 0 || $('#filter1').val().length == 0 || $('#fecha').val().length == 0 ) {
			alert('Hace falta escoger un gas o una Estacion para la visualizacion');
			//	return false;
		}else{
		
		var gas = $('#filter2').val();
		var capa = $('#filter1').val();
		var fecha = $('#fecha').val()
		const fechaFontibon = new Date(fecha).getTime();
		switch (capa) {
			case 'EST_GUAYMARAL':
				guaymaral(capa, gas);
				break;
			case 'EST_FERIAS':
				ferias(capa, gas);
				break;
			case 'EST_MINAMBIENTE':
				minAmbiente(capa, gas);
				break;
			case 'EST_SAN_CRISTOBAL':
				sanCristobal(capa, gas);
				break;
			case 'EST_SUBA':
				suba(capa, gas);
				break;
			case 'EST_TUNAL':
				tunal(capa, gas);
				break;
			case 'EST_USAQUEN':
				usaquen(capa, gas);
				break;
			case 'EST_FONTIBON':
				fontibon(capa, fechaFontibon)
				break
			default:
				break;
		}
		
			
		}		
	
		}); 

	

	function guaymaral(capa, gas){
		if (capa === 'EST_GUAYMARAL' && gas === 'SO2') {
			alert('Esta estación no tiene mediciones sobre los gases SO2 y CO puede consultar los demas');
			
		}else if(capa === 'EST_GUAYMARAL' && gas === 'CO') {
			alert('Esta estación no tiene mediciones sobre los gases SO2 y CO puede consultar los demas');
		} else{
			cargandoDatos();
			agregarUnicaEstacion(capa);
		}
	};
	function ferias(capa, gas){
		if (capa === 'EST_FERIAS' && gas === 'SO2') {
			alert('Esta estación no tiene mediciones sobre los gases SO2 y N02 puede consultar los demas');
			
		}else if(capa === 'EST_FERIAS' && gas === 'N02') {
			alert('Esta estación no tiene mediciones sobre los gases SO2 y N02 puede consultar los demas');
		} else{
			cargandoDatos();
			agregarUnicaEstacion(capa);
		}
	};
	function minAmbiente(capa, gas){
		if (capa === 'EST_MINAMBIENTE' && gas === 'PM_10') {
			cargandoDatos();
			agregarUnicaEstacion(capa);
			
			
		}else if(capa === 'EST_MINAMBIENTE' && gas === 'PM_2_5') {
			cargandoDatos();
			agregarUnicaEstacion(capa);
		} else{
			alert('Esta estación solo tiene datos de las mediciones de los gases PM10 y PM2.5, puedes consultar sobre ellos. ');
		}
	};
	function sanCristobal(capa, gas){
		if (capa === 'EST_SAN_CRISTOBAL' && gas === 'PM_10') {
			cargandoDatos();
			agregarUnicaEstacion(capa);
			
			
		}else if(capa === 'EST_SAN_CRISTOBAL' && gas === 'PM_2_5') {
			cargandoDatos();
			agregarUnicaEstacion(capa);
		} else{
			alert('Esta estación solo tiene datos de las mediciones de los gases PM10 y PM2.5, puedes consultar sobre ellos. ');
		}
	};

	function suba(capa, gas){
		if (capa === 'EST_SUBA' && gas === 'PM_10') {
			cargandoDatos();
			agregarUnicaEstacion(capa);			
			
		}else if(capa === 'EST_SUBA' && gas === 'PM_2_5') {
			cargandoDatos();
			agregarUnicaEstacion(capa);
		} else if(capa === 'EST_SUBA' && gas === 'SO2') {
			cargandoDatos();
			agregarUnicaEstacion(capa);
		} 
		else{
			alert('Esta estación solo tiene datos de las mediciones de los gases PM10,  PM2.5 y SO2, puedes consultar sobre ellos. ');
		}
	};
	function tunal(capa, gas){
		if (capa === 'EST_TUNAL' && gas === 'SO2') {
			alert('Esta estación no tiene datos de las mediciones del gas SO2, puede consultar todos los demas. ');			
		}
		else{
			cargandoDatos();
			agregarUnicaEstacion(capa);			
			
		}
	};
	function usaquen(capa, gas){
		if (capa === 'EST_USAQUEN' && gas === 'PM_10') {
			cargandoDatos();
			agregarUnicaEstacion(capa);
			
			
		}else if(capa === 'EST_USAQUEN' && gas === 'PM_2_5') {
			cargandoDatos();
			agregarUnicaEstacion(capa);
		} else{
			alert('Esta estación solo tiene datos de las mediciones de los gases PM10 y PM2.5, puedes consultar sobre ellos. ');
		}
	};
	function fontibon(capa, fecha){
		if (fecha < 1546318800000) {
			alert('Esta estación solo tiene datos de las mediciones de los gases apartir del 1 de enero del 2019 ');			
		} else {
			cargandoDatos();
			agregarUnicaEstacion(capa);
			
		}
	}

	

		const modulo1 = document.querySelector('#cargando');
		function cargandoDatos(){
		const mensajeCargando = document.createElement('p');
		mensajeCargando.textContent = "Cargando Datos";
		mensajeCargando.classList.add('text-center', 'cargando', 'border', 'border-green-500');
		const cargando = document.querySelectorAll('.cargando');
		modulo1.appendChild(mensajeCargando);
			setTimeout(function() {
				// Declaramos la capa mediante una clase para ocultarlo
				$(".cargando").fadeOut(2000);
				//mensajeCargando.remove();
			},4000);
		

	}

		
		

	function agregarUnicaEstacion(wfs){
		var estacion = new L.WFS({
			//url: 'http://192.168.0.11:8080/geoserver/calidad_aire_postgres/ows',
			url: 'http://localhost:8080/geoserver/calidad_aire_postgres/ows',
			typeNS: wfs,
			typeName: wfs,
			crs: L.CRS.EPSG4326,
			geometryField: 'geom'			
			 
	   }).once('load', function enviarDatos() {
						 
		var geoJsons = estacion.toGeoJSON();		
										  
		var propie = geoJsons.features;		
		
		
		diaClave(propie);
	
		
																
		});	 
	}

//Time slider

/*$('#estac').click(function esco_Esta(){


	var esta = $('#filter').val();
  //agregarEstacion(esta);
  agregarEstacionTimeSlider(esta);
  // var gasTipo = $('#filter3').val();
  // return gasTipo;
  
  });  */

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
  }
} 

function mostrarInfo(gas, quake){
	switch (gas) {
	  case 'PM_10':
		//const fechaVista = new Date (quake.feature.properties.end);
		const fechaVista = new Date (quake.feature.properties.start);

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

function  agregarEstacionTimeSlider(wfs){
	var estacion = new L.WFS({
		//url: 'http://192.168.0.11:8080/geoserver/calidad_aire_postgres/ows',
		url: 'http://localhost:8080/geoserver/calidad_aire_postgres/ows',
		typeNS: wfs,
		typeName: wfs,
		crs: L.CRS.EPSG4326,
		geometryField: 'geom'
		 
   }).once('load', function enviarformulario() {
						 
			 var geoJsons = estacion.toGeoJSON();
			 var timeline = L.timeline(geoJsons,{                     
				pointToLayer: function (feature, latlng) { 
					const gas = $('#filter3').val();
					return L.circleMarker(latlng,pintarDatos(gas,feature))
							}

			}).addTo(mymap);  
			
			const fechaIni = document.querySelector('input[name="trip-start"]').value;
			const fechaFin = document.querySelector('input[name="trip-end"]').value;

			const cincoHoras = 18000000;

	   var timelineControl = L.timelineSliderControl({
				start: new Date(fechaIni).getTime() + cincoHoras,
				end: new Date(fechaFin).getTime() + cincoHoras,
				formatOutput: function (date) {
				  return new Date(date).toString();
				},
				duration: 30000
			  });

		
	   function updateList(timeline) {
			  var displayed = timeline.getLayers();
			   displayed.forEach(function (quake) {
				const gas = $('#filter3').val();
				console.log(gas);
				mostrarInfo(gas,quake);

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

$('#Limpiar2').click(function limpiarBusqueda(){

	const quitarSlider  = document.querySelector('div.leaflet-timeline-control');
	quitarSlider.remove();

	const quitarCirculo  = document.querySelector('path.leaflet-interactive');
	quitarCirculo.remove();
	
	const quitarTabla  = document.querySelector('li');
	quitarTabla.remove();

		  
	  });  

const btnConsultar = document.querySelector('#estac');

eventListeners();
function eventListeners(){
    //cuando la app arranca
    document.addEventListener('DOMContentLoaded', iniciarApp);

    //validando el formulario
    btnConsultar.addEventListener('click', validarTimeSlider);
}

function iniciarApp(){
	console.log("listo para iniciar")
}

const modulo2 = document.querySelector('#cargando2');
		function cargandoDatos2(){
		const mensajeCargando = document.createElement('p');
		mensajeCargando.textContent = "Cargando Datos";
		mensajeCargando.classList.add('text-center', 'cargando', 'border', 'border-green-500');
		const cargando = document.querySelectorAll('.cargando');
		modulo2.appendChild(mensajeCargando);
			setTimeout(function() {
				// Declaramos la capa mediante una clase para ocultarlo
				$(".cargando").fadeOut(2000);
				//mensajeCargando.remove();
			},4000);

	}


function validarTimeSlider(e){

if ($('#filter').val().length == 0 || $('#filter3').val().length == 0 || $('#start').val().length == 0|| $('#end').val().length == 0) {
	alert('Se deben llenar todos los campos del formulario');
	
}else{
	soloUno();
}

}
function soloUno(){
	const timelineSliderControls = document.querySelectorAll('.leaflet-timeline-control');
	if (timelineSliderControls.length == 0) {
		
		var gas = $('#filter3').val();
		var capa = $('#filter').val();
		var fechaIni = $('#start').val()
		const fechaFontibon = new Date(fechaIni).getTime();
		switch (capa) {
			case 'EST_GUAYMARAL':
				guaymaralTS(capa, gas);
				break;
			case 'EST_FERIAS':
				feriasTS(capa, gas);
				break;
			case 'EST_MINAMBIENTE':
				minAmbienteTS(capa, gas);
				break;
			case 'EST_SAN_CRISTOBAL':
				sanCristobalTS(capa, gas);
				break;
			case 'EST_SUBA':
				subaTS(capa, gas);
				break;
			case 'EST_TUNAL':
				tunalTS(capa, gas);
				break;
			case 'EST_USAQUEN':
				usaquenTS(capa, gas);
				break;
			case 'EST_FONTIBON':
				fontibonTS(capa, fechaFontibon)
				break
			default:
				break;
		}	
	}

}

function guaymaralTS(capa, gas){
	if (capa === 'EST_GUAYMARAL' && gas === 'SO2') {
		alert('Esta estación no tiene mediciones sobre los gases SO2 y CO puede consultar los demas');
		
	}else if(capa === 'EST_GUAYMARAL' && gas === 'CO') {
		alert('Esta estación no tiene mediciones sobre los gases SO2 y CO puede consultar los demas');
	} else{
		cargandoDatos2();
		var esta = $('#filter').val();  
    	agregarEstacionTimeSlider(esta); 
	}
};
function feriasTS(capa, gas){
	if (capa === 'EST_FERIAS' && gas === 'SO2') {
		alert('Esta estación no tiene mediciones sobre los gases SO2 y N02 puede consultar los demas');
		
	}else if(capa === 'EST_FERIAS' && gas === 'N02') {
		alert('Esta estación no tiene mediciones sobre los gases SO2 y N02 puede consultar los demas');
	} else{
		cargandoDatos2();
		var esta = $('#filter').val();  
    	agregarEstacionTimeSlider(esta); 
	}
};
function minAmbienteTS(capa, gas){
	if (capa === 'EST_MINAMBIENTE' && gas === 'PM_10') {
		cargandoDatos2();
		var esta = $('#filter').val();  
    	agregarEstacionTimeSlider(esta); 
		
		
	}else if(capa === 'EST_MINAMBIENTE' && gas === 'PM_2_5') {
		cargandoDatos2();
		var esta = $('#filter').val();  
    	agregarEstacionTimeSlider(esta); 
	} else{
		alert('Esta estación solo tiene datos de las mediciones de los gases PM10 y PM2.5, puedes consultar sobre ellos. ');
	}
};
function sanCristobalTS(capa, gas){
	if (capa === 'EST_SAN_CRISTOBAL' && gas === 'PM_10') {
		cargandoDatos2();
		var esta = $('#filter').val();  
    	agregarEstacionTimeSlider(esta); 
		
		
	}else if(capa === 'EST_SAN_CRISTOBAL' && gas === 'PM_2_5') {
		cargandoDatos2();
		var esta = $('#filter').val();  
    	agregarEstacionTimeSlider(esta); 
	} else{
		alert('Esta estación solo tiene datos de las mediciones de los gases PM10 y PM2.5, puedes consultar sobre ellos. ');
	}
};

function subaTS(capa, gas){
	if (capa === 'EST_SUBA' && gas === 'PM_10') {
		cargandoDatos2();
		var esta = $('#filter').val();  
    	agregarEstacionTimeSlider(esta); 		
		
	}else if(capa === 'EST_SUBA' && gas === 'PM_2_5') {
		cargandoDatos2();
		var esta = $('#filter').val();  
    	agregarEstacionTimeSlider(esta);
	} else if(capa === 'EST_SUBA' && gas === 'SO2') {
		cargandoDatos2();
		var esta = $('#filter').val();  
    	agregarEstacionTimeSlider(esta);
	} 
	else{
		alert('Esta estación solo tiene datos de las mediciones de los gases PM10,  PM2.5 y SO2, puedes consultar sobre ellos. ');
	}
};
function tunalTS(capa, gas){
	if (capa === 'EST_TUNAL' && gas === 'SO2') {
		alert('Esta estación no tiene datos de las mediciones del gas SO2, puede consultar todos los demas. ');			
	}
	else{
		cargandoDatos2();
		var esta = $('#filter').val();  
    	agregarEstacionTimeSlider(esta);			
		
	}
};
function usaquenTS(capa, gas){
	if (capa === 'EST_USAQUEN' && gas === 'PM_10') {
		cargandoDatos2();
		var esta = $('#filter').val();  
    	agregarEstacionTimeSlider(esta);
		
		
	}else if(capa === 'EST_USAQUEN' && gas === 'PM_2_5') {
		cargandoDatos2();
		var esta = $('#filter').val();  
    	agregarEstacionTimeSlider(esta);
	} else{
		alert('Esta estación solo tiene datos de las mediciones de los gases PM10 y PM2.5, puedes consultar sobre ellos. ');
	}
};
function fontibonTS(capa, fecha){
	if (fecha < 1546318800000) {
		alert('Esta estación solo tiene datos de las mediciones de los gases apartir del 1 de enero del 2019 ');			
	} else {
		cargandoDatos2();
		var esta = $('#filter').val();  
    	agregarEstacionTimeSlider(esta);
		
	}
}


});