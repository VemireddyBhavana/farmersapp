import numpy as np
import pandas as pd
from xgboost import XGBRegressor
from sklearn.preprocessing import MinMaxScaler
import datetime

class PricePredictor:
    def __init__(self):
        self.crops = ["Rice", "Wheat", "Tomato", "Cotton", "Maize", "Onion"]
        self.models = {}
        self.scalers = {}
        self._train_initial_models()

    def _train_initial_models(self):
        # Synthetic historical data for training
        # In a real app, this would load from a CSV or Database
        for crop in self.crops:
        
            # Create synthetic time series data
            dates = pd.date_range(start='2023-01-01', periods=100, freq='D')
            base_price = 2000 if crop in ["Rice", "Wheat"] else 1500
            prices = base_price + np.random.normal(0, 50, size=100) + np.sin(np.linspace(0, 10, 100)) * 200
            
            df = pd.DataFrame({'date': dates, 'price': prices})
            df['day_of_year'] = df['date'].dt.dayofyear
            df['month'] = df['date'].dt.month
            
            X = df[['day_of_year', 'month']]
            y = df['price']
            
            model = XGBRegressor(n_estimators=100, learning_rate=0.1)
            model.fit(X, y)
            
            self.models[crop] = model
            print(f"📈 [Price Engine] Model trained for {crop}")

    def predict_7_days(self, crop):
        if crop not in self.models:
            crop = "Rice" # Default
            
        today = datetime.datetime.now()
        forecast = []
        
        for i in range(1, 8):
            future_date = today + datetime.timedelta(days=i)
            X_pred = pd.DataFrame({
                'day_of_year': [future_date.timetuple().tm_yday],
                'month': [future_date.month]
            })
            
            pred_price = self.models[crop].predict(X_pred)[0]
            forecast.append({
                "day": future_date.strftime("%A"),
                "date": future_date.strftime("%Y-%m-%d"),
                "price": round(float(pred_price), 2)
            })
            
        return forecast

    def get_current_price(self, crop):
        # In a real app, fetch from Mandi API
        base_prices = {
            "Rice": 2200, "Wheat": 2150, "Tomato": 1800, 
            "Cotton": 8500, "Maize": 1900, "Onion": 2400
        }
        return base_prices.get(crop, 2000)

price_predictor = PricePredictor()
