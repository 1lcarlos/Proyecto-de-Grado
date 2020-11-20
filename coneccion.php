<?php 

	$dsn = "pgsql:host=localhost; dbname=prueba;port=5432";
	$opt = [
				PDO::ATTR_ERRMODE				=>  PDO::ERRMODE_EXCEPTION,
				PDO::ATTR_DEFAULT_FETCH_MODE	=>  PDO::FETCH_ASSOC,
				PDO::ATTR_EMULATE_PREPARES		=> false
			];
	$pdo = new PDO($dsn, 'postgres', 'geomatica2018', $opt);

	$resul = $pdo->query('SELECT id, "EXPEDIENTE","NOM_U_TERR","OBSERV", "AREA_ha" FROM "UnidadTerritorial1"');
	foreach ($resul as $row) {
		unset($row['geom']);
		echo json_encode($row)."<br><br>";
	}
	//echo $resul->rowCount();




?>