var Row = function(row) {
	this.row = row;
	this.generate_row();
	this.generate_tiles();
};

Row.prototype.generate_row = function() {
	var $new_row = '<div class="row" id="row_'+this.row+'">';
	$('.main').append($new_row);
	this.$selector = $('#row_'+this.row);
};

Row.prototype.generate_tiles = function() {
	this.tiles = [];
	for (var i = 0; i <= 5; i++) {
		var $tile = '<div class="tile" id="'+this.row+'-'+i+'"></div>';
		$(this.$selector).append($tile);
		var new_tile = new Tile(this.row, i);
		this.tiles.push(new_tile);
	}
};

Row.prototype.select = function() {
	var last_unselected_tile;
	for (var i = 5; i >= 0; i--) {
		var $selector = this.tiles[i].$selector;
		if (!$selector.hasClass('red') && !$selector.hasClass('black')) {
			last_unselected_tile = this.tiles[i];
			break;
		}
	}
	if (last_unselected_tile) {
		last_unselected_tile.select();
	}
	else {
		console.log("No more tiles in this row.");
	}
};