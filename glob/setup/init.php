<?php

	# Grab statics
	$_static = new staticData();
	$_tables = $_static->tables;

	# Connect to server
	$_con = new connection();