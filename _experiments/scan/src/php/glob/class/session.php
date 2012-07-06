<?php

	class session {
	
		public function login($nickname) {
			setcookie('nickname',$nickname,(time()+96000));
			$this->getSession($nickname);
		}
		
		public function getSession($nickname = false) {
			if($nickname) $cookie = $nickname;	
			else $cookie = $_COOKIE['nickname'];
			$user = sqlRow("player","*","`nickname`='".$cookie."'");
			$this->data = $user;
			return $user;
		}
		
	}