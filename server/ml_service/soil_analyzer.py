import numpy as np
from sklearn.ensemble import RandomForestClassifier

class SoilAnalyzer:
    def __init__(self):
        self.crops = ["Rice", "Maize", "Chickpea", "Kidney Beans", "Pigeon Peas", 
                      "Moth Beans", "Mung Bean", "Black Gram", "Lentil", "Pomegranate", 
                      "Banana", "Mango", "Grapes", "Watermelon", "Muskmelon", "Apple", 
                      "Orange", "Papaya", "Coconut", "Cotton", "Jute", "Coffee"]
        
        self.model = self._train_model()

    def _train_model(self):
        # Synthetic data: N, P, K, pH, Moisture
        # Feature order: [N, P, K, pH, Moisture]
        X = np.array([
            [90, 42, 43, 6.5, 200], # Rice
            [40, 58, 33, 6.0, 150], # Maize
            [20, 60, 20, 5.5, 100], # Chickpea
            [100, 30, 50, 7.0, 250], # Banana
            [80, 50, 40, 6.2, 180], # Cotton
            [60, 40, 20, 6.8, 120], # Papaya
        ])
        y = np.array([0, 1, 2, 10, 19, 17]) # Indices of crops

        model = RandomForestClassifier(n_estimators=50)
        model.fit(X, y)
        return model

    def analyze(self, n, p, k, ph, moisture):
        features = np.array([[n, p, k, ph, moisture]])
        prediction = self.model.predict(features)
        crop_idx = prediction[0]
        
        # Real-world crop logic based on common NPK ranges
        recommended_crop = self.crops[crop_idx % len(self.crops)]
        
        # Simulated fertility logic
        fertility_score = (n + p + k) / 3
        fertility_level = "High" if fertility_score > 60 else "Medium" if fertility_score > 30 else "Low"

        # Fertilizer recommendation logic
        fertilizer = ""
        if n < 50: fertilizer += "Urea for Nitrogen. "
        if p < 40: fertilizer += "DAP for Phosphorus. "
        if k < 40: fertilizer += "MOP for Potassium. "
        if not fertilizer: fertilizer = "Organic Compost and balanced NPK 19-19-19."

        return {
            "fertility_level": fertility_level,
            "suitable_crops": [recommended_crop, "Maize" if recommended_crop != "Maize" else "Vegetables"],
            "fertilizer_recommendation": fertilizer,
            "irrigation_suggestion": "Maintain moisture at 20-25%" if moisture < 150 else "Ensure proper drainage."
        }

soil_analyzer = SoilAnalyzer()
