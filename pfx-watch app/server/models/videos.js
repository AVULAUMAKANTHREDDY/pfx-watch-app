const mongoose = require("mongoose");

 const {schema} = mongoose;



const channelSchema = new mongoose.Schema({
          name : String,
          profile_image_url : String
       })

const channelSchema2 = new mongoose.Schema({
              name : String,
              profile_image_url : String,
              subscriber_count : String,
            })

       const videosSchema = new mongoose.Schema({
             title: String,
             category:String,
             thumbnail_url: String,
             channel:[channelSchema],
             view_count:String,
             published_at:String,
            
        
           });

           const Videos = mongoose.model("videos", videosSchema);


           const videoDetails = new mongoose.Schema({
                title: String,
                category:String,
                video_url: String,
                thumbnail_url:String,
                 channel:[channelSchema2],
                 view_count:String,
                 published_at:String,
                 description:String
            
                });

                const VideosDetails = mongoose.model("VideosDetails", videoDetails);

                module.exports = {VideosDetails, Videos};