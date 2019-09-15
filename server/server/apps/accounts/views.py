import json
import time

from allauth.socialaccount.providers.facebook.views import FacebookOAuth2Adapter
from django.core.exceptions import ObjectDoesNotExist
from django.http import HttpResponse
from rest_auth.registration.views import SocialLoginView
from rest_auth.views import LoginView
from rest_framework.exceptions import ValidationError


class FacebookLogin(SocialLoginView):
    adapter_class = FacebookOAuth2Adapter


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
