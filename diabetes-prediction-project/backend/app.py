from tkinter import INSERT
from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector
import joblib
import numpy as np

app = Flask(__name__)
CORS(app)

model = joblib.load('diabetes_model.pkl')

db_config = {
    'host': 'localhost',
    'user':'diabetes_user',
    'password':'password@123',
    'database':'diabetes_db'
}

def get_db_connection():
    return mysql.connector.connect(**db_config)

def save_prediction(features, prediction, probability):  # Fixed spelling
    conn = get_db_connection()
    cursor = conn.cursor()
    
    query = '''INSERT INTO predictions 
               (pregnancies, glucose, blood_pressure, skin_thickness, insulin, bmi, diabetes_pedigree, age, prediction, probability) 
               VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)'''
    
    cursor.execute(query, (*features, int(prediction), float(probability)))
    conn.commit()
    
    cursor.close()
    conn.close()

@app.route('/predict',methods=['POST'])
def predict():
    data = request.get_json()
    features = [
        data['pregnancies'],
        data['glucose'],
        data['bloodPressure'],
        data['skinThickness'],
        data['insulin'],
        data['bmi'],
        data['diabetesPedigreeFunction'],
        data['age']
    ]

    prediction = model.predict([features])[0]
    probability = model.predict_proba([features])[0][1]
    save_prediction(features, prediction, probability)

    return jsonify({
        'prediction': int(prediction),
        'probability': float(probability)
    })

if __name__ == '__main__':
    app.run(debug=True)