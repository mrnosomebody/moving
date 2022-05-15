from django.core.mail import send_mail
from django.template.loader import render_to_string

from email_config import EMAIL_HOST_USER, RECIPIENTS


def send_email(data, service):
    subject = 'New Application'
    data['service'] = service
    message = f"name: {data['name']}\n" \
              f"email: {data['email']}\n" \
              f"phone: {data['phone'].as_e164}\n" \
              f"date: {data['date']}\n" \
              f"address_from: {data['address_from']}\n" \
              f"city_from: {data['city_from']}\n" \
              f"zip_from: {data['zip_from']}\n" \
              f"address_to: {data['address_to']}\n" \
              f"city_to: {data['city_to']}\n" \
              f"zip_to: {data['zip_to']}\n" \
              f"floor: {data['floor_from']}\n" \
              f"floor: {data['floor_to']}\n" \
              f"elevator_pickup: {data['elevator_pickup']}\n" \
              f"elevator_dropoff: {data['elevator_dropoff']}\n" \
              f"service: {service}\n"

    if data.get('promocode'):
        f"promocode: {data['promocode']}\n"
    if service == 'Moving':
        message += f"apart_type: {data['apart_type']}\n"
    else:
        message += f"large_items: {data['large_items']}\n" \
                   f"medium_items: {data['medium_items']}\n"

    from_email = EMAIL_HOST_USER
    recipient_list = RECIPIENTS
    html_message = render_to_string('email_message.html', {'data': data})
    send_mail(subject, message, from_email, recipient_list, html_message=html_message)
