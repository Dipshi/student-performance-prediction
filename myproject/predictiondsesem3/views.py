from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
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
from rest_framework.decorators import api_view,permission_classes



sem="xyz"
sys.path.append(os.path.abspath('D:/GitHub/App_student_prediction/ionic3/myproject/model'))

def init(): 
    json_file = open('D:/GitHub/App_student_prediction/ionic3/myproject/model/modeldsesem3.json','r')
# json_file = open('model.json','r')
    loaded_model_json = json_file.read()
    json_file.close()
    loaded_model = model_from_json(loaded_model_json)
    #load woeights into new model
    loaded_model.load_weights("D:/GitHub/App_student_prediction/ionic3/myproject/model/modeldsesem3.h5")
    print("Loaded Model from disk")

    #compile and evaluate loaded model
    loaded_model.compile(loss='sparse_categorical_crossentropy',optimizer='adam',metrics=['accuracy'])
    #loss,accuracy = model.evaluate(X_test,y_test)
    #print('loss:', loss)
    #print('accuracy:', accuracy)
    graph = tf.get_default_graph()

    return loaded_model,graph


# 
if sem=="Sem 5":
    print("hello")
model,graph=init()
# def showDegreeType(sem):
  
@csrf_exempt
@api_view(['GET', 'POST']) 
def prediction(request):
    data = request.data
    # return Response(data=(data))            

    ssc=(float)(data['ssc'])
    hsc=(float)(data['hsc'])
    sem3=(float)(data['sem3'])
    sem4=(float)(data['sem4'])
    gap=data['gap']
    gender=data['gender']
    caste=data['caste']
    add_cat=data['admiss_cat']
    sem=data['semester']
    # showDegreeType(sem)
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

    if sem=='Sem 5':
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

        p=pd.DataFrame([[0,gap,gender,caste,add_cat,ssc,hsc,sem3,sem4]],columns=['','Gap','Gender','Caste','admission_category','10_Result','12_Result','Sem3','Sem4'])
    elif sem=="Sem 4":
        
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
        p=pd.DataFrame([[0,gap,gender,caste,add_cat,ssc,hsc,sem3]],columns=['','Gap','Gender','Caste','admission_category','10_Result','12_Result','Sem3'])

    elif sem=="Sem3":
       
        p=pd.DataFrame([[0,gap,gender,caste,add_cat,ssc,hsc]],columns=['','Gap','Gender','Caste','admission_category','10_Result','12_Result'])
# storing in dataframe
   
    class_le = LabelEncoder()
    for column in p[['Gender','Caste','admission_category']].columns:
        p[column] = class_le.fit_transform(p[column].values)
    p = np.expand_dims(p, axis=2)
    remarks=[]
            # x={'gap':gap,'gender':gender,'caste':caste,'ssc':ssc,'hsc':hsc,'sem1':sem1,'sem2':sem2,'sem3':sem3,'sem4':sem4,'add_cat':add_cat}
    with graph.as_default():
        prediction=model.predict_classes(p)
    if prediction==4:
        prediction='8-10'
        remarks.append("Good to go.")
        remarks.append("Continue good work ahead.")
    elif prediction==3:
        prediction='7-7.9'
        remarks.append("Can do better.")
        remarks.append("Study and work on your weak areas.")
    elif prediction==2:
        prediction='6-6.9'
        remarks.append("Need to work hard.")
        remarks.append("Work harder on your weak areas.")
    elif prediction==1:
        prediction='4-5.9'
        remarks.append("Needs guidance.")
        remarks.append("Work more hard on your weak areas and seek necessary help from teachers.")
    else:
        prediction="less than 4"
        remarks.append("Need special guidance.")
        remarks.append("Need to do a lot of work and studying.")
    data={'prediction':prediction,'remarks':remarks}
    print(data)
    return Response(data=(data))            



def index(request):
    return HttpResponse("index.html")