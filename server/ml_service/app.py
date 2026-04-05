import tensorflow as tf
import numpy as np
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Load existing model or train if not found
model_path = "yield_model.h5"
if not tf.io.gfile.exists(model_path):
    print("⚠️ [ML Service] Model not found. Training new model...")
    from model import build_and_train_model
    build_and_train_model()

model = tf.keras.models.load_model(model_path)
print("✅ [ML Service] TensorFlow Yield Model Loaded.")

@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.json
        print(f"📥 [ML Service] Received Prediction Request: {data}")

        # Extract features (normalized for model)
        # Normalized mapping:
        # Rainfall: 0-1000mm -> 0-1
        # Temperature: 0-50C -> 0-1
        # NDVI: 0-1 (Direct)
        rainfall = float(data.get("rainfall", 0.5 * 1000)) / 1000
        temp = float(data.get("temperature", 30.0)) / 50
        ndvi = float(data.get("ndvi", 0.72))

        features = np.array([[rainfall, temp, ndvi]])
        prediction = model.predict(features, verbose=0)
        
        yield_val = float(prediction[0][0])
        print(f"✅ [ML Service] Yield Predicted: {yield_val:.2f} Tons/Hectare")

        return jsonify({
            "yield": round(yield_val, 2),
            "confidence": 0.88,
            "status": "Calculated via TensorFlow"
        })

    except Exception as e:
        print(f"❌ [ML Service] ERROR: {str(e)}")
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    print("🚀 [ML Service] Starting Yield Intelligence API on Port 5001...")
    app.run(port=5001, host="0.0.0.0")
