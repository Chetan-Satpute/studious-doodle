import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

export const {NODE_ENV = 'development', PORT = 8000} = process.env;
export const SAVE_LOGS = process.env.SAVE_LOGS === 'true' || false;
