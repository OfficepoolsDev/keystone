module.exports = function (list, user) {
	const { tenancyField } = list.options;
	const { isSuperAdmin, tenant } = user;
	if (isSuperAdmin || !tenancyField) {
		return {};
	}
	if (tenancyField) {
		return { [tenancyField]: tenant };
	}
};
