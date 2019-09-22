import json
import os
import urllib.parse

from allauth.account.models import EmailAddress
from django.contrib.auth import get_user_model
from django.core.exceptions import ObjectDoesNotExist
from django.http import HttpResponse
from django.template.loader import render_to_string
from django.utils.encoding import force_bytes, force_text
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from rest_auth.app_settings import create_token
from rest_auth.models import TokenModel
from rest_auth.registration.app_settings import register_permission_classes
from rest_auth.serializers import TokenSerializer
from rest_auth.views import LoginView
from rest_framework.exceptions import ValidationError
from rest_framework.generics import CreateAPIView, GenericAPIView
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail

from accounts.serializers import RegisterSerializer, ConfirmationSerializer
from accounts.tokens import account_activation_token
from server import settings

UserModel = get_user_model()


def create_empty_response():
    return HttpResponse(json.dumps({}), content_type='application/json')


def create_validation_error_response(e):
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


def create_error_response(message):
    return HttpResponse(json.dumps({
        "status": "error",
        "type": "generic_error",
        "info": message
    }), content_type='application/json')


def create_object_does_not_exist_response(e):
    response_data = {
        "status": "error",
        "type": "db_error",
        "info": e.args[0]
    }

    return HttpResponse(json.dumps(response_data), content_type='application/json')


class ApiRegistrationView(CreateAPIView):
    serializer_class = RegisterSerializer
    permission_classes = register_permission_classes()
    token_model = TokenModel

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
            self.perform_create(serializer)
            self.get_success_headers(serializer.data)
            return HttpResponse(json.dumps({}), content_type='application/json')
        except ValidationError as e:
            return create_validation_error_response(e)

    def get_response_data(self, user):
        return TokenSerializer(user.auth_token).data

    def send_activation_email(self, user, serializer):

        create_token(self.token_model, user, serializer)

        token = account_activation_token.make_token(user)

        params = {'uid': urlsafe_base64_encode(force_bytes(user.pk)), 'token': token}

        confirmation_link = settings.FRONTEND_URL + "/#/confirm?" + urllib.parse.urlencode(params)

        context = {
            'username': user.username,
            'confirmation_link': confirmation_link,
            'service_name': "DummyService"
        }

        message = Mail(
            from_email='krzysiekkucharski7@gmail.com',
            to_emails=user.email,
            subject='Thank you for registration',
            html_content=render_to_string("account/email/confirmation_mail.html", context)
        )
        try:
            sg = SendGridAPIClient(os.environ.get('SENDGRID_API_KEY'))
            response = sg.send(message)
            print(response.status_code)
            print(response.body)
            print(response.headers)
        except Exception as e:
            print(e)

    def perform_create(self, serializer):
        if settings.BYPASS_ACCOUNT_REGISTRATION:
            return None

        user = serializer.save(self.request)

        if settings.SEND_ACCOUNT_ACTIVATION_EMAIL:
            self.send_activation_email(user, serializer)
        else:
            # Activate immediately
            email_verify_obj = EmailAddress.objects.get(user=user)
            email_verify_obj.verified = True
            email_verify_obj.save()

        return user


class ApiLoginView(LoginView):
    def post(self, request, *args, **kwargs):
        self.request = request
        self.serializer = self.get_serializer(data=self.request.data, context={'request': request})
        try:
            self.serializer.is_valid(raise_exception=True)
            self.login()
            return self.get_response()
        except ValidationError as e:
            return create_validation_error_response(e)

        except ObjectDoesNotExist as e:
            return create_object_does_not_exist_response


class ApiAccountConfirmationView(GenericAPIView):

    def confirm(self):
        self.confirmation_token = self.serializer.validated_data['token']
        self.confirmation_uid = self.serializer.validated_data['uid']

        try:
            uid = force_text(urlsafe_base64_decode(self.confirmation_uid))
            user = UserModel.objects.get(pk=uid)
        except(TypeError, ValueError, OverflowError, UserModel.DoesNotExist) as e:
            return False

        token_valid = account_activation_token.check_token(user, self.confirmation_token)

        if token_valid:
            user.is_active = True
            user.save()

            email_verify_obj = EmailAddress.objects.get(user=user)
            email_verify_obj.verified = True
            email_verify_obj.save()

            return True
        else:
            return False

    def post(self, request):

        self.request = request

        self.serializer = ConfirmationSerializer(data=self.request.data, context={'request': request})

        try:
            self.serializer.is_valid(raise_exception=True)

            status = self.confirm()

            if not status:
                return create_error_response("Error confirming account.")
            else:
                return create_empty_response()

        except ValidationError as e:
            return create_validation_error_response(e)
