import smtplib
from django.shortcuts import render, redirect
from django.contrib import messages
from .forms import ApplicationForm
from services.send_application_by_email import send_email


def main(request):
    if request.method == 'POST':
        form = ApplicationForm(request.POST)
        if form.is_valid():
            data = form.cleaned_data
            try:
                send_email(data)
                messages.success(request, "Success")
                return redirect('main')
            except smtplib.SMTPException:
                messages.error(request, "Error")
        else:
            messages.error(request, "Error")
    form = ApplicationForm()
    return render(request, 'main.html', {'form': form})
