from .chat_service import CHAT_HISTORY
from collections import Counter

class DashboardService:
    """Service to handle dashboard analytics logic."""

    @staticmethod
    def get_stats() -> dict:
        """
        Calculates and returns student performance statistics.
        Aggregates data from the live CHAT_HISTORY.
        """
        # Count occurrences of each category
        categories = [item["category"] for item in CHAT_HISTORY if item.get("category")]
        category_counts = Counter(categories)
        
        # Get top 3 topics
        top_topics = [cat for cat, count in category_counts.most_common(3)]
        if not top_topics:
            top_topics = ["No data yet"]

        # For demo purposes, we'll keep weak_areas static or semi-random for now
        # until we have a way to track "correctness" or "confusion"
        weak_areas = ["Topic Analysis Pending"] if not CHAT_HISTORY else ["Specific Area A", "Specific Area B"]

        return {
            "total_questions": len(CHAT_HISTORY),
            "top_topics": top_topics,
            "weak_areas": weak_areas,
            "recent_questions": CHAT_HISTORY[-5:][::-1] # Last 5, most recent first
        }

dashboard_service = DashboardService()
