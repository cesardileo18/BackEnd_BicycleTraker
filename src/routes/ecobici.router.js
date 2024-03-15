import express from "express";
import { getStationStatus, getStationInformation } from "../controllers/ecobici.controller.js";
const ecobiciRouter = express.Router();

ecobiciRouter.get('/ecobici-status', getStationStatus);
ecobiciRouter.get('/ecobici-information', getStationInformation);

export default ecobiciRouter;