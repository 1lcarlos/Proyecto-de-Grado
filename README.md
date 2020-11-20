# Visor Web
Visor Web 
En este proyecto se encuentra la propuesta inicial para un visor web geografico en al cual se utilizaran diferentes
tecnologias de codigo libre leaflet.js, geoserver, postgres(postgis) y turf.js.

Leaflet como libreria para la creacion de mapas interactivos en la web para dispositivos de escritorio o moviles.

Geoserver como servidor de datos espaciales el cual nos ayuda a la publicaion y administracion de estos mismos, con caracteristicas 
como el Servicio de características web (WFS), el Servicio de mapas web (WMS) y el Servicio de cobertura web (WCS).
Hay disponibles formatos y opciones de publicación adicionales, incluido el Servicio de mosaico de mapas web (WMTS) y extensiones para el Servicio de catálogo (CSW) y el Servicio de procesamiento web (WPS).

Postgres-Extension Postgis es uns extension de base de datos espacial para la base de datos relacional de objetos PostgreSQL. Agrega soporte para objetos geográficos permitiendo que las consultas de ubicación se ejecuten en SQL.

Turf es una libreria de javascript que esta compuesta por una colección de pequeños módulos que me permite realizar tareas de geoprocesamientoen los navedadores web.

En este momento el visor puede realizar dos tareas de geoprocesamiento las cuales son realizar Buffer e intersecciones entre capas tipo poligono. 
