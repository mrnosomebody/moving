from django import forms
from phonenumber_field.formfields import PhoneNumberField


class ApplicationForm(forms.Form):
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

    promocode = forms.CharField(max_length=255, label='Promocode', required=False)


class MovingForm(ApplicationForm):
    APARTMENT_TYPES = [
        ('Studio', 'Studio'),
        ('1 Bedroom', '1 Bedroom'),
        ('2 Bedroom', '2 Bedroom'),
        ('3 Bedroom', '3 Bedroom'),
        ('House', 'House'),
    ]

    apart_type = forms.ChoiceField(choices=APARTMENT_TYPES, widget=forms.RadioSelect, label='Apartments type')


class DeliveryForm(ApplicationForm):
    COUNT = [
        (0, 0),
        (1, 1),
        (2, 2),
        (3, 3),
        (4, 4),
        (5, 5),
        (6, 6),
        (7, 7),
        (8, 8),
        (9, 9)
    ]

    large_items = forms.ChoiceField(choices=COUNT, label='Large Items')
    medium_items = forms.ChoiceField(choices=COUNT, label='Medium Items')
