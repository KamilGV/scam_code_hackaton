from typing import Literal, Dict
from pydantic import BaseModel, EmailStr, constr, field_validator

types_question = Literal['choice', 'insertion', 'drag_and_drop']


class TestSchema(BaseModel):
    text: str
    type_question: types_question
    question: str
    answers = list[str] | dict[str, str] | None
    correct_answer = str | dict[str, str]

    @field_validator("correct_answer")
    @classmethod
    def salary_range(cls, v, info: FieldValidationInfo, **kwargs):
        if info.data["type_question"] == 'choice':
            if type(info.data["answers"]) != list or type(info.data["correct_answer"]) != str:
                raise ValueError("Wrong Question")
        elif info.data["type_question"] == 'insertion':
            if not type(info.data["answers"]) is None or type(info.data["correct_answer"]) != str:
                raise ValueError("Wrong Question")
        elif info.data["type_question"] == 'drag_and_drop':
            if not type(info.data["answers"]) is None or type(info.data["correct_answer"]) != dict:
                raise ValueError("Wrong Question")
        else:
            raise ValueError("Wrong type question")
        return v

    model_config = {
        "from_attributes": True,
        "json_schema_extra": {
            "examples": [
                {
                    "text": "Весёлая теория.",
                    "type_question": "choice",
                    "question": "Сколько будет 2+2?",
                    "answers": ["1", "2", "3", "4"],
                    "correct_answer": "2",
                },
                {
                    "text": "Весёлая теория.",
                    "type_question": "insertion",
                    "question": "Сколько будет 2+2?",
                    "correct_answer": "4",
                },
                {
                    "text": "Веселая теория",
                    "type_question": "drag_and_drop",
                    "question": "Соотнесите следующие термины?",
                    "correct_answer": {"2+2": "4", "2+3": "5",
                                       "3+3": "6", "6+34": "40"},
                }
            ]
        }
    }
