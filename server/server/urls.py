from django.contrib import admin
from django.http import HttpResponseRedirect
from django.urls import path, include

from accounts.views import FacebookLogin, CustomLoginView, CustomRegistrationView

urlpatterns = [
    path('', lambda x: HttpResponseRedirect('/admin')),
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
    path('accounts/', include('accounts.urls')),
    path('login/', CustomLoginView.as_view(),  name='my_custom_login'),
    path('rest-auth/', include('rest_auth.urls')),
    path('register/', CustomRegistrationView.as_view(),  name='my_custom_registration'),
    path('rest-auth/facebook/', FacebookLogin.as_view(), name='fb_login'),
]

admin.autodiscover()
