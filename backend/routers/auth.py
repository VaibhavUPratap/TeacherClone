from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

from schemas.auth_schema import FirebaseUser
from services.auth_service import auth_service

router = APIRouter()
_bearer_scheme = HTTPBearer()


# ---------------------------------------------------------------------------
# Reusable dependency — inject with Depends(get_current_user) on any route
# ---------------------------------------------------------------------------

def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(_bearer_scheme),
) -> FirebaseUser:
    """
    FastAPI dependency that extracts and verifies the Firebase ID token
    from the 'Authorization: Bearer <token>' header.

    Usage:
        @router.get("/protected")
        def protected(user: FirebaseUser = Depends(get_current_user)):
            return {"message": f"Hello, {user.email}"}
    """
    token = credentials.credentials
    user_data = auth_service.verify_token(token)
    return FirebaseUser(**user_data)


# ---------------------------------------------------------------------------
# Routes
# ---------------------------------------------------------------------------

@router.get("/me", response_model=FirebaseUser)
def me(current_user: FirebaseUser = Depends(get_current_user)):
    """
    Returns the identity of the currently authenticated Firebase user.

    Requires:
        Authorization: Bearer <Firebase ID Token>

    Returns:
        { "uid": "...", "email": "..." }
    """
    return current_user
