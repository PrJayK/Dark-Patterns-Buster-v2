import pickle 
import os

current_dir = os.path.dirname(os.path.abspath(__file__))
rfc = os.path.join(current_dir,'rfc.pkl')
svm = os.path.join(current_dir,'svc.pkl')
vectorizer = os.path.join(current_dir,'tfidf_vectorizer.pkl')

category_map = {0: 'Urgency',
 1: 'Not Dark Pattern',
 2: 'Scarcity',
 3: 'Misdirection',
 4: 'Social Proof',
 5: 'Obstruction',
 6: 'Sneaking',
 7: 'Forced Action'}

with open(rfc, 'rb') as file:
    random_forest_classifier = pickle.load(file)

with open(svm, 'rb') as file:
    svm_classifier = pickle.load(file)

with open(vectorizer, 'rb') as file:
    vect = pickle.load(file)