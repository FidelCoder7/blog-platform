from tests.conftest import client


def get_token():

    login = client.post(
        "/auth/login",
        data={
            "username":
                "test@example.com",
            "password":
                "password123"
        }
    )

    return login.json()[
        "access_token"
    ]


def test_create_post():

    token = get_token()

    response = client.post(
        "/posts/",
        json={
            "title":
                "Testing Post",
            "content":
                "Testing Content"
        },
        headers={
            "Authorization":
                f"Bearer {token}"
        }
    )

    assert response.status_code == 200


def test_get_posts():

    response = client.get(
        "/posts/"
    )

    assert response.status_code == 200
    