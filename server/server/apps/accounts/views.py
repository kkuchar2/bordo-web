import json
import os

from allauth.socialaccount.providers.facebook.views import FacebookOAuth2Adapter
from django.core.exceptions import ObjectDoesNotExist
from django.http import HttpResponse
from django.template.loader import render_to_string
from rest_auth.app_settings import create_token
from rest_auth.models import TokenModel
from rest_auth.registration.app_settings import register_permission_classes
from rest_auth.registration.views import SocialLoginView
from rest_auth.serializers import TokenSerializer
from rest_auth.views import LoginView
from rest_framework.exceptions import ValidationError
from rest_framework.generics import CreateAPIView

from accounts.serializers import RegisterSerializer


class FacebookLogin(SocialLoginView):
    adapter_class = FacebookOAuth2Adapter


class CustomRegistrationView(CreateAPIView):
    serializer_class = RegisterSerializer
    permission_classes = register_permission_classes()
    token_model = TokenModel

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
            user = self.perform_create(serializer)
            headers = self.get_success_headers(serializer.data)
            return HttpResponse(json.dumps({}), content_type='application/json')
        except ValidationError as e:
            response_data = {
                "status": "error",
                "type": "validation_error",
                "info": {}
            }

            for key, value in e.detail.items():
                error_detail = value
                code = error_detail[0].code
                response_data["info"][key] = {
                    'status': 'error',
                    'key': key,
                    'code': code
                }

            return HttpResponse(json.dumps(response_data), content_type='application/json')

    def get_response_data(self, user):
        return TokenSerializer(user.auth_token).data

    def perform_create(self, serializer):
        print("Creating user...")

        user = serializer.save(self.request)
        create_token(self.token_model, user, serializer)

        from sendgrid import SendGridAPIClient
        from sendgrid.helpers.mail import Mail

        message = Mail(
            from_email='krzysiekkucharski7@gmail.com',
            to_emails=user.email,
            subject='Thank you for registration',
            html_content=render_to_string("account/email/confirmation_mail.html", {})
        )
        try:
            sg = SendGridAPIClient(os.environ.get('SENDGRID_API_KEY'))
            response = sg.send(message)
            print(response.status_code)
            print(response.body)
            print(response.headers)
        except Exception as e:
            print(e)

        return user


class CustomLoginView(LoginView):
    def post(self, request, *args, **kwargs):
        self.request = request
        self.serializer = self.get_serializer(data=self.request.data, context={'request': request})
        try:
            self.serializer.is_valid(raise_exception=True)
            self.login()
            return self.get_response()
        except ValidationError as e:

            response_data = {
                "status": "error",
                "type": "validation_error",
                "info": {}
            }

            for key, value in e.detail.items():
                error_detail = value
                code = error_detail[0].code
                response_data["info"][key] = {
                    'status': 'error',
                    'key': key,
                    'code': code
                }

            return HttpResponse(json.dumps(response_data), content_type='application/json')

        except ObjectDoesNotExist as e:
            response_data = {
                "status": "error",
                "type": "db_error",
                "info": e.args[0]
            }

            return HttpResponse(json.dumps(response_data), content_type='application/json')
