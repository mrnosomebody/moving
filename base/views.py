from django.shortcuts import render, redirect
from django.contrib import messages

from .forms import ApplicationForm


def main(request):
    if request.method == 'POST':
        form = ApplicationForm(request.POST)
        if form.is_valid():
            messages.success(request, "Success")
            return redirect('main')
        else:
            messages.error(request, "Error")
    form = ApplicationForm()
    return render(request, 'main.html', {'form': form})
