from typing import Optional
from pydantic import BaseModel, EmailStr, constr, field_validator


class SubjectSchema(BaseModel):
    id: Optional[int] = None,
    name: str


class SubjectInSchema(BaseModel):
    name: str
