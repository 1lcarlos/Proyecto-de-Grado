

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
	
	


	$('#seleccion').click(function esco_Esta(){


	  var esta = $('#filter1').val();
    agregarEstacion(esta);
    //agregarEstacion("TESTEO_MILI");
    // var gasTipo = $('#filter3').val();
    // return gasTipo;
	
	});  
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
	
	function diaClave(propie){
		for(i=0; i< propie.length; i++){
			var info = propie[i].properties;	
			const fechaFormulario = document.querySelector('input[name="trip"]').value;	
			const unicaFecha = new Date(fechaFormulario);
			const transcurso1 = unicaFecha.getTime()
			//capturar la fecha del WFS y convertirla a milisegundos
			const fechaWFS = new Date(info.FECHA);			   	
			const fechaWFStra = fechaWFS.getTime();	
			if(fechaWFStra === transcurso1){
				const latitud = info.LATITUD;	  
				const longitud = info.LONGITUD;		   
				const fecha = info.FECHA;
				const pm10 = info.PM_10;
				const pm25 = info.PM_2_5;
				const NO2 = info.NO2;
				const NO = info.NO;
				const co = info.CO;
				const so2 = info.SO2;

				const gas = $('#filter2').val();							 
				switch (gas) {
							case 'PM_10':
								var marker = L.circle([latitud, longitud], {radius: (pm10*10), stroke:true, color: coloresPM10(pm10) }).bindPopup(`
								<h5>Información</h5>
								<ol>
								<li>Fecha: ${fechaFormulario}</li>
								<li>Medicion de Gas Promedio PM10: ${pm10.toString()}</li>
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
    
  
   	
function agregarEstacion(wfs){
		var estacion = new L.WFS({
			url: 'http://localhost:8080/geoserver/calidad_aire_postgres/ows',
		 typeNS: 'calidad_aire_postgres',
		 typeName: wfs,
		 crs: L.CRS.EPSG4326,
		 geometryField: 'geom'
		
			 
	 })	 
      .once('load', function enviarformulario() {              


	  
	var geoJsons = estacion.toGeoJSON();
	var propie = geoJsons.features;	
	diaClave(propie);	   
   
  
     
		 });//fin duncion enviar formulario

    }//fin funcion agregar estacion 2 
	
});