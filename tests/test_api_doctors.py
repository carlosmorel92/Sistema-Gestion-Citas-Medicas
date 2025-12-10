import requests

API = 'http://localhost:4000/api'

def test_get_doctors():
    r = requests.get(f"{API}/doctors")
    assert r.status_code == 200
    assert isinstance(r.json(), list)
