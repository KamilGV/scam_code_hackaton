import datetime

from sqlalchemy.orm import relationship

from db_settings import Base
import sqlalchemy as sa


class Question(Base):
    __tablename__ = "questions"

    id = sa.Column(sa.Integer, primary_key=True, autoincrement=True, comment="Идентификатор задачи")
    text = sa.Column(sa.String, comment="Текст теории")
    question = sa.Column(sa.String, comment="Текст вопроса")
    type_question = sa.Column(sa.Integer, comment="Тип вопроса")
    answer = sa.Column(sa.JSON, comment="Ответы к вопросу")
    test_id = sa.Column(sa.Integer, comment="ID теста")
    created_at = sa.Column(sa.DateTime, comment="Время создания записи", default=datetime.datetime.utcnow)

    jobs = relationship("Job", back_populates="user")
    responses = relationship("Response", back_populates="user")