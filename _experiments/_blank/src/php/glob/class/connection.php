<?php

	class connection {
		
		public $defaultError = 'There was an error connecting to the game';
	
		public $experimentName = '';
	
		private $server = array(
			'local' => array(
				'host' => 'localhost',
				'db' => 'mmo',
				'user' => 'root',
				'pass' => ''
			),
			'live' => array(
				'host' => 'localhost',
				'db' => 'mmo',
				'user' => 'root',
				'pass' => ''
			)
		);
	
		public function __construct() {
			$this->connect();
		}
		
		private function connect() {
		
			$ip = $_SERVER['REMOTE_ADDR'];
			if($ip == '127.0.0.1')
				$data = $this->server['local'];
			else
				$data = $this->server['live'];
				
			$connection = mysql_connect($data['host'],$data['user'],$data['pass']) or die($this->error(mysql_error()));
			$database = mysql_select_db($data['db'],$connection) or die($this->error(mysql_error()));
			
		}
		
		public function error($text = NULL) {
			
			if(!$text) $text = $this->defaultError.'<br /><i>'.mysql_error().'</i>';
			
			echo "<b>Game error:</b><br />";
			echo $text;
			die();
			
		}
		
/*#########################################################*/
/*#### SQL FUNCTIONS --------------------------------- ####*/
/*#########################################################*/
	
		public function tableName($name) {
			return $this->experimentName."_".$name;
		}
	
/*###^ ----------------------------------------------- ^###*/
/*########################################;#################*/	
	
	}
