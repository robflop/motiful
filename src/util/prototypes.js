String.prototype.capitalize = function capitalize() {
	return this[0].toUpperCase() + this.slice(1);
};

String.prototype.toTitleCase = function toTitleCase() {
	return this.split(' ').map(a => a[0].toUpperCase() + a.slice(1)).join(' ');
};

Array.prototype.last = function last() {
	return this[this.length - 1];
};

Array.prototype.unique = function unique() {
	return [...new Set(this)];
};