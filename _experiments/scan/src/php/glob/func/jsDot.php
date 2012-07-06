<?php

	// Nifty JS dot loader
	
	function jsDot($ID = NULL) {
		if(!$ID) $ID = microtime().rand(1,5);
		?><span id="<?php echo $ID; ?>"></span><script type="text/javascript">jsDot('<?php echo $ID; ?>',100,1,0);</script><?php	
		return $ID;
	}
