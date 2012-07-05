<?php

	class page {
	
		public
		$_name,
		$_id,
		$_data,
		$_child,
		$_stateChange = false,
		$defPage = 'index',
		$preIP,
		$srcPath = 'src/',
		$baseUrl = '_tests/rps/';
		
/*#########################################################*/
/*#### DISPLAY FUNCTIONS ----------------------------- ####*/
/*#########################################################*/
		public function initFiles() {
			# Load initialization files for this page
			global $_display,$_ses,$preIP;
			include $preIP."src/php/page/".$this->_id."/_init.php";
			# Load match
			$this->_match = new match();
		}

		public function head() {
			# Load styles
			$this->printFiles('css');
			# Load javascripts
			$this->printFiles('js');
			# Title
			$this->title();
		}
		
		private function title() {
			//echo '<title>'.$this->_name.' | Null</title>';	
		}
		
		public function body_head() {	
			global $_display;
		}
		
		public function body() {
			global $_display,$_cache,$_cacheObj,$_ses,$preIP,$_match;
			$_match = $this->_match;
			/** Body Content */
			include $preIP."src/php/page/".$this->_id."/_build.php";
			/* * */
			/** Footer Content */
			$this->footer();
			/* * */
		}
		
		public function footer() { }
		
		public function printFiles($type) {
			$path = $this->srcPath.$type."/";
			$files = getDirFiles($path);
			switch($type) {
				case 'css': $text = "<link rel='stylesheet' href='*'/>"; break;
				case 'js': $text = "<script type='text/javascript' src='*'></script>"; break;
			}
			foreach($files as $file) {
				$_text = str_replace('*',$file,$text);
				echo $_text;
			}
		}
/*###^ ----------------------------------------------- ^###*/
/*##########################################################*/	
	
/*#########################################################*/
/*#### INITIALIZE FUNCTIONS -------------------------- ####*/
/*#########################################################*/
		public function __construct() {
			try{
				$this->setupVars();
				$this->verifyUrl();
				$this->checkVars();
				$this->initFiles();
			} catch(Exception $e) {
				echo "<div style='padding: 5px; border: 1px solid black;'>";
					echo "Caught Error: ".$e->getMessage()."<br>";
				echo "</div>";
			}
		}
		
		public function redirect($url) {
			Header("Location: ".$url);
			exit();	
		}
		
		private function verifyUrl() {
			if(!$this->_stateChange) {
				$url = getPageUrl(true);
				$url = explode($this->baseUrl,$url);
				$cur = $url[1];
				if($cur) {
					if($cur[0] != "#") {
						if($this->_data) {
							$newUrl = $url[0].$this->baseUrl."#/".$cur;
							//echo "Redirect to: <u>".$newUrl."</u><br>";
							$this->redirect($newUrl);
						}
					}
				}
			}
		}
		
		private function checkVars() {
			global $_static;
			# Force name on id
			$this->_id   = $this->cleanDataVar($this->_id);
			$this->_name = $this->pageName($this->_id);
			
			# Is data required?
			//if(in_array($this->_id,$_static->page['dataRequirements']) && !$this->_data)
			//	throw new Exception("Data is required for this type of page (".$this->_id.")",1);
		}
		
		private function setupVars() {
			global $preIP;
			$this->preIP = $preIP;
			$page = $_GET['page'];
			if(!$page) $page = $this->defPage;
			$this->_id	  = $page;
			$this->_refId = $page;
			$this->getData();
			if($_POST['_stateChange']) $this->_stateChange = true;
		}
		
		public function pageName($id) {
			global $_static;
			return $_static->page['names'][$id];
		}
		
		public function getData() {
			global $_static;
			$data = explode("/",$_GET['data']);
			if(!$data[0]) {
				$page = $this->_id;
				$pageCheck = $page[(strlen($page)-1)];
				if($pageCheck == '/') {
					$newPage = substr($page,0,(strlen($page)-1));
					$this->_id = $newPage;
					$this->_refId = $newPage;
				}
			}
			# Get child
			$child = $data[0];
			$childDel = $_static->engine['url']['child_delimiter'];
			$child = explode($childDel,$child);
			if($child[1]) {
				$data[0] = $child[0];
				$child   = $child[1];
				$this->_child = $child;
				$this->_refId .= $childDel.$child;
			}
			$this->_data = $this->processData($data);
		}
		
		public function processData($data) {
			global $_static; $_data = array();
			if($data[0]) {
				$_data[0] = $this->cleanDatavar($data[0]);
			}
			foreach($data as $num=>$value) {
				$name = $_static->page['dataNames'][$this->_refId][$num];
				if($name && ($value || $value == 0)) $_data[$name] = $value;
			}
			return $_data;
		}
		
		public function cleanDataVar($var) {
			$var = str_replace(array("/"),array(""),$var);
			//$var = str_replace(array("-"),array(" "),$var);
			return $var;	
		}
/*###^ ----------------------------------------------- ^###*/
/*##########################################################*/	
		
	}