from fastapi import APIRouter
from schemas.dashboard_schema import DashboardStats
from services.dashboard_service import dashboard_service

router = APIRouter()


@router.get("/", response_model=DashboardStats)
def get_dashboard():
    """
    Returns analytics and stats for the teacher dashboard.
    Delegates to DashboardService.
    """
    return dashboard_service.get_stats()
