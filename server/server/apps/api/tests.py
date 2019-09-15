from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status

from django.contrib.auth import get_user_model

User = get_user_model()


class AccountsTest(APITestCase):
    def setUp(self):
        # We want to go ahead and originally create a user.
        self.test_user = User.objects.create_user('test@example.com', 'testuser', 'testpassword')

        # URL for creating an account.
        self.create_url = reverse('account-create')

    def test_create_user(self):
        print()
        print("-------------------------- test_create_user --------------------------")
        print()

        """
        Ensure we can create a new user and a valid token is created with it.
        """
        data = {
            'email': 'mymail@mail.com',
            'username': 'foobar',
            'password': 'somepassword'
        }

        print()

        print("Posting: {} to {}".format(data, self.create_url))

        response = self.client.post(self.create_url, data, format='json')

        print("Response: {}".format(response.data))

        print()

        # We want to make sure we have two users in the database..
        self.assertEqual(User.objects.count(), 2)

        print("SUCCESS: Two users are present in DB")

        # And that we're returning a 201 created code.
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        print("SUCCESS: Return code is 201")

        # Additionally, we want to return the username and email upon successful creation.
        self.assertEqual(response.data['username'], data['username'])

        print("SUCCESS: Response uername matches request username")

        self.assertFalse('password' in response.data)

        print("SUCCESS: Password is not in response data")
