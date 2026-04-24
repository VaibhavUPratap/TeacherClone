from firebase_admin import auth
from fastapi import HTTPException, status


class AuthService:
    """
    Service responsible for verifying Firebase ID tokens.
    The backend NEVER performs login — it only validates tokens issued by Firebase.
    """

    @staticmethod
    def verify_token(id_token: str) -> dict:
        """
        Verifies a Firebase ID token and extracts user identity.

        Args:
            id_token: The raw Firebase ID token from the Authorization header.

        Returns:
            dict with 'uid' and 'email' fields.

        Raises:
            HTTPException 401 if the token is invalid, expired, or revoked.
        """
        try:
            decoded = auth.verify_id_token(id_token, check_revoked=True)
            return {
                "uid": decoded["uid"],
                "email": decoded.get("email", ""),
            }

        except auth.RevokedIdTokenError:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Token has been revoked. Please sign in again.",
                headers={"WWW-Authenticate": "Bearer"},
            )
        except auth.ExpiredIdTokenError:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Token has expired. Please sign in again.",
                headers={"WWW-Authenticate": "Bearer"},
            )
        except auth.InvalidIdTokenError:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid Firebase ID token.",
                headers={"WWW-Authenticate": "Bearer"},
            )
        except Exception as e:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail=f"Token verification failed: {str(e)}",
                headers={"WWW-Authenticate": "Bearer"},
            )


auth_service = AuthService()
