import mongoose from "mongoose";

const Connection = async (URL)=>{
    try{
       await mongoose.connect(URL,{UseNewUrlParser: true});
       console.log("Connection Successful");
    }
    catch(error){
       console.log('Error while connecting to the database',error);
    }
}
export default Connection;