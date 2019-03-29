from django import forms 

class HomeForm(forms.Form):
    gap=forms.CharField(label='gap')
    gender=forms.CharField(label='gender')
    caste=forms.CharField(label='caste')
    ssc=forms.CharField(label='ssc')
    hsc=forms.CharField(label='hsc')
    sem1=forms.CharField(label='sem1')
    sem2=forms.CharField(label='sem2')
    sem3=forms.CharField(label='sem3')
    sem4=forms.CharField(label='sem4')
    add_category=forms.CharField(label="add_category")
    # sem5=forms.CharField(label='sem5')


    
    
        