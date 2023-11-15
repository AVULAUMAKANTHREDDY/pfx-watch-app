const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors =require("cors");
const { Videos, VideosDetails } = require("./models/videos");
const { subscribe } = require("./routes/authRouters");
 const {PerfexUsersData} = require("./models/perfexUsers")


const port = 4325|| process.env.PORT
const addVideos = async () => {
    try {
        const videoDetail = new VideosDetails({

 
 



            title: "8 Ball pool",
            thumbnail_url: "https://assets.ccbp.in/frontend/react-js/nxt-watch/8-ball-pool--img.png",
           "video_url": "",
                 channel: [{
                               name: "Pryszard Android iOS Gameplays",
                                  profile_image_url: "https://assets.ccbp.in/frontend/react-js/nxt-watch/pryszard-android-ios-gameplays-img.png",
                                   subscriber_count: "1.08M"
                                      }],
                                      category:"gaming",
             view_count: "29K",
             published_at: "Apr 21, 2019",
            description: "8 Ball Pool - Gameplay Walkthrough Part 1 (Android, iOS)"
       


});

        const savedVideoDetail = await videoDetail.save();

        const video = new Videos({
            _id: savedVideoDetail._id,





            

           

            title: "8 Ball pool",
            thumbnail_url: "https://assets.ccbp.in/frontend/react-js/nxt-watch/8-ball-pool--img.png",
            channel: [{
              name: "Pryszard Android iOS Gameplays",
              profile_image_url: "https://assets.ccbp.in/frontend/react-js/nxt-watch/pryszard-android-ios-gameplays-img.png"
            }],
            category:"gaming",
            view_count: "29K",
            published_at: "Apr 21, 2019"

        





 });

        await video.save();
        await mongoose.disconnect();
    } catch (e) {
        console.log(e);
    } 
};
 
//  addVideos();



app.use(cors());
app.use(express.json());
mongoose.connect('mongodb+srv://avula12346:umakanth123@cluster0.lyx61rf.mongodb.net/pfxvideos?retryWrites=true&w=majority')
.then(()=> console.log('DB connected'))
.catch((error)=>console.log(error));

app.get("/", async(req,res)=>{
    res.send("server running at 4445")
})
app.use("/auth", require("./routes/authRouters"));
app.use("/videos", require("./routes/apiRoutes"));
app.listen(port, ()=> console.log(`server running at${port}`));