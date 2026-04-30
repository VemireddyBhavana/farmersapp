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
        all_suitable = [self.crops[crop_idx % len(self.crops)]]
        
        # Add secondary recommendations based on soil profile
        if n > 70: all_suitable.extend(["Rice", "Sugarcane", "Banana"])
        if p > 50: all_suitable.extend(["Maize", "Chickpea", "Soybean"])
        if k > 50: all_suitable.extend(["Potato", "Grapes", "Tobacco"])
        if ph > 7.0: all_suitable.extend(["Cotton", "Wheat"])
        if ph < 6.0: all_suitable.extend(["Potato", "Tea"])
        
        # Remove duplicates and shuffle slightly
        unique_crops = list(set(all_suitable))
        np.random.shuffle(unique_crops)
        
        # Simulated fertility logic
        fertility_score = (n + p + k) / 3
        fertility_level = "High" if fertility_score > 60 else "Medium" if fertility_score > 30 else "Low"

        # Fertilizer recommendation logic
        fertilizer = ""
        if n < 50: fertilizer += "Apply 50kg/acre Urea. "
        if p < 40: fertilizer += "Apply 30kg/acre DAP. "
        if k < 40: fertilizer += "Apply 20kg/acre MOP. "
        if not fertilizer: fertilizer = "Maintain soil health with Organic Compost (2 tons/acre) and balanced NPK 19-19-19."

        return {
            "fertility_level": fertility_level,
            "suitable_crops": unique_crops[:3], # Return top 3
            "fertilizer_recommendation": fertilizer,
            "irrigation_suggestion": "Maintain moisture at 20-25% (Critical for flowering stage)." if moisture < 150 else "Ensure proper drainage to prevent root rot."
        }

soil_analyzer = SoilAnalyzer()
