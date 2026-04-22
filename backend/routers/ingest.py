from fastapi import APIRouter

router = APIRouter()


@router.post("/file")
def upload_file():
    return {
        "file_id": "f1",
        "status": "processing",
    }


@router.get("/status/{id}")
def status(id: str):
    return {
        "file_id": "f1",
        "status": "completed",
    }
