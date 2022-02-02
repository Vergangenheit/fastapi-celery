import pytest
from starlette.testclient import TestClient
from typing import Generator, Any

from main import app

@pytest.fixture(scope="module")
def test_app() -> Generator[TestClient, Any, Any]:
    client = TestClient(app)
    yield client