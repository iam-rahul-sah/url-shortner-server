import express from "express";
import { UrlModel } from "../models/shortUrl";

export const createUrl = async (
  req: express.Request,
  res: express.Response
) => {
    try {
        const fullUrl = req.body.fullUrl
        const urlFound = await UrlModel.find({fullUrl});
        if(urlFound.length > 0){
            res.status(409);
            res.send(urlFound);
        } else {
            const shortUrl = await UrlModel.create({fullUrl});
            res.status(201).send(shortUrl);
        }
    }
    catch (err) {
        res.status(500).send({"message": "Something went wrong!"})
    }
};

export const getAllUrl = async (
  req: express.Request,
  res: express.Response
) => {
    try {
        const shortUrl = await UrlModel.find().sort({createdAt: -1});
        if(shortUrl.length < 0){
            res.status(404).send({ message: "Short urls not found!"});
        } else {
            res.status(200).send(shortUrl)
        }
    } catch (err) {
        res.status(500).send({"message": "Something went wrong!"});
    }
};

export const getUrl = async (
  req: express.Request,
  res: express.Response
) => {
    const shortUrl = req.params.id;
    try{
        const shortUrlFound = await UrlModel.findOne({shortUrl})
        if(!shortUrlFound){
            res.status(400).send({"message": "Full url not found"});
        } else {
            shortUrlFound.click++;
            shortUrlFound.save();
            res.redirect(`${shortUrlFound.fullUrl}`);
        }
    } catch (err) {
        res.status(500).send({"message": "Something went wrong!"});
    }
};

export const deleteUrl = async (
  req: express.Request,
  res: express.Response
) => {
    try{
        const shortUrlFound = await UrlModel.findByIdAndDelete({_id: req.params.id})
        if(shortUrlFound){
            res.status(200).send({"message": "Requested URL successfully deleted"});
        } 
    } catch (err) {
        res.status(500).send({"message": "Something went wrong!"});
    }
};
