from fastapi import HTTPException, status
from jose import jwt, JWTError
from config import settings

class AuthService:
    """
    Service responsible for verifying Supabase JWT tokens.
    """

    @staticmethod
    def verify_token(token: str) -> dict:
        """
        Verifies a Supabase JWT token and extracts user identity.
        """
        if not settings.JWT_SECRET:
            raise HTTPException(status_code=500, detail="JWT_SECRET is not configured.")

        try:
            # Supabase tokens are signed with the project's JWT_SECRET using HS256
            # The 'aud' is usually 'authenticated'
            payload = jwt.decode(
                token, 
                settings.JWT_SECRET, 
                algorithms=["HS256"], 
                audience="authenticated"
            )
            
            return {
                "uid": payload.get("sub"), # Subject is the auth.users ID
                "email": payload.get("email", ""),
                "role": payload.get("user_role", "student") # Assuming role is in metadata or app_metadata
            }

        except JWTError as e:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail=f"Invalid or expired Supabase JWT token: {str(e)}",
                headers={"WWW-Authenticate": "Bearer"},
            )
        except Exception as e:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail=f"Token verification failed: {str(e)}",
                headers={"WWW-Authenticate": "Bearer"},
            )

auth_service = AuthService()
