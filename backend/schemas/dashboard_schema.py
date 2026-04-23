from pydantic import BaseModel
from typing import List

class RecentQuestion(BaseModel):
    question: str
    category: str
    time: str

class DashboardStats(BaseModel):
    total_questions: int
    top_topics: List[str]
    weak_areas: List[str]
    recent_questions: List[RecentQuestion]
