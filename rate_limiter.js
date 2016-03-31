function RateLimiter(delay) {
	this.delay = delay;
	this.queue = [];
	this.isComplete = true;
}

RateLimiter.prototype.addAndCall = function(func) {
	this.queue.push(func);
	if (this.isComplete) {
		this.isComplete = false;
		this.maybeDequeueMethod();		
	}
}

RateLimiter.prototype.maybeDequeueMethod = function() {
	var self = this;
	if (self.queue.length == 0) {
		self.isComplete = true;
		console.log(self.queue)
		return;
	}

	var func = self.queue.shift();
	func.call();

	setTimeout(function(){
		self.maybeDequeueMethod();
	}, self.delay);
}