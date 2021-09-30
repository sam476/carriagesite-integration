const express = require('express');
const Readytowork = require('../models/readytowork');
const authenticate = require('../authenticate');
const cors = require('./cors');

const readytoworkRouter = express.Router();

readytoworkRouter.route('/')
  .options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
  .get(cors.cors, (req, res, next) => {
    Readytowork.find()
      .populate('cleaner')
      .then(readytoworks => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(readytoworks);
      })
      .catch(err => next(err));
  })
  .post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Readytowork.create(req.body)
      .then(readytowork => {
        Readytowork.findById(readytowork._id)
          .populate('cleaner')
        console.log('ready to work user Created ', readytowork);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(readytowork);
      })
      .catch(err => next(err));
  })
  .put(cors.corsWithOptions, authenticate.verifyUser, (req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /readytoworks');
  })
  .delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Readytowork.deleteMany()
      .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
      })
      .catch(err => next(err));
  });

readytoworkRouter.route('/:readytoworkId')
  .options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
  .get(cors.cors, (req, res, next) => {
    Readytowork.findById(req.params.readytoworkId)
      .then(readytowork => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(readytowork);
      })
      .catch(err => next(err));
  })
  .post(cors.corsWithOptions, authenticate.verifyUser, (req, res) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /readytoworks/${req.params.readytoworkId}`);
  })
  .put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Readytowork.findByIdAndUpdate(req.params.readytoworkId, {
      $set: req.body
    }, { new: true })
      .then(readytowork => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(readytowork);
      })
      .catch(err => next(err));
  })
  .delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Readytowork.findByIdAndDelete(req.params.readytoworkId)
      .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
      })
      .catch(err => next(err));
  });

module.exports = readytoworkRouter;