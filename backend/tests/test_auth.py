from tests.conftest import client


TEST_USER = {
    "username": "testuser",
    "email": "test@example.com",
    "password": "password123"
}


def test_register_user():

    response = client.post(
        "/auth/register",
        json=TEST_USER
    )

    assert response.status_code in [200, 400]


def test_login_user():

    response = client.post(
        "/auth/login",
        data={
            "username":
                TEST_USER["email"],
            "password":
                TEST_USER["password"]
        }
    )

    assert response.status_code == 200

    data = response.json()

    assert "access_token" in data
    assert "user_id" in data
    assert "username" in data
