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

print(df.Sem2.value_counts())