const express = require( 'express' );
const { body } = require('express-validator');

const { 
    repairExists,
    validateSession,
    validateRole
} = require('../middlewares/repairs.middlewares');
const { 
    createRepairValidations, 
    checkValidations 
} = require('../middlewares/validations.middlewares');

const { 
    getAllRepairs, 
    createRepair,
    getRepairById,
    updateRepairById,
    deleteRepairById 
} = require( '../controllers/repairs.controller' );

const router = express.Router();

router.get( '/', validateSession, validateRole, getAllRepairs );

router.post( '/', createRepairValidations, checkValidations, createRepair );

router.get( '/:id', validateSession, validateRole, repairExists, getRepairById );

router.patch( '/:id', validateSession, validateRole, repairExists, updateRepairById );

router.delete( '/:id', validateSession, validateRole, repairExists, deleteRepairById );

module.exports = { repairsRouter: router };