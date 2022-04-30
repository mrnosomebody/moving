from captcha_config import SECRET_KEY
import requests


def check_captcha(request):
    is_valid = None
    if request.method == 'POST':
        parameters = {
            'secret': SECRET_KEY,
            'response': request.POST.get('g-recaptcha-response')
        }
        res = requests.post('https://www.google.com/recaptcha/api/siteverify', parameters).json()
        if res['success']:
            is_valid = True
        else:
            is_valid = False
    return is_valid
