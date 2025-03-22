from dotenv import load_dotenv
import os

load_dotenv()

SERVER_URL = '0.0.0.0'
PORT = os.getenv("PORT", "8000") 

ENV = os.getenv("ENV", "dev")
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
