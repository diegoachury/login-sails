/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	new:function (req, res){
		res.view('user/register');
	},
	create:function(req, res){
		var userObj = {
			name: req.param('name'),
			email: req.param('email')
		}
		User.create(userObj, function (err, user){
			if(err){
				console.log(err)
				return res.redirect('user/new');
			}
			res.redirect('user/show/'+user.id);
		});
	},
	show:function(req, res, next){
		User.findOne(req.param('id'), function userFounded( err, user){
			if (err)
				return next(err);
			res.view({
				user: user
			});
		});
	}
};

