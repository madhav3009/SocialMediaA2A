const Post = require('../models/post');
const User = require('../models/user');
const Like = require('../models/like');



module.exports.home = async function(req, res){

    try{
        // populate the likes of each post and comment
        let posts = await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            },
            populate: {
                path: 'likes'
            }
        }).populate('likes');

    
        let users = await User.find({});

        return res.render('home', {
            title: "CodeA2A",
            posts:  posts,
            all_users: users
        });

    }catch(err){
        console.log('Error', err);
        return;
    }
   
}

