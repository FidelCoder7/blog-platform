from tests.conftest import client


def get_token():

    response = client.post(
        "/auth/login",
        data={
            "username":
                "test@example.com",
            "password":
                "password123"
        }
    )

    return response.json()[
        "access_token"
    ]


def test_create_post_without_token():

    response = client.post(
        "/posts/",
        json={
            "title": "Unauthorized",
            "content": "Should fail"
        }
    )

    assert response.status_code == 401


def test_create_comment_without_token():

    response = client.post(
        "/comments/posts/1",
        json={
            "content": "Unauthorized"
        }
    )

    assert response.status_code == 401
    