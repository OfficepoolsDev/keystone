var assign = require('object-assign');
var async = require('async');
var addTenancyFilter = require('./helpers/addTenancyFilter');

module.exports = function (req, res) {
	var keystone = req.keystone;
	var counts = {};
	async.each(keystone.lists, function (list, next) {
		const tenancyFilter = addTenancyFilter(list, req.user);
		let where = {};
		if (tenancyFilter) {
			assign(where, tenancyFilter);
		}
		list.model.count().where(where).exec(function (err, count) {
			counts[list.key] = count;
			next(err);
		});
	}, function (err) {
		if (err) return res.apiError('database error', err);
		return res.json({
			counts: counts,
		});
	});
};
