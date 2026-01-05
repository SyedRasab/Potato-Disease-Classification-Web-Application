from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import numpy as np
import tensorflow as tf
from PIL import Image
import io

import os

app = FastAPI()

origins = [
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/ping")
async def ping():
    return "Hello, I am alive"

@app.get("/")
async def root():
    return "The Potato Disease API is running! Use /predict for leaf analysis."

# 1. LOAD MODEL (Do this once at startup, not inside the function)
# Use absolute path resolution to be robust against CWD
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, "..", "saved_models", "1.keras")

MODEL = tf.keras.models.load_model(MODEL_PATH)
CLASS_NAMES = ["Potato___Early_blight", "Potato___Late_blight", "Potato___healthy"]

def read_file_as_image(data) -> np.ndarray:
    # 2. PREPROCESS: Convert bytes to a resized numpy array
    image = np.array(Image.open(io.BytesIO(data)).resize((256, 256)))
    return image

@app.post("/predict")
async def predict(
    file: UploadFile = File(...)
):
    image = read_file_as_image(await file.read())
    img_batch = np.expand_dims(image, 0)
    
    predictions = MODEL.predict(img_batch)
    
    # Get all probabilities
    confidence_scores = predictions[0].tolist() # Convert numpy array to list
    
    predicted_class = CLASS_NAMES[np.argmax(predictions[0])]
    confidence = np.max(predictions[0])
    
    return {
        'class': predicted_class,
        'confidence': float(confidence),
        'breakdown': {
            CLASS_NAMES[0]: float(confidence_scores[0]),
            CLASS_NAMES[1]: float(confidence_scores[1]),
            CLASS_NAMES[2]: float(confidence_scores[2])
        }
    }


if __name__ == "__main__":
    uvicorn.run(app, host='localhost', port=8000)