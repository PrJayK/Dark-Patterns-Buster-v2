from flask import Flask, request, jsonify

app = Flask(__name__)

# Your ML model for detecting dark patterns
def detect_dark_patterns(texts):
    dark_pattern_ids = []
    # Assume the ML model returns a list of IDs that have dark patterns
    for text in texts:
        if your_ml_model.predict(text['text']):
            dark_pattern_ids.append(text['id'])
    return dark_pattern_ids

@app.route('/')
def home():
    return 'Hello World!'

@app.route('/check_dark_patterns', methods=['POST'])
def check_dark_patterns():
    data = request.get_json()
    texts = data['texts']
    dark_pattern_ids = detect_dark_patterns(texts)
    return jsonify(darkPatternIds=dark_pattern_ids)

if __name__ == '__main__':
    app.run(debug=True, port=3000)