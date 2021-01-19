

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

function spinner(){
	const divSpinner = document.createElement('div');
	divSpinner.classList.add('sk-chase');
	divSpinner.innerHTML = `
		<div class="sk-chase-dot"></div>
		<div class="sk-chase-dot"></div>
		<div class="sk-chase-dot"></div>
		<div class="sk-chase-dot"></div>
		<div class="sk-chase-dot"></div>
		<div class="sk-chase-dot"></div>	
	`;
	contenedorMapa.appendChild(divSpinner);
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
		//console.log(fechaWFS);
		//const fechaTrans = fechaWFS.toString().replace(/-/g, '\/');	   	
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

							 //const fechaFormat = new Date('fech');
							 //moment.locale('es');
							 //moment().format('LLLL', fechaFormat);

					 const gas = $('#filter2').val();
							 console.log(gas);
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
						break;
						case 'PM_2_5':

							var marker = L.circle([latitud, longitud], {radius: (pm_2_5*10), stroke:true, color: coloresPM25(pm_2_5) }).bindPopup(`<ol>
							<li>${fechaFormulario}</li>	
							<li>${pm_2_5.toString()}</li>							
								</ol>` ).addTo(mymap);
								mymap.fitBounds(marker.getBounds(), { padding: [20, 20] });	
								console.log(pm_2_5);							
						break;
						case 'N02':

							var marker = L.circle([latitud, longitud], {radius: (no2*10), stroke:true, color: coloresNO(no2) }).bindPopup(`<ol>
							<li>${fechaFormulario}</li>
							<li>${no2.toString()}</li>
								</ol>` ).addTo(mymap);
								mymap.fitBounds(marker.getBounds(), { padding: [20, 20] });								
						break;
						case 'NO':

							var marker = L.circle([latitud, longitud], {radius: (No*10), stroke:true, color: coloresNO(No) }).bindPopup(`<ol>
							<li>${fechaFormulario}</li>	
							<li>${No.toString()}</li>
								</ol>` ).addTo(mymap);
								mymap.fitBounds(marker.getBounds(), { padding: [20, 20] });								
						break;
						case 'CO':

							var marker = L.circle([latitud, longitud], {radius: (Co*10), stroke:true, color: coloresCO(Co) }).bindPopup(`<ol>
							<li>${fechaFormulario}</li>
							<li>${Co.toString()}</li>
								</ol>` ).addTo(mymap);
								mymap.fitBounds(marker.getBounds(), { padding: [20, 20] });								
						break;
						case 'SO2':

							var marker = L.circle([latitud, longitud], {radius: (So2*10), stroke:true, color: coloresSO2(So2) }).bindPopup(`<ol>
							<li>${fechaFormulario}</li>					
							<li>${So2.toString()}</li>
								</ol>` ).addTo(mymap);
								mymap.fitBounds(marker.getBounds(), { padding: [20, 20] });								
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
		//this.nombre = nombre;
		this.fecha = fecha;
		this.pm10 = pm10;
		this.pm25 = pm25;
		this.NO2 = NO2;
		this.NO = NO;
		this.co = co;
		this.so2 = so2;
	}
	
	
	$('#seleccion').click(function esco_Esta(){
		spinner();

		var gas = $('#filter2').val();
		var capa = $('#filter1').val();
		agregarUnicaEstacion(capa);				
	
		}); 
		

	function agregarUnicaEstacion(wfs){
		var boundaries9 = new L.WFS({
			url: 'http://localhost:8080/geoserver/calidad_aire_postgres/ows',
			typeNS: wfs,
			typeName: wfs,
			crs: L.CRS.EPSG4326,
			geometryField: 'geom'			
			 
	   }).once('load', function enviarDatos() {
						 
		var geoJsons = boundaries9.toGeoJSON();		
										  
		var propie = geoJsons.features;		
		
		
		diaClave(propie);
	
		  
																
		});	 
}


	$('#estac').click(function esco_Esta(){

		var capa = $('#filter').val();
		agregarEstacion(capa);			
	
		}); 

	
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
				 console.log(geoJsons);
				 												   
				 var propie = geoJsons.features;
				 
				 console.log(propie);
				 console.log(propie[0].properties.FECHA);
				 


				//  var getInterval = function (quake) {
				// 	// earthquake data only has a time, so we'll use that as a "start"
				// 	// and the "end" will be that + some value based on magnitude
				// 	// 18000000 = 30 minutes, so a quake of magnitude 5 would show on the
				// 	// map for 150 minutes or 2.5 hours
				// 	return {
				// 	  start: quake,
				// 	  end: quake * 180000,
				// 	};
				//   };
				//   getInterval(fechaWFStra);																	


				//   console.log(getInterval(fechaWFStra));

				//   var timelineControl = L.timelineSliderControl({
				// 	formatOutput: function (date) {
				// 	  return new Date(date).toString();
				// 	},
				//   });

				//   var timeline = L.timeline(propie, {
				// 	getInterval: getInterval(),
				// 	pointToLayer: function (propie, latlng) {
				// 	  var hue_min = 120;
				// 	  var hue_max = 0;
				// 	  var hue =
				// 		(propie.properties.PM_10 ) * (hue_max - hue_min) + hue_min;
				// 	  return L.circleMarker(latlng, {
				// 		radius: data.properties.PM_10 * 3,
				// 		color: "hsl(" + hue + ", 100%, 50%)",
				// 		fillColor: "hsl(" + hue + ", 100%, 50%)",
				// 	  }).bindPopup(
				// 		'<a href="">click for more info</a>'
				// 	  );
				// 	},
				//   });

				//   timelineControl.addTo(map);
				//   timelineControl.addTimelines(timeline);
				//   timeline.addTo(map);







				/* getInterval = {
					start: propie.properties.FECHA.getTime(),
					end:  'fecha en milisegundos'
				}*/

				 const fechaIni = document.querySelector('input[name="trip-start"]').value;
				 const fechaFin = document.querySelector('input[name="trip-end"]').value;
				 const inicio = new Date(fechaIni);
				 const transcurso1 = inicio.getTime()
				 const fin = new Date(fechaFin);
				 const transcurso2 = fin.getTime()

				 const coordenadas =propie[0].properties;										
				 const latitud = coordenadas.LATITUD;
				 const longitud = coordenadas.LONGITUD;
				 var marker = L.marker([latitud,longitud]).addTo(mymap)	

				 for(i=0; i< propie.length; i++){
					var info = propie[i].properties;
					//console.log(info);

					
					const latitud = info.LATITUD;
					const longitud = info.LONGITUD;
					const fech = info.FECHA;
					//const nombre = info.COD_ESTAC;
					const pm10 = info.PM_10;
					const pm25 = info.PM_2_5;
					const NO2 = info.NO2;
					const NO = info.NO;
					const co = info.CO;
					const so2 = info.SO2;


					//capturar la fecha del WFS y convertirla a milisegundos
					const fechaWFS = new Date(info.FECHA);	
					const fechaWFStra = fechaWFS.getTime();										
					//console.log(fechaWFStra);

					







													
			if(fechaWFStra >= transcurso1 & fechaWFStra <= transcurso2){
				const informacion = new Estaciones(latitud, longitud,fech)
				/*const informacion = new Estaciones(latitud, longitud, nombre, fechaWFS, pm10, pm25, ozono, co, so2)*/
						console.log(informacion);
					}
			else{
						console.log('no selecciono nada')
					}
				}	
				
				




		 });//fin duncion enviar formulario

	}//fin funcion agregar estacion 2 

//Time slider


getInterval = {
	start: 'fecha en milisegundos',
	end:  'fecha en milisegundos'
}

var timelineControl = L.timelineSliderControl({
	formatOutput: function (date) {
	  return new Date(date).toString();
	},
  });

// function eqfeed_callback(data) {
// 	var getInterval = function (quake) {
// 	  // earthquake data only has a time, so we'll use that as a "start"
// 	  // and the "end" will be that + some value based on magnitude
// 	  // 18000000 = 30 minutes, so a quake of magnitude 5 would show on the
// 	  // map for 150 minutes or 2.5 hours
// 	  return {
// 		start: quake.properties.time,
// 		end: quake.properties.time + quake.properties.mag * 1800000,
// 	  };
// 	};
// 	var timelineControl = L.timelineSliderControl({
// 	  formatOutput: function (date) {
// 		return new Date(date).toString();
// 	  },
// 	});
	
// 	var timeline = L.timeline(data, {
// 	  getInterval: getInterval,
// 	  pointToLayer: function (data, latlng) {
// 		var hue_min = 120;
// 		var hue_max = 0;
// 		var hue =
// 		  (data.properties.mag / 10) * (hue_max - hue_min) + hue_min;
// 		return L.circleMarker(latlng, {
// 		  radius: data.properties.mag * 3,
// 		  color: "hsl(" + hue + ", 100%, 50%)",
// 		  fillColor: "hsl(" + hue + ", 100%, 50%)",
// 		}).bindPopup(
// 		  '<a href="' + data.properties.url + '">click for more info</a>'
// 		);
// 	  },
// 	});
// 	timelineControl.addTo(map);
// 	timelineControl.addTimelines(timeline);
// 	timeline.addTo(map);
// 	/*timeline.on("change", function (e) {
// 	  updateList(e.target);
// 	});
// 	updateList(timeline);*/
//   }

	
});