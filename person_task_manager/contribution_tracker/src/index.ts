import express, { Application, NextFunction, Request, Response } from "express";
import { config, validateEnvironmentVars } from "./kernel"

async function main(): Promise<void> {
    validateEnvironmentVars()


}