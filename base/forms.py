from django import forms
from phonenumber_field.formfields import PhoneNumberField


class ApplicationForm(forms.Form):
    name = forms.CharField(max_length=85, label='Full Name')
    email = forms.EmailField(max_length=255, required=False, label='Email')
    phone = PhoneNumberField(region='CA', label='Mobile Number')  # Get the phone as a string: client.phone.as_e164
    date = forms.DateField(label='Date')

    address_from = forms.CharField(max_length=255, label='Start address')
    block_from = forms.IntegerField(label='Block number')
    city_from = forms.CharField(label='City')
    zip_from = forms.CharField(label='Zip Code')

    address_to = forms.CharField(max_length=255, label='End address')
    block_to = forms.IntegerField(label='Block number')
    city_to = forms.CharField(label='City')
    zip_to = forms.CharField(label='Zip Code')

