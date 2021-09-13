const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
mongoose.connect(
	'mongodb://zhiqiuge:XUELIANG123456@localhost:27017/cars',
	{ useNewUrlParser: true },
	function (err, result) {
		if (err) {
			throw new Error(err);
		}
	}
);

module.exports = mongoose;
