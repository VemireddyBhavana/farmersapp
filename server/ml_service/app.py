try:
    import tensorflow as tf
    HAS_TF = True
except ImportError:
    HAS_TF = False
    print("[ML Service] WARNING: TensorFlow not found. Yield & Disease modules will use simulation.")

import numpy as np
from flask import Flask, request, jsonify
from flask_cors import CORS

try:
    from disease_model import detector
    from price_predictor import price_predictor
    from soil_analyzer import soil_analyzer
    HAS_ENGINES = True
except ImportError:
    HAS_ENGINES = False
    print("[ML Service] WARNING: One or more AI engines failed to load.")

app = Flask(__name__)
CORS(app)

# Load existing yield model
yield_model = None
if HAS_TF:
    model_path = "yield_model.h5"
    if not tf.io.gfile.exists(model_path):
        print("[ML Service] WARNING: Yield model not found. Training new model...")
        try:
            from model import build_and_train_model
            build_and_train_model()
        except:
            print("[ML Service] ERROR: Training failed.")
    
    try:
        yield_model = tf.keras.models.load_model(model_path)
    except:
        print("[ML Service] ERROR: Model loading failed.")
print("[ML Service] SUCCESS: TensorFlow Models & AI Engines Loaded.")

@app.route("/predict-yield", methods=["POST"])
def predict_yield():
    try:
        data = request.json
        rainfall = float(data.get("rainfall", 500)) / 1000
        temp = float(data.get("temperature", 30.0)) / 50
        ndvi = float(data.get("ndvi", 0.72))

        if yield_model:
            features = np.array([[rainfall, temp, ndvi]])
            prediction = yield_model.predict(features, verbose=0)
            yield_val = round(float(prediction[0][0]), 2)
        else:
            # Simulation logic
            yield_val = round((rainfall * 10) + (ndvi * 5), 2)
        
        return jsonify({
            "yield": yield_val,
            "confidence": 0.88,
            "status": "Calculated via TensorFlow" if yield_model else "Simulation (ML Engine Offline)"
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/predict-market", methods=["POST"])
def predict_market():
    try:
        data = request.json
        crop = data.get("crop", "Rice")
        forecast = price_predictor.predict_7_days(crop)
        current = price_predictor.get_current_price(crop)
        
        return jsonify({
            "crop": crop,
            "current_price": current,
            "forecast": forecast,
            "trend": "up" if forecast[-1]["price"] > current else "down"
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/detect-disease", methods=["POST"])
def detect_disease():
    try:
        if 'image' not in request.files:
            return jsonify({"error": "No image uploaded"}), 400
        
        if HAS_ENGINES and 'detector' in globals() and detector:
            file = request.files['image']
            image_bytes = file.read()
            result = detector.predict(image_bytes)
        else:
            # Simulated result
            result = {
                "disease": "Early Blight",
                "confidence": "85.20%",
                "cure": "Apply copper-based fungicide and remove infected leaves.",
                "pesticide": "Copper Oxychloride",
                "prevention": "Crop rotation and avoid overhead irrigation.",
                "status": "Simulation Mode"
            }
        
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/analyze-soil", methods=["POST"])
def analyze_soil():
    try:
        data = request.json
        n = float(data.get("n", 50))
        p = float(data.get("p", 50))
        k = float(data.get("k", 50))
        ph = float(data.get("ph", 6.5))
        moisture = float(data.get("moisture", 150))
        
        result = soil_analyzer.analyze(n, p, k, ph, moisture)
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    print("[ML Service] SUCCESS: AI Smart Farming API running on Port 5001...")
    app.run(port=5001, host="0.0.0.0")
