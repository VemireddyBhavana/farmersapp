import tensorflow as tf
import numpy as np
import os

# Yield Prediction model (TensorFlow 2.x)
def build_and_train_model():
    print("🧠 [ML Engine] Initializing TensorFlow Yield Model...")
    
    # Simple Dense Neural Network for Yield Prediction
    model = tf.keras.Sequential([
        tf.keras.layers.Dense(64, activation='relu', input_shape=(3,)),
        tf.keras.layers.Dense(32, activation='relu'),
        tf.keras.layers.Dense(1)
    ])

    model.compile(optimizer='adam', loss='mse')

    # Synthetic Training Data (Rainfall, Temp, NDVI -> Yield)
    # Normailzed: Rainfall (0-1), Temp (0-1), NDVI (0-1)
    X = np.array([
        [0.5, 0.4, 0.75], # Good conditions
        [0.2, 0.8, 0.45], # Drought conditions
        [0.8, 0.3, 0.85], # Optimal conditions
        [0.1, 0.9, 0.30], # Extreme heat/drought
        [0.6, 0.5, 0.70]  # Balanced
    ])
    y = np.array([22.5, 12.0, 28.4, 8.5, 20.1])

    print("🚀 [ML Engine] Training Yield Model...")
    model.fit(X, y, epochs=150, verbose=0)
    
    model.save("yield_model.h5")
    print("✅ [ML Engine] Model weights saved to yield_model.h5")

if __name__ == "__main__":
    build_and_train_model()
