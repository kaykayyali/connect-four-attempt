var Tile = function(row, index) {
	var self = this;
	this.row = row;
	this.index = index;
	this.state = 0;
	this.$selector = $('#'+row + '-' + index);
	this.$selector.on('click', function(event) {
		self.handle_click(event);
	});
	console.log('Tile ', row, index, 'generated', this);
};

Tile.prototype.handle_click = function(event) {
	game.board[this.row].select();
};

Tile.prototype.determine_color = function() {
	if (game.current_player.index === 1) {
		return 'red';
	}
	else {
		return 'black';
	}
};

Tile.prototype.set_state = function() {
	if (game.current_player.index === 1) {
		this.state = '1';
	}
	else {
		this.state = '2';
	}
};

Tile.prototype.select = function() {
	if (game.is_over) {
		return;
	}
	this.$selector.addClass(this.determine_color);
	this.set_state();
	game.toggle_player(this);
};

