let user = require('../dao/users');
let count = 1;
function add(params, cb) {
	user.insert(params, function (err, data) {
		if (err) {
			cb(err);
		} else {
			cb(null, data);
		}
	});
}

let timer = setInterval(() => {
	let name = `jack${count}`;
	add(
		{
			name: name,
			age: 26,
			avatar:
				'http://localhost:9101/public/images/2019/8/6/6bf9def0-61d7-43aa-b7ef-c0b064016943.png',
			gender: 1,
			telphone: '18688888888',
			account: name,
			role: 'admin',
			dept: '123456789',
			status: 1,
		},
		function () {}
	);
	++count;
}, 1000);
