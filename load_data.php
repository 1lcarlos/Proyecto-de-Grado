<?php  
	$db = new PDO('pgsql:host=localhost; port=5432;dbname=prueba;', 'postgres', 'geomatica2018');//conexion a la base de datos
	//$sql = $db->query('SELECT id, geom, "ID_MUEST", "COOR_X", "COOR_Y", observacion, ST_AsGeoJSON(geom, 3) as geom FROM public.flora2 ORDER BY "ID_MUEST";');//Consulta para traer la geometria a formato GeoJSON

	/*$sql = $db->query('SELECT id, geom, "ID_MUEST", "COOR_X", "COOR_Y", ST_AsGeoJSON(geom, 3) as geom FROM public.florageo ORDER BY "ID_MUEST";');//Consulta para traer la geometria a formato GeoJSON
	
	
		$features=[];
          while($row = $sql->fetch(PDO::FETCH_ASSOC)){
            $feature=['type'=>'Feature'];
            $feature['geometry']=json_decode($row['geom']);
            unset($row['geom']);
            $feature['properties']=$row;
            array_push($features, $feature);

          }
          $featureCollection=['type'=>'FeatureCollection', 'features'=>$features];
          echo json_encode($featureCollection);//Capa inicial con la que se hizo la prueba*/


	$sql = $db->query('SELECT id, geom, nombre, ST_AsGeoJSON(geom, 3) as geom FROM public.arbolesgeo ORDER BY id;');
	
	$features=[];
          while($row = $sql->fetch(PDO::FETCH_ASSOC)){
            $feature=['type'=>'Feature'];
            $feature['geometry']=json_decode($row['geom']);
            unset($row['geom']);
            $feature['properties']=$row;
            array_push($features, $feature);

          }
          $featureCollection=['type'=>'FeatureCollection', 'features'=>$features];
          echo json_encode($featureCollection);//con el codigo anterior estoy cargando mi capa de puntos

	/*$sql = $db->query('SELECT id, geom, "Nombre",  ST_AsGeoJSON(geom, 3) as geom FROM public.canalgeo ORDER BY id;');
    	$featuresln=[];
          while($row = $sql->fetch(PDO::FETCH_ASSOC)){
            $featureln=['type'=>'Feature'];
            $featureln['geometry']=json_decode($row['geom']);
            unset($row['geom']);
            $featureln['properties']=$row;
            array_push($featuresln, $featureln);

          }
          $featureCollectionln=['type'=>'FeatureCollection', 'featuresln'=>$featuresln];
          echo json_encode($featureCollectionln); //si dejo exactamente los mismos nombres de las variables igual carga mis datos.*/


	/*$sql = $db->query('SELECT id, geom, "Nombre",  ST_AsGeoJSON(geom, 3) as geom FROM public.canalgeo ORDER BY id;');
        $features=[];
          while($row = $sql->fetch(PDO::FETCH_ASSOC)){
            $feature=['type'=>'Feature'];
            $feature['geometry']=json_decode($row['geom']);
            unset($row['geom']);
            $feature['properties']=$row;
            array_push($features, $feature);

          }
          $featureCollection=['type'=>'FeatureCollection', 'features'=>$features];
          echo json_encode($featureCollection);//con el codigo anterior se carga la capa de lineas*/

    /*$sql = $db->query('SELECT id, geom, "Nombre",  ST_AsGeoJSON(geom, 3) as geom FROM public.alternativageo ORDER BY id;');
        $features=[];
          while($row = $sql->fetch(PDO::FETCH_ASSOC)){
            $feature=['type'=>'Feature'];
            $feature['geometry']=json_decode($row['geom']);
            unset($row['geom']);
            $feature['properties']=$row;
            array_push($features, $feature);

          }
          $featureCollection=['type'=>'FeatureCollection', 'features'=>$features];
          echo json_encode($featureCollection);//con el codigo anterior se carga la capa de poligonos*/


	/*$features=[];
	while ($row = $sql->fetch(PDO::FETCH_ASSOC)){
		$feature=['type'=>'Feature'];
		$feature=["geometry"]=json_decode($row["geom"]); //convierte geom a una veriable PHP
		unset($row["geom"]);//destruye la variable $row
		$feature['properties']=$row;
		array_push($features, $feature);
	}
	$featureCollection=['type'=>'FeatureCollection', 'features'=>$features];
	echo json_encode($featureCollection);*/

?>