from typing import Optional
from pydantic import BaseModel, EmailStr, constr, field_validator


class ResultSchema(BaseModel):
    id: Optional[int] = None
    test_id: int
    user_id: int
    result: int #0-100


