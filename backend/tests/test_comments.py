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


def test_create_comment():

    token = get_token()

    response = client.post(
        "/comments/posts/1",
        json={
            "content":
                "Test comment"
        },
        headers={
            "Authorization":
                f"Bearer {token}"
        }
    )

    assert response.status_code in [
        200,
        404
    ]


def test_get_comments():

    response = client.get(
        "/comments/posts/1"
    )

    assert response.status_code == 200
    