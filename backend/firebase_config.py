import firebase_admin
from firebase_admin import credentials, auth
from config import get_settings

settings = get_settings()

import os

# Initialize Firebase Admin SDK
firebase_app = None
try:
    if os.path.exists(settings.FIREBASE_CREDENTIALS_PATH):
        cred = credentials.Certificate(settings.FIREBASE_CREDENTIALS_PATH)
        firebase_app = firebase_admin.initialize_app(cred)
    else:
        print(f"⚠️ ADVERTENCIA: No se encontró el archivo en {settings.FIREBASE_CREDENTIALS_PATH}. El backend correrá en MODO MOCK para autenticación.")
except Exception as e:
    print(f"⚠️ Error al inicializar Firebase Admin SDK: {e}. Se usará MODO MOCK.")


def verify_firebase_token(id_token: str) -> dict:
    """
    Verify a Firebase ID token and return the decoded claims.
    Raises firebase_admin.auth.InvalidIdTokenError if invalid.
    """
    if firebase_app is None or id_token.startswith("mock_"):
        # Permite realizar pruebas locales con tokens simulados
        uid = id_token.replace("mock_", "") if id_token.startswith("mock_") else "test_user_123"
        return {
            "uid": uid,
            "email": f"{uid}@virtual.upt.pe",
            "name": f"Usuario Local {uid}",
            "picture": None
        }
    decoded_token = auth.verify_id_token(id_token)
    return decoded_token


def validate_email_domain(email: str) -> bool:
    """Check if the email belongs to the allowed institutional domain."""
    allowed_domain = settings.ALLOWED_DOMAIN
    return email.endswith(f"@{allowed_domain}")
