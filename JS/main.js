

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

	function Estaciones(longitud, latitud, nombre, fecha, pm10, pm25, ozono, co, so2){		
		this.longitud = longitud;
		this.latitud = latitud;
		this.nombre = nombre;
		this.fecha = fecha;
		this.pm10 = pm10;
		this.pm25 = pm25;
		this.ozono = ozono;
		this.co = co;
		this.so2 = so2;
	}
	//var marker = L.marker([3.83, -71.38]).addTo(mymap);
	

	var boundaries9 = new L.WFS({
			   					url: 'http://localhost:8080/geoserver/calidad_aire_postgres/ows',
								typeNS: 'estacionUsaquen2015',
								typeName: 'estacionUsaquen2015',
							    crs: L.CRS.EPSG4326,
							    geometryField: 'geom',
							    style: {
							      color: 'red',
							      weight: 1,
							      
							      
									} 
									//style: sty
							  })  
							    .once('load', function enviarformulario() {
							      //mymap.fitBounds(boundaries.getBounds());			      
										var geoJsons = boundaries9.toGeoJSON();
										//console.log(geoJsons);
									  									
										var propie = geoJsons.features;
										//console.log(propie)
										

									//EventeListenner

									const formulario = document.getElementById('parametros-iniciales');

									formulario.addEventListener('submit', function(e){
										e.preventDefault();

										//leerla estacion seleccionada 
										const estacion = document.getElementById('estacion');
										const estacionSeleccionada = estacion.options[estacion.selectedIndex].value;
										console.log(estacionSeleccionada);	

										//leer la fecha inicial seleccionada
										const fechaIni = document.querySelector('input[name="trip-start"]').value;	

										//leer la fecha final seleccionada
										const fechaFin = document.querySelector('input[name="trip-end"]').value;

										// convirtiendo las fechas a milisegundos
										const inicio = new Date(fechaIni);
										const transcurso1 = inicio.getTime()
										const fin = new Date(fechaFin);
										const transcurso2 = fin.getTime()
										
										//console.log(transcurso1);
										//console.log(transcurso2);

										
										const coordenadas =propie[0].properties;										
										const latitud = coordenadas.LATITUD_;
										const longitud = coordenadas.LONGITUD;
										var marker = L.marker([latitud,longitud]).addTo(mymap)										

										for(i=0; i< propie.length; i++){
											var info = propie[i].properties;
											//console.log(info);

											
											const latitud = info.LATITUD_;
											const longitud = info.LONGITUD;
											const nombre = info.COD_ESTAC;
											const pm10 = info.PM10;
											const pm25 = info.PM2_5;
											const ozono = info.OZONO;
											const co = info.CO;
											const so2 = info.SO2;


											//capturar la fecha del WFS y convertirla a milisegundos
											const fechaWFS = new Date(info.FECHA);	
											const fechaWFStra = fechaWFS.getTime();										
											//console.log(fechaWFStra);

																			
									if(fechaWFStra >= transcurso1 & fechaWFStra <= transcurso2){
										const informacion = new Estaciones(latitud, longitud, nombre, fechaWFS, pm10, pm25, ozono, co, so2)
												console.log(informacion);
											}
									else{
												console.log('no selecciono nada')
											}
										}
									});											
							    });	
});