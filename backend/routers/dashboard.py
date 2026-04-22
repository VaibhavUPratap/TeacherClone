from fastapi import APIRouter

router = APIRouter()


@router.get("/")
def get_dashboard():
    return {
        "total_questions": 120,
        "top_topics": ["Deadlock"],
        "weak_areas": ["Memory"],
    }
