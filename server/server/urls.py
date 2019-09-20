from django.contrib import admin
from django.http import HttpResponseRedirect
from django.urls import path, include

from accounts.views import ApiLoginView, ApiAccountConfirmationView, ApiRegistrationView

urlpatterns = [
    path('', lambda x: HttpResponseRedirect('/admin')),
    path('admin/', admin.site.urls),
    path('accounts/', include('accounts.urls')),
    path('login/', ApiLoginView.as_view(), name='my_custom_login'),
    path('register/', ApiRegistrationView.as_view(), name='my_custom_registration'),
    path('confirm/', ApiAccountConfirmationView.as_view(), name='my-custom_confirmation'),
    path('rest-auth/', include('rest_auth.urls')),
]

admin.autodiscover()
