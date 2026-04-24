from pydantic import BaseModel


class FirebaseUser(BaseModel):
    """Schema for a verified Firebase user returned from /auth/me."""
    uid: str
    email: str


# ── Legacy schemas kept for reference ──────────────────────────────────────
# These are no longer used by the auth router but may be referenced elsewhere.

class LoginRequest(BaseModel):
    """[DEPRECATED] Schema for mock login request."""
    email: str


class UserResponse(BaseModel):
    """[DEPRECATED] Schema for basic user details (mock)."""
    id: str
    name: str
    email: str


class LoginResponse(BaseModel):
    """[DEPRECATED] Schema for mock login response including user and token."""
    user: UserResponse
    token: str
