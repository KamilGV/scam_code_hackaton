from pydantic import BaseModel, EmailStr


class TokenSchema(BaseModel):
    access_token: str
    token_type: str


class LoginSchema(BaseModel):
    email: EmailStr
    password: str

    model_config = {
        "from_attributes": True,
        "json_schema_extra": {
            "examples": [
                {
                    "email": "name@mail.com",
                    "password": "mypasword123",
                }
            ]
        }
    }