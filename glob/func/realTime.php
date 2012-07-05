<?php

	/*
	*
	* realTime( $lod, $div, $id )
	*
	* Makes creating a real-time module simple
	*
	*/
	
	function realTime( $lod, $div, $id, $loadText = NULL, $Parameters = NULL, $style = 'margin: 0', $usePreIP = false) {
		global $preIP;
		if(!$Parameters) $Parameters = 'is_ajax=1';
		if($usePreIP) $preIP2 = $preIP;
		?>
        <div id="debug_<?php echo $id; ?>"></div>
        <script type="text/javascript">drephLod('<?php echo $preIP2.$lod; ?>','<?php echo $preIP2.$div; ?>','<?php echo $id; ?>','','<?php echo safeVar($loadText); ?>','<?php echo $Parameters; ?>');</script>
        <?php
		
		echo '<div id="'.$id.'" style="'.$style.'">';
			// Loading directly, then AJAX
			include $preIP.$div;
		echo '</div>';
		
	}
	