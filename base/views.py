import smtplib
from django.shortcuts import render, redirect
from django.contrib import messages
from .forms import MovingForm, DeliveryForm
from services.send_application_by_email import send_email
from captcha_config import SITE_KEY
from services.captcha_is_valid import check_captcha


def main(request):
    return render(request, 'main.html')


def moving(request):
    form = MovingForm()

    if request.method == 'POST':
        form = MovingForm(request.POST)
        if form.is_valid():
            data = form.cleaned_data
            captcha_is_valid = check_captcha(request)
            if captcha_is_valid:
                try:
                    send_email(data, 'Moving')
                    messages.success(request, "Success")
                    return redirect('moving')
                except smtplib.SMTPException:
                    messages.error(request, "Server error occurred, we didn't get your application")
            else:
                messages.error(request, "Invalid Captcha, try again, please")
        else:
            messages.error(request, "Error")

    return render(request, 'moving.html', {'form': form, 'captcha_key': SITE_KEY})


def delivery(request):
    form = DeliveryForm()

    if request.method == 'POST':
        form = DeliveryForm(request.POST)
        if form.is_valid():
            data = form.cleaned_data
            captcha_is_valid = check_captcha(request)
            if captcha_is_valid:
                try:
                    send_email(data, 'Delivery')
                    messages.success(request, "Success")
                    return redirect('delivery')
                except smtplib.SMTPException:
                    messages.error(request, "Server error occurred, we didn't get your application")
            else:
                messages.error(request, "Invalid Captcha, try again, please")
        else:
            messages.error(request, "Error")

    return render(request, 'delivery.html', {'form': form, 'captcha_key': SITE_KEY})
