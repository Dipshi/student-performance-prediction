import pandas as pd
import numpy as np
from sklearn.preprocessing import LabelEncoder
from sklearn.model_selection import train_test_split
from sklearn.metrics import confusion_matrix
from sklearn.model_selection import GridSearchCV, cross_val_score
from sklearn.pipeline import Pipeline
from sklearn.feature_selection import SelectKBest, chi2
from keras.models import Sequential
from keras.layers import Dense, Activation,Flatten,Dropout,MaxPooling1D
from keras.layers import LSTM,GRU,Conv1D
# import matplotlib.pyplot as plt
from sklearn.preprocessing import LabelEncoder

from keras import losses
import keras
import keras.utils
from keras import utils as np_utils
from keras.optimizers import SGD
from imblearn.over_sampling import SMOTE


df=pd.read_csv('More5.csv')

""" Split Data into Training and Testing Sets """

def split_data(X, Y):
    return train_test_split(X, Y, test_size=0.2, random_state=17)
    # For each feature, encode to categorical values

class_le = LabelEncoder()
for column in df[['Gender','Caste','admission_category']].columns:
    df[column] = class_le.fit_transform(df[column].values)
df.pop('Sem4')
df.pop('Sem5')
y=df.pop('Sem3')
X=df

# smote = SMOTE(ratio='minority')
# X_sm, y_sm = smote.fit_sample(X, y)
# X = pd.DataFrame(X_sm)
# y = pd.DataFrame(y_sm)

# df=df.drop(df.index[0],inplace=True)


#Convolutional Neural Networks
X_train, X_test, y_train, y_test = split_data(X, y)
model = Sequential()


#add model layers
X_train = np.expand_dims(X_train, axis=2)
X_test = np.expand_dims(X_test, axis=2)
n_cols = X_train.shape[1] 
n_steps=X_train.shape[0]
n_outputs=5
epochs=10
batch_size=10

model.add(Conv1D(filters=16, kernel_size=3, activation='relu',input_shape=(n_cols,1)))
model.add(Dropout(0.2))
model.add(Conv1D(filters=16, kernel_size=3, activation='relu'))
model.add(Dropout(0.2))
model.add(Conv1D(filters=32, kernel_size=3, activation='relu'))
# model.add(Conv1D(filters=32, kernel_size=3, activation='relu'))

model.add(MaxPooling1D(pool_size=2))
model.add(Flatten())
model.add(Dense(20, activation='relu'))
model.add(Dropout(0.25))

model.add(Dense(10, activation='relu'))
model.add(Dense(n_outputs, activation='softmax'))

model.compile(loss='sparse_categorical_crossentropy', optimizer='adam', metrics=['accuracy'])

model.fit(X_train,y_train, epochs=50, batch_size=10, verbose=2,validation_data=(X_test, y_test))


scores = model.evaluate(X_test, y_test)



model_json =model.to_json()
with open('sem3.json',"w") as json_file:
    json_file.write(model_json)
model.save_weights("sem3.h5")
# train_and_score(x,y)/