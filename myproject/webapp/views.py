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




sys.path.append(os.path.abspath('C:/xampp/htdocs/Ionic/ionic3/myproject/model'))

def init(): 
    json_file = open('C:/xampp/htdocs/Ionic/ionic3/myproject/model/model.json','r')
    # json_file = open('model.json','r')
    loaded_model_json = json_file.read()
    json_file.close()
    loaded_model = model_from_json(loaded_model_json)
    #load woeights into new model
    loaded_model.load_weights("C:/xampp/htdocs/Ionic/ionic3/myproject/model/model.h5")
    print("Loaded Model from disk")

    #compile and evaluate loaded model
    loaded_model.compile(loss='sparse_categorical_crossentropy',optimizer='adam',metrics=['accuracy'])
    #loss,accuracy = model.evaluate(X_test,y_test)
    #print('loss:', loss)
    #print('accuracy:', accuracy)
    graph = tf.get_default_graph()

    return loaded_model,graph

def initsem2(): 
    json_file = open('C:/xampp/htdocs/Ionic/ionic3/myproject/model/sem2.json','r')
    # json_file = open('model.json','r')
    loaded_model_json = json_file.read()
    json_file.close()
    loaded_model = model_from_json(loaded_model_json)
    #load woeights into new model
    loaded_model.load_weights("C:/xampp/htdocs/Ionic/ionic3/myproject/model/sem2.h5")
    print("Loaded Model from disk")

    #compile and evaluate loaded model
    loaded_model.compile(loss='sparse_categorical_crossentropy',optimizer='adam',metrics=['accuracy'])
    #loss,accuracy = model.evaluate(X_test,y_test)
    #print('loss:', loss)
    #print('accuracy:', accuracy)
    graph1 = tf.get_default_graph()

    return loaded_model,graph1

def initsem3(): 
    json_file = open('C:/xampp/htdocs/Ionic/ionic3/myproject/model/sem3.json','r')
    # json_file = open('model.json','r')
    loaded_model_json = json_file.read()
    json_file.close()
    loaded_model = model_from_json(loaded_model_json)
    #load woeights into new model
    loaded_model.load_weights("C:/xampp/htdocs/Ionic/ionic3/myproject/model/sem3.h5")
    print("Loaded Model from disk")

    #compile and evaluate loaded model
    loaded_model.compile(loss='sparse_categorical_crossentropy',optimizer='adam',metrics=['accuracy'])
    #loss,accuracy = model.evaluate(X_test,y_test)
    #print('loss:', loss)
    #print('accuracy:', accuracy)
    graph2 = tf.get_default_graph()

    return loaded_model,graph2

def initsem4(): 
    json_file = open('C:/xampp/htdocs/Ionic/ionic3/myproject/model/sem4.json','r')
    # json_file = open('model.json','r')
    loaded_model_json = json_file.read()
    json_file.close()
    loaded_model = model_from_json(loaded_model_json)
    #load woeights into new model
    loaded_model.load_weights("C:/xampp/htdocs/Ionic/ionic3/myproject/model/sem4.h5")
    print("Loaded Model from disk")

    #compile and evaluate loaded model
    loaded_model.compile(loss='sparse_categorical_crossentropy',optimizer='adam',metrics=['accuracy'])
    #loss,accuracy = model.evaluate(X_test,y_test)
    #print('loss:', loss)
    #print('accuracy:', accuracy)
    graph3 = tf.get_default_graph()

    return loaded_model,graph3


model1,graph1=initsem2()
model2,graph2=initsem3()
model3,graph3=initsem3()

model,graph=init()
# @csrf_exempt
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
    if sem1>=8:
        sem1 = 4
    elif sem1 >=7:
        sem1 = 3
    elif sem1 >=6:
        sem1 = 2
    elif sem1 >=4:
        sem1 = 1
    else :
        sem1=0

    if sem2>=8:
        sem2 = 4
    elif sem2 >=7:
        sem2 = 3
    elif sem2 >=6:
        sem2= 2
    elif sem2 >=4:
        sem2 = 1
    else :
        sem2=0
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
    p=pd.DataFrame([[0,gap,gender,caste,add_cat,ssc,hsc,sem1,sem2,sem3,sem4]],columns=['','Gap','Gender','Caste','admission_category','10_Result','12_Result','Sem1','Sem2','Sem3','Sem4'])
            
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
    return Response(data=(data))            


def conversion(data):
    # data=request.data
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
    if sem1>=8:
        sem1 = 4
    elif sem1 >=7:
        sem1 = 3
    elif sem1 >=6:
        sem1 = 2
    elif sem1 >=4:
        sem1 = 1
    else :
        sem1=0

    if sem2>=8:
        sem2 = 4
    elif sem2 >=7:
        sem2 = 3
    elif sem2 >=6:
        sem2= 2
    elif sem2 >=4:
        sem2 = 1
    else :
        sem2=0
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
    marks={'ssc':ssc,'hsc':hsc,'sem1':sem1,'sem2':sem2,'sem3':sem3,'sem4':sem4,'caste':data['caste'],'gap':data['gap'],'gender':data['gender'],'add_cat':add_cat}
    # return Response(data=(marks))
    return marks

@api_view(['GET', 'POST']) 

def sem2(data):
    # data=request.data
    m=conversion(data)
    p=pd.DataFrame([[0,m['gap'],m['gender'],m['caste'],m['add_cat'],m['ssc'],m['hsc'],m['sem1']]],columns=['','Gap','Gender','Caste','admission_category','10_Result','12_Result','Sem1'])
            
    class_le = LabelEncoder()
    for column in p[['Gender','Caste','admission_category']].columns:
        p[column] = class_le.fit_transform(p[column].values)
    p = np.expand_dims(p, axis=2)
    with graph1.as_default():
        prediction=model1.predict_classes(p)
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
    # return Response(data=(data))     
    return prediction


def sem3(data):
    m=conversion(data)
    p=pd.DataFrame([[0,data['gap'],data['gender'],data['caste'],data['add_cat'],m['ssc'],m['hsc'],m['sem1'],m['sem2']]],columns=['','Gap','Gender','Caste','admission_category','10_Result','12_Result','Sem1','Sem2'])
            
    class_le = LabelEncoder()
    for column in p[['Gender','Caste','admission_category']].columns:
        p[column] = class_le.fit_transform(p[column].values)
    p = np.expand_dims(p, axis=2)
    with graph2.as_default():
        prediction=model2.predict_classes(p)
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


    
def sem4(data):
    m=conversion(data)
    p=pd.DataFrame([[0,data['gap'],data['gender'],data['caste'],data['add_cat'],m['ssc'],m['hsc'],m['sem1'],m['sem2'],m['sem3']]],columns=['','Gap','Gender','Caste','admission_category','10_Result','12_Result','Sem1','Sem2','Sem3'])
            
    class_le = LabelEncoder()
    for column in p[['Gender','Caste','admission_category']].columns:
        p[column] = class_le.fit_transform(p[column].values)
    p = np.expand_dims(p, axis=2)
    with graph3.as_default():
        prediction=model3.predict_classes(p)
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

@api_view(['GET', 'POST']) 
def getdata(request):
    data = request.data
    if float(data['sem2'])==0:
        # print(data['sem2'])
        result=sem2(data)
    elif float(data['sem3'])==0:
        result=sem3(data)
    else :
        result=sem4(data)
    
    return Response({'prediction':result})
 