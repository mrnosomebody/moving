from django import forms
from phonenumber_field.formfields import PhoneNumberField


class ApplicationForm(forms.Form):
    APARTMENT_TYPES = [
        ('Studio', 'Studio'),
        ('1 Bedroom', '1 Bedroom'),
        ('2 Bedroom', '2 Bedroom'),
        ('3 Bedroom', '3 Bedroom'),
        ('House', 'House'),
    ]

    YES_NO = [
        ('Yes', 'Yes'),
        ('No', 'No')
    ]

    name = forms.CharField(max_length=85, label='Full Name')
    email = forms.EmailField(max_length=255, label='Email')
    phone = PhoneNumberField(region='CA', label='Mobile Number')  # Get the phone as a string: client.phone.as_e164
    date = forms.DateField(label='Date')

    address_from = forms.CharField(max_length=255, label='Start address')
    city_from = forms.CharField(label='City')
    zip_from = forms.CharField(label='Zip Code')
    floor_from = forms.IntegerField(label='Floor at PickUp')

    address_to = forms.CharField(max_length=255, label='End address')
    city_to = forms.CharField(label='City')
    zip_to = forms.CharField(label='Zip Code')
    floor_to = forms.IntegerField(label='Floor at DropOff')

    elevator_pickup = forms.ChoiceField(choices=YES_NO, widget=forms.RadioSelect, label='Elevator at PickUp')
    elevator_dropoff = forms.ChoiceField(choices=YES_NO, widget=forms.RadioSelect, label='Elevator at DropOff')
    apart_type = forms.ChoiceField(choices=APARTMENT_TYPES, widget=forms.RadioSelect, label='Apartments type')

