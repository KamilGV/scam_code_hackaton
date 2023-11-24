import datetime

from sqlalchemy.orm import relationship

from db_settings import Base
import sqlalchemy as sa

class Subject(Base):
    __tablename__ = "subjects"

    id = sa.Column(sa.Integer, primary_key=True, autoincrement=True, comment="Идентификатор задачи")
    name = sa.Column(sa.String, comment="Имя пользователя")
    creator_id = sa.Column(sa.Integer, comment="ID создателя")

    jobs = relationship("Job", back_populates="user")
    responses = relationship("Response", back_pop