from django import forms
from userRegister.models import userRegister 


class userForm(forms.ModelForm):
    is_special = forms.BooleanField(required=False)

    class Meta(object):
        model = userRegister
        fields = [
             "FirstName", "Email", "Password"
         ]