var game = {
	board: [],
	change_turn: function() {
		this.current_player.change_turn();
	},
	check_game_state: function(tile) {
		this.reset_checks();
		this.current_tile = tile;
		this.desired_state = tile.state;
		// The magic must happen here...
		this.check_horizontal_win();
		this.check_vertical_win()
	},
	check_horizontal_win: function() {
		if(this.left_steps  + this.right_steps - 1 === 4) {
			this.is_over = true;
			this.current_player.increment_score();
			return;
		}
		this.check_left();
		this.check_right();
	},
	check_vertical_win: function() {
		if(this.up_steps  + this.down_steps - 1 === 4) {
			this.is_over = true;
			this.current_player.increment_score();
			return;
		}
		this.check_up();
		this.check_down();
	},
	check_up: function() {
		var target_index = this.current_tile.index + this.up_steps;
		var target_tile = this.board[this.current_tile.row].tiles[target_index];
		if (target_tile && target_tile.state === this.desired_state) {
			this.up_steps++;
			this.check_vertical_win();
			return;
		}
	},
	check_down: function() {
		var target_index = this.current_tile.index - this.down_steps;
		var target_tile = this.board[this.current_tile.row].tiles[target_index];
		if (target_tile && target_tile.state === this.desired_state) {
			this.down_steps++;
			this.check_vertical_win();
			return;
		}
	},
	check_left: function() {
		var row_minus = this.current_tile.row - this.left_steps;
		if (this.board[row_minus] && this.board[row_minus].tiles[this.current_tile.index].state === this.desired_state) {
			this.left_steps++;
			this.check_horizontal_win();
			return;
		}
	},
	check_right: function() {
		var row_plus = this.current_tile.row + this.right_steps;
		if (this.board[row_plus] && this.board[row_plus].tiles[this.current_tile.index].state === this.desired_state) {
			this.right_steps++;
			this.check_horizontal_win();
			return;
		}
	},
	generate_new_board: function() {
		$('.main').empty();
		// Generate a matrix of tile objects and assign their jquery selector for onclick functions;
		this.board = [];
		for (var i = 0; i <= 6; i++) {
			var new_row = new Row(i);
			this.board.push(new_row);
		}
	},
	generate_players: function() {
		var $player_one = $('#player_one_wrap');
		var $player_two = $('#player_two_wrap');
		// Generate player models. should only be once.
		this.player_one = new Player(1, $player_one);
		this.player_two = new Player(2, $player_two);
		this.current_player = this.player_one;
		this.change_turn();
	},
	reset_checks: function() {
		this.right_steps = 1;
		this.left_steps = 1;
		this.up_steps = 1;
		this.down_steps = 1;
	},
	toggle_player: function(tile) {
		this.check_game_state(tile);
		if (!this.is_over) {
			// Determine who is next
			if (this.current_player.index === 1) {
				this.current_player = this.player_two;
			}
			else {
				this.current_player = this.player_one;
			}
			this.change_turn();
		}
	},
	init: function(options) {
		this.generate_new_board();
		this.generate_players();
		console.log('Game Ready.');
	}
};