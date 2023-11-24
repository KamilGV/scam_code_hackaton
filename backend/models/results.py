import datetime

from sqlalchemy.orm import relationship

from db_settings import Base
import sqlalchemy as sa


class Result(Base):
    __tablename__ = "results"

    id = sa.Column(sa.Integer, primary_key=True, autoincrement=True, comment="Идентификатор задачи")
    user_id = sa.Column(sa.Integer, comment="ID пользователя",)
    test_id = sa.Column(sa.Integer, comment="ID теста",)
    created_at = sa.Column(sa.DateTime, comment="Время создания записи", default=datetime.datetime.utcnow)

    jobs = relationship("Job", back_populates="user")
    responses = relationship("Response", back_populates="user")