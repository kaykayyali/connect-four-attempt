var Player = function(index, selector) {
	this.$selector = selector
	this.index = index;
	this.score = 0;
	this.set_score();
	console.log('Player ', this.index, ' generated.');
};

Player.prototype.change_turn = function() {
	// console.log('Player ', this.index, 'took selection');
	$('div.selected').removeClass('selected');
	this.$selector.addClass('selected');
};

Player.prototype.increment_score = function() {
	this.score++;
	this.set_score();
};

Player.prototype.set_score = function() {
	this.$selector.find('.score').text(this.score);
};