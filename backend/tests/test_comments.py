from tests.conftest import client

def test_get_comments():

    response = client.get(
        "/comments/posts/1"
    )

    assert response.status_code == 200
