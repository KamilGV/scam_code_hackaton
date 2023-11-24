from models import User

from schemas import SubjectSchema, SubjectInSchema
from typing import List, Optional
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from core.security import hash_password
from sqlalchemy.orm import selectinload


async def get_all(db: AsyncSession, limit: int = 100, skip: int = 0) -> List[SubjectSchema]:
    query = select(SubjectSchema).limit(limit).offset(skip)
    res = await db.execute(query)
    return res.scalars().all()


async def get_by_id(db: AsyncSession, subject_id: int) -> Optional[SubjectSchema]:
    query = select(User).where(SubjectSchema.id == subject_id).limit(1)
    res = await db.execute(query)
    return res.scalars().first()


async def create(db: AsyncSession, subject_schema: SubjectInSchema) -> SubjectSchema:
    subject = SubjectSchema(
        name=subject_schema.name
    )
    db.add(subject)
    await db.commit()
    await db.refresh(subject)
    return subject


async def update(db: AsyncSession, subject: SubjectSchema) -> SubjectSchema:
    db.add(subject)
    await db.commit()
    await db.refresh(subject)
    return subject


async def delete_subject(db: AsyncSession, subject: SubjectSchema) -> None:
    await db.delete(subject)
    await db.commit()