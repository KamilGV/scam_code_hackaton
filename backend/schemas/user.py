import datetime
from typing import Optional

from pydantic import BaseModel, EmailStr, constr, field_validator


class UserSchema(BaseModel):

    id: Optional[int] = None
    name: str
    email: EmailStr
    hashed_password: str
    is_teacher: bool
    created_at: datetime.datetime

    model_config = {
        "from_attributes": True,
        "json_schema_extra": {
            "examples": [
                {
                    "id": 124,
                    "name": "Иван Иванов",
                    "email": "ivanivanov@mail.com",
                    "hashed_password": "3Ifjkdj99uFUKJ39je9JF8dkikKFu7e8Jfi0s",
                    "is_teacher": False,
                    "created_at": "2023-10-20T06:17:38.670Z",
                }
            ]
        }
    }


class UserUpdateSchema(BaseModel):
    name: Optional[str] = None
    email: Optional[EmailStr] = None

    model_config = {
        "from_attributes": True,
        "json_schema_extra": {
            "examples": [
                {
                    "name": "Иван Иванов",
                    "email": "ivanivanov@mail.com",
                }
            ]
        }
    }


class UserInSchema(BaseModel):
    name: str
    email: EmailStr
    password: constr(min_length=8)
    password2: str
    is_teacher: bool = False

    @field_validator("password2")
    @classmethod
    def password_match(cls, v, info: FieldValidationInfo, **kwargs):
        if 'password' in info.data and v != info.data["password"]:
            raise ValueError("Пароли не совпадают!")
        return info.data["password"]

    model_config = {
        "from_attributes": True,
        "json_schema_extra": {
            "examples": [
                {
                    "name": "Иван Иванов",
                    "email": "ivanivanov@mail.com",
                    "password": "mypasword123",
                    "password2": "mypasword123",
                    "is_teacher": False,
                }
            ]
        }
    }
