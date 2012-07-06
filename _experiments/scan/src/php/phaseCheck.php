<?php
	
	// Connection
	include 'glob/setup.php';
	// * * *
	
	$phaseInt  = $_GET['phase'];
	$phaseTurn = $_GET['turn'];
	$phase = sqlRow("phase","*","`phase`='".$phaseInt."' AND `reached`='".$phaseTurn."'");
	if(!$phase) {
		sqlUpdate("phase","`reached`='".$phaseTurn."'","`phase`='".$phaseInt."'");
		if($phaseInt == 1 && $phaseTurn == 1)
			echo "{stop_phase_1}";
	}