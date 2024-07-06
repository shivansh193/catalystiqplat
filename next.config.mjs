// next.config.mjs
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

export default {
  env: {
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
  },
};

