/**
 * TweetController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {
    
  
	index: function(req,res){
		if (req.isSocket){
			var adapterMethod = req.param('adapterMethod');
			console.log(req.params.all());
//			Tweet.searchTweets({twit_ident:'sailsTroll',query:req.params.all()},function searchCB(err,results){

		} else {
			res.view('home/index');
		}
	},
	create: function(req,res){
			Tweet.postTweet({twit_ident:'sailsTroll',query:req.params.all()},function searchCB(err,results){

				if (err){
					return res.json({error:err})
				} else {
					return res.json({error:null,response:results});
				}
			})
	},
	destroy: function(req,res){
			Tweet.destroyTweet({twit_ident:'sailsTroll',query:req.params.all()},function searchCB(err,results){

				if (err){
					return res.json({error:err})
				} else {
					return res.json({error:null,response:results});
				}
			})

	},
	find: function(req,res){
		Tweet.findUserTweets({twit_ident:'sailsTroll',query:req.params.all()},function searchCB(err,results){

				if (err){
					return res.json({error:err})
				} else {
					return res.json({error:null,response:results});
				}
			})

	},
	newStream: function(req,res){
		if (req.isSocket){

			Tweet.startTweetStream({twit_ident:'sailsTroll',socketObject:req.socket,query:req.params.all()},function searchCB(err,results){
					if (err){
						return res.json({error:err})
					} else {
						return res.json({error:null,response:results});
						//console.log('Got it',results.response)

					}
				})
		} else {
			res.serverError('Socket.io Only');
		}
	},
  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to TweetController)
   */
  _config: {}

  
};
