const express=require('express')
const router=require('express').Router()
const Listing=require("../models/listing.js")

router.get("/",async (req,res)=>{
    try{
        const allListings= await Listing.find()
        res.render('listings/index',{allListings})
        console.log(allLIstings)
        res.render("")

    }catch(err){
        console.log(err)
    }
})
module.exports=router