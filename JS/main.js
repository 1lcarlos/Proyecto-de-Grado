

$(document).ready(function () {

	var mymap = L.map('mapdiv', {
			zoomControl: true,			
		})
		.setView([4.69, -74.11], 11); // con el contructor map se crea el mapa y se centra la vista y el zoom
	

	var grayscale = L.tileLayer('http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png').addTo(mymap),
		osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'),
		topomap = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png'),
		image = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}');
	

	//L.control.sideBySide(grayscale, image).addTo(mymap);//Este es el controlador del swipe


	var basemaps = {
		"topographic": topomap,
		"grayscale": grayscale,
		"osm": osm,
		"Imagen Satelital": image
	};


	
	var escala = new L.control.scale({imperial:false}).addTo(mymap);

	L.control.layers(basemaps).addTo(mymap) //finaliza el control de agregar y quitar capas

//FUNCIONES
// ESCOGE EL DIA CLAVE COMPARA LA FECHA CON LA QUE ESCOGE EL USUARIO

function coloresPM10(valorGas){
	if (valorGas >0 && valorGas < 54) {
		const color = "#CCE5FF"
		return(color);		
	} else 
		if(valorGas => 54 && valorGas < 154){
		const color = "#00E400"
		return(color);
	} else 
		if(valorGas => 154 && valorGas < 254){
		const color = "#FFFF00"
		return(color);
	}else
		if(valorGas => 254 && valorGas < 354){
		const color = "#FF7E00"
		return(color);
	}else
		if(valorGas => 354 && valorGas < 424){
		const color = "#FF0000"
		return(color);	
	}else 
		{
		const color = "#8F3F97"
		return(color);
	}
}

function colores(valorGas){
	if (valorGas >0 && valorGas < 54) {
		const color = "#CCE5FF"
		return(color);		
	} else 
		if(valorGas => 54 && valorGas < 154){
		const color = "#00E400"
		return(color);
	} else 
		if(valorGas => 154 && valorGas < 254){
		const color = "#FFFF00"
		return(color);
	}else
		if(valorGas => 254 && valorGas < 354){
		const color = "#FF7E00"
		return(color);
	}else
		if(valorGas => 354 && valorGas < 424){
		const color = "#FF0000"
		return(color);	
	}else 
		{
		const color = "#8F3F97"
		return(color);
	}


}



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
							 const pm_2_5 = parseFloat(informacion.pm25);
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

							var marker = L.circle([latitud, longitud], {radius: (pm_2_5*10), stroke:true, color: colores(pm_2_5) }).bindPopup(`<ol>
							<li>${fechaFormulario}</li>	
							<li>${pm_2_5.toString()}</li>							
								</ol>` ).addTo(mymap);
								mymap.fitBounds(marker.getBounds(), { padding: [20, 20] });	
															
						break;
						case 'N02':

							var marker = L.circle([latitud, longitud], {radius: (no2*10), stroke:false, color: colores(pm10) }).bindPopup(`<ol>
							<li>${fechaFormulario}</li>
							<li>${no2.toString()}</li>
								</ol>` ).addTo(mymap);
								mymap.fitBounds(marker.getBounds(), { padding: [20, 20] });								
						break;
						case 'NO':

							var marker = L.circle([latitud, longitud], {radius: (No*10), stroke:false, color: colores(pm10) }).bindPopup(`<ol>
							<li>${fechaFormulario}</li>	
							<li>${No.toString()}</li>
								</ol>` ).addTo(mymap);
								mymap.fitBounds(marker.getBounds(), { padding: [20, 20] });								
						break;
						case 'CO':

							var marker = L.circle([latitud, longitud], {radius: (Co*10), stroke:false, color: colores(pm10) }).bindPopup(`<ol>
							<li>${fechaFormulario}</li>
							<li>${Co.toString()}</li>
								</ol>` ).addTo(mymap);
								mymap.fitBounds(marker.getBounds(), { padding: [20, 20] });								
						break;
						case 'SO2':

							var marker = L.circle([latitud, longitud], {radius: (So2*10), stroke:false, color: colores(pm10) }).bindPopup(`<ol>
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



	/*var drawnItems = L.featureGroup().addTo(mymap); //inicia el objeto para dibujar geometrias sobre el mapa

	var ctrlDraw = new L.Control.Draw({

	});

	mymap.addControl(ctrlDraw);*/
	/*	mymap.on('draw:dreated', function(e){
			console.log(e);
			drawnItems.addlayer(e.layer);
		});*/

	/*mymap.on(L.Draw.Event.CREATED, function (event) {
		var layer = event.layer;

		drawnItems.addLayer(layer);
		console.log(layer);

	});*/

	//console.log(drawnItems);

	//ctrlDraw.addTo(mymap);

	/*	var sidebar = L.control.sidebar('sidebar', {
				  closeButton: true,
				  position: 'rigth'
				});
				mymap.addControl(sidebar);*/
	


	mymap.on('mousemove', function (e) {
		var str = "Latitude: " + e.latlng.lat.toFixed(5) + "  Longitude: " + e.latlng.lng.toFixed(5) + "  Zoom Level: " + mymap.getZoom();
		$("#map_coords").html(str); // Agrego una funcion que reacciona al movimiento del mouse y muestra las coordenadas actuales en el footer.
	});

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
			 
	   }).once('load', function enviarformulario() {
							 
		var geoJsons = boundaries9.toGeoJSON();		
										  
		var propie = geoJsons.features;		
		
		
		diaClave(propie);
	
		  
																
		});	 
}


	$('#estac').click(function esco_Esta(){

		/*var distancia = document.getElementById("dist").value;				            
		console.log(distancia);	*/
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
				 
												   
				 var propie = geoJsons.features;
				 //console.log(propie)

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
				const informacion = new Estaciones(latitud, longitud)
				/*const informacion = new Estaciones(latitud, longitud, nombre, fechaWFS, pm10, pm25, ozono, co, so2)*/
						console.log(informacion);
					}
			else{
						console.log('no selecciono nada')
					}
				}

				 



			 //EventeListenner

			 //const formulario = document.getElementById('parametros-iniciales');

			//  formulario.addEventListener('submit', function(e){
			// 	 e.preventDefault();

			// 	 //leerla estacion seleccionada 

				 
			// 	 /*const estacion = document.getElementById('estacion');
			// 	 const estacionSeleccionada = estacion.options[estacion.selectedIndex].value;
			// 	 console.log(estacionSeleccionada);	*/

			// 	 //leer la fecha inicial seleccionada
			// 	 //const fechaIni = document.querySelector('input[name="trip-start"]').value;	

			// 	 //leer la fecha final seleccionada
			// 	 //const fechaFin = document.querySelector('input[name="trip-end"]').value;

			// 	 // convirtiendo las fechas a milisegundos
			// 	// const inicio = new Date(fechaIni);
			// 	 //const transcurso1 = inicio.getTime()
			// 	// const fin = new Date(fechaFin);
			// 	// const transcurso2 = fin.getTime()
				 
			// 	 //console.log(transcurso1);
			// 	 //console.log(transcurso2);

				 
			// 	 const coordenadas =propie[0].properties;										
			// 	 const latitud = coordenadas.LATITUD;
			// 	 const longitud = coordenadas.LONGITUD;
			// 	 var marker = L.marker([latitud,longitud]).addTo(mymap)										

			// 	 for(i=0; i< propie.length; i++){
			// 		 var info = propie[i].properties;
			// 		 //console.log(info);

					 
			// 		 const latitud = info.LATITUD;
			// 		 const longitud = info.LONGITUD;
			// 		 /*const nombre = info.COD_ESTAC;
			// 		 const pm10 = info.PM10;
			// 		 const pm25 = info.PM2_5;
			// 		 const ozono = info.OZONO;
			// 		 const co = info.CO;
			// 		 const so2 = info.SO2;*/


			// 		 //capturar la fecha del WFS y convertirla a milisegundos
			// 		 const fechaWFS = new Date(info.FECHA);	
			// 		 const fechaWFStra = fechaWFS.getTime();										
			// 		 //console.log(fechaWFStra);

													 
			//  if(fechaWFStra >= transcurso1 & fechaWFStra <= transcurso2){
			// 	 const informacion = new Estaciones(latitud, longitud)
			// 	 /*const informacion = new Estaciones(latitud, longitud, nombre, fechaWFS, pm10, pm25, ozono, co, so2)*/
			// 			 console.log(informacion);
			// 		 }
			//  else{
			// 			 console.log('no selecciono nada')
			// 		 }
			// 	 }
			//  });											
		 });	

	}

	
});