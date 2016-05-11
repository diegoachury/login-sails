/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	index: function (req, res, next){
		User.find( function userFounded(err, users){
			if (err){
				console.log(err);
			}
			res.view({
				users: users
			});
		});
	},

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
	show: function(req, res, next){
		User.findOne(req.param('id'), function userFounded(err, user){
			if (err)
				return next(err);
			res.view({
				user: user
			});
		});
	},
	edit: function(req, res, next){
		User.findOne(req.param('id'), function userFounded(err, user){
			if (err)
				return next(err);
			if (!user)
				return next();
			res.view({
				user: user
			});
		});
	},

	update: function(req, res, next){
		var userObj = {
			name: req.param('name'),
			email: req.param('email')
		}
		User.update(req.param('id'), userObj, function userUpdated(err, user){
			if(err){
				req.session.flash = {
					err: err
				}
				return res.redirect('user/edit/' + req.param('id'));
			}
			res.redirect('user/show/'+ req.param('id'));
		});

	},
	destroy: function (req, res, next){
		User.destroy(req.param('id'), function userDestroyed(err){
			if (err) return res.send(err,500);
			return res.redirect('/user/index');
		});
	}
};

