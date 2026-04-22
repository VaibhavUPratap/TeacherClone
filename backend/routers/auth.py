from fastapi import APIRouter

router = APIRouter()


@router.post("/login")
def login():
    return {
        "user": {
            "id": "t1",
            "name": "Dr. Sharma",
        },
        "token": "mock-token",
    }


@router.get("/me")
def me():
    return {
        "id": "t1",
        "name": "Dr. Sharma",
    }
