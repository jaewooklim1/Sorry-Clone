const { response } = require('express');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Room = require('../../models/Room');
const validateRoomInput = require('../../validation/rooms');

router.get("/", async (req, res) => {
    // let expirationTime = new Date(Date.now());
    // let expirationDate = new Date(Date.now());
    // expirationTime.setHours(expirationTime.getHours() - 2);
    // expirationDate.setDate(experationDate.get);
    // console.log("DATE ---------------", expirationDate);
    // console.log("expirationTime---------------------", expirationTime, "--------------------")
    // expirationTime.setMinutes(expirationTime.getMinutes() - 1);
    // await Room.deleteMany({createdAt: {$lt: expirationTime}})
    //Date.now 
    Room.find()
    .sort({date: -1})
    .then(room => res.json(room))
    .catch(err=> res.status(404).json({noroomfound: "no room found"}))
})

router.get('/:id', (req, res) => {
    Room.findById(req.params.id)
        .then(room => res.json(room))
        .catch(err =>
            res.status(404).json({ noroomfound: 'no room found with that ID' })
        )
});

router.post('/',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
      const { errors, isValid } = validateRoomInput(req.body);
  
      if (!isValid) {
        return res.status(400).json(errors);
      }
  
      const newRoom = new Room({
        roomname: req.body.roomname,
        user: req.user.id,
      });
      
      //should redirect user to /room/:room_id
      newRoom.save()
    }
);

router.delete('/:id', (req, res) => {
    Room.deleteOne({_id: req.params.id}, (err)=> {
        if(err) {
            return err
        };
    });

    res.redirect('/');
})


module.exports = router;