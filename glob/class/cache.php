<?php

	class cache {
		
		// Preferences
		private $_forceSql = true; // Should we force the cache to be loaded by SQL? (Slower)
		// Cache Variables
		private $_allCache = array();
		private $_cache    = array();
		
		/* Initialization */
		public function __construct() {
			$this->_allCache = $this->getAllCache();
		}
		
		private function getAllCache() {
			$_cache = $this->getCacheData();
			if($_cache) { foreach($_cache as $pre=>$arr) {
				foreach($arr as $name=>$value) {
					$cache[$pre][$name] = $this->processValue($value);	
				}
			} }
			return $cache;
		}
		
		private function getCacheData($force = false) {
			if($this->_forceSql || $force) { 
				# Manually load cache through SQL (Slower)
				$arr 	= array();
				$caches = sqlRes("cache");
				while($cache = fetchList($caches)) {
					$arr[$cache['pre']][$cache['name']] = $cache['value'];
				}
				return $arr;
			} else {
				# Load cache through data file
				global $preIP;
				include $preIP."data/php/_raw/cache.php";
				return $arr;
			}
		}
		
		public function writeRawFile($array = NULL) {
			global $preIP;
			if(!$array)
				$array = $this->getCacheData(true);
			$body  = '<?php'."\n";
				
				$body .= "\t".'/**'."\n";
				$body .= "\t".'* Automatically generated on'."\n";
				$body .= "\t".'* '.date("m/d/Y @ g:i A")."\n";
				$body .= "\t".'***/'."\n";
				
				$body .= "\t".'$arr = array('."\n";
					foreach($array as $pre=>$values) {
						$body .= "\t\t".$pre.' => array('."\n";
							foreach($values as $name=>$value) {
								$body .= "\t\t\t".'"'.$name.'" => "'.$value.'",'."\n";	
							}
						$body .= "\t\t".'),'."\n";	
					}
				$body .= "\t".');'."\n";
				
			$body .= '?>';
			
			writeFile($preIP.'data/php/_raw/cache.php',$body);
			
		}
		/* * */
		
		public function processValue($value) {
			global $_static;
			$doCheck = explode($_static->engine['special_text']['cache']['do_prefix'],$value);
			if($doCheck[1]) {
				/* Has a DO operation */
					$doCheck = explode($_static->engine['special_text']['cache']['do_suffix'],$doCheck[1]);
					$value  = $doCheck[0];
					
					$value = explode("[",$value);
					$type  = $value[0];
					$value = explode("]",$value[1]);
					$value = $value[0];
					switch($type) {
						/** Random **/
						case 'rnd':
							$value = explode($_static->engine['special_text']['cache']['do_del'],$value);
							$rand  = rand(0,(count($value)-1));
							$value = $value[$rand];
						break;
						/* * */
					}
				/* * */	
			}
			return $value;
		}
		
		public function setArray($pre) {
			if($this->_allCache[$pre]) $this->_cache = array_merge($this->_cache,$this->_allCache[$pre]);
		}
		
		public function getArray() {
			return $this->_cache;	
		}
			
	}