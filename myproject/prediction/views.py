from django.shortcuts import render

# Create your views here.
from django.shortcuts import render,redirect
from django.http import HttpResponseRedirect
# Create your views here.
from django.http import HttpResponse
from django.views.generic import TemplateView
from django.views.decorators.csrf import csrf_protect
import keras
import keras.models
import os
import sys
import pandas as pd
import numpy as np
from keras.models import Sequential
from sklearn.preprocessing import LabelEncoder
from keras.models import model_from_json
import tensorflow  as tf
from django.contrib.auth.models import User
from rest_framework.response import Response



sys.path.append(os.path.abspath('C:/Users/Dipshi/Desktop/Ionic/database/website/model'))

def init(): 
    json_file = open('C:/Users/Dipshi/Desktop/Ionic/database/website/model/modeldse.json','r')
    # json_file = open('model.json','r')
    loaded_model_json = json_file.read()
    json_file.close()
    loaded_model = model_from_json(loaded_model_json)
    #load woeights into new model
    loaded_model.load_weights("C:/Users/Dipshi/Desktop/Ionic/database/website/model/modeldse.h5")
    print("Loaded Model from disk")

    #compile and evaluate loaded model
    loaded_model.compile(loss='sparse_categorical_crossentropy',optimizer='adam',metrics=['accuracy'])
    #loss,accuracy = model.evaluate(X_test,y_test)
    #print('loss:', loss)
    #print('accuracy:', accuracy)
    graph = tf.get_default_graph()

    return loaded_model,graph

model,graph=init()

@api_view(['GET', 'POST']) 

def prediction(request):
    data = request.data
    # return Response(data=(data))            

    ssc=(float)(data['ssc'])
    hsc=(float)(data['hsc'])
    sem1=(float)(data['sem1'])
    sem2=(float)(data['sem2'])
    sem3=(float)(data['sem3'])
    sem4=(float)(data['sem4'])
    gap=data['gap']
    gender=data['gender']
    caste=data['caste']
    add_cat=data['admiss_cat']
    # conversion
    if ssc>=80:
        ssc=4
    elif ssc>=70:
        ssc=3
    elif ssc>=60:
        ssc=2
    elif ssc>=40:
        ssc=1
    else :
        ssc=0
    if hsc>=80:
        hsc=4
    elif hsc>=70:
        hsc=3
    elif hsc>=60:
        hsc=2
    elif hsc>=40:
        hsc=1
    else :
        hsc=0 
# sem conversion
   
    if sem3>=8:
        sem3 = 4
    elif sem3 >=7:
        sem3 = 3
    elif sem3 >=6:
        sem3 = 2
    elif sem3 >=4:
        sem3 = 1
    else :
        sem3=0

    if sem4>=8:
        sem4 = 4
    elif sem4 >=7:
        sem4 = 3
    elif sem4 >=6:
        sem4 = 2
    elif sem4 >=4:
        sem4 = 1
    else :
        sem4=0
# storing in dataframe
    p=pd.DataFrame([[0,gap,gender,caste,add_cat,ssc,hsc,sem3,sem4]],columns=['','Gap','Gender','Caste','admission_category','10_Result','12_Result','Sem3','Sem4'])
            
    class_le = LabelEncoder()
    for column in p[['Gender','Caste','admission_category']].columns:
        p[column] = class_le.fit_transform(p[column].values)
    p = np.expand_dims(p, axis=2)

            # x={'gap':gap,'gender':gender,'caste':caste,'ssc':ssc,'hsc':hsc,'sem1':sem1,'sem2':sem2,'sem3':sem3,'sem4':sem4,'add_cat':add_cat}
    with graph.as_default():
        prediction=model.predict_classes(p)
    if prediction==4:
        prediction='8-10'
    elif prediction==3:
        prediction='7-7.9'
    elif prediction==2:
        prediction='6-6.9'
    elif prediction==1:
        prediction='4-5.9'
    else:
        prediction="less than 4"
    data={'prediction':prediction}
return Response(data=(data))            


