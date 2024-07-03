from flask import Flask, request, jsonify
import json
from model.load_models import random_forest_classifier,svm_classifier,vect,category_map

app = Flask(__name__)

def detect_dark_patterns(texts):

    '''
    texts format:
    [
        {
            "id" : "generated-id-123",
            "text" : "Hurry Now! Offer closes in 15 minutes"
        },
        {
            "id":"generated-id-123",
            "text":"Hurry Now! Offer closes in 15 minutes"
        }
    ]
    '''

    dark_pattern_ids = []

    text = [item['text'] for item in texts]
    ids = [item['id'] for item in texts]

    x_test = vect.transform(text)

    rf_predictions = random_forest_classifier.predict(x_test)
    svm_predictions = svm_classifier.predict(x_test)

    rf_predictions = rf_predictions.tolist()
    svm_predictions = svm_predictions.tolist()

    # Assume the ML model returns a list of IDs that have dark patterns
    for id_, rf_pred, svm_pred in zip(ids, rf_predictions, svm_predictions):
        dark_pattern_ids.append({
            'id': id_,
            'random_forest_prediction': category_map[int(rf_pred)],
            'svm_prediction': category_map[int(svm_pred)] 
        })
    return dark_pattern_ids

@app.route('/check_dark_patterns', methods=['POST'])
def check_dark_patterns():
    data = request.get_json()
    texts = data['texts']
    dark_pattern_ids = detect_dark_patterns(texts)
    return jsonify(darkPatternIds=dark_pattern_ids)

if __name__ == '__main__':
    app.run(debug=True, port=3000)