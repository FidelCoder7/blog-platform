from tests.conftest import client


def test_register_user():

    response = client.post(
        "/auth/register",
        json={
            "username":
                "testuser5",
            "email":
                "test5@example.com",
            "password":
                "password123"
        }
    )

    assert response.status_code == 200


def test_login_user():

    response = client.post(
        "/auth/login",
        data={
            "username":
                "test5@example.com",
            "password":
                "password123"
        }
    )

    assert response.status_code == 200

    data = response.json()

    assert "access_token" in data
    