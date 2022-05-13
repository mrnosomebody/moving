import smtplib
from django.shortcuts import render, redirect
from django.contrib import messages
from .forms import ApplicationForm
from services.send_application_by_email import send_email
from captcha_config import SITE_KEY
from services.captcha_is_valid import check_captcha


def main(request):
    return render(request, 'main.html')


def moving(request):
    form = ApplicationForm()

    if request.method == 'POST':
        form = ApplicationForm(request.POST)
        if form.is_valid():
            data = form.cleaned_data
            captcha_is_valid = check_captcha(request)
            if captcha_is_valid:
                try:
                    send_email(data)
                    messages.success(request, "Success")
                    return redirect('main')
                except smtplib.SMTPException:
                    messages.error(request, "Server error occurred, we didn't get your application")
            else:
                messages.error(request, "Invalid Captcha, try again, please")
        else:
            messages.error(request, "Error")

    return render(request, 'moving.html', {'form': form, 'captcha_key': SITE_KEY})


def delivery(request):
    pass
