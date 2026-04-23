from fastapi import APIRouter, UploadFile, File
from ..schemas.ingest_schema import IngestResponse, StatusResponse
from ..services.ingest_service import ingest_service

router = APIRouter()


@router.post("/file", response_model=IngestResponse)
def upload_file(file: UploadFile = File(...)):
    """
    Simulates file upload and processing.
    Delegates logic to IngestService.
    """
    return ingest_service.process_file(file.filename)


@router.get("/status/{id}", response_model=StatusResponse)
def status(id: str):
    """
    Provides the status of a specific file ingestion.
    """
    return ingest_service.get_ingestion_status(id)
