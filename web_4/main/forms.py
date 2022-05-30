from .models import News
from django.forms import ModelForm, TextInput, Textarea
from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User


class NewsForm(ModelForm):
    class Meta:
        model = News
        fields = ["title", "text"]
        widgets = {"title": TextInput(attrs={
            'class': 'form-control',
            'placeholder': 'Введите название'
        }),
            "text": Textarea(attrs={
                'class': 'form-control',
                'placeholder': 'Введите описание'
            })
        }


# my form for registration
class NewUserForm(UserCreationForm):
    email = forms.EmailField(required=True)

    class Meta:
        model = User
        fields = ("username", "email", "password1", "password2")

    def save(self, commit=True):
        user = super(NewUserForm, self).save(commit=False)
        user.email = self.cleaned_data['email']
        if commit:
            user.save()
        return user
