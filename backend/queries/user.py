from models import User

from schemas import UserSchema, UserInSchema
from typing import List, Optional
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from core.security import hash_password
from sqlalchemy.orm import selectinload


async def get_all(db: AsyncSession, limit: int = 100, skip: int = 0) -> List[User]:
    query = select(User).limit(limit).offset(skip)
    res = await db.execute(query)
    return res.scalars().all()


async def get_by_id(db: AsyncSession, user_id: int) -> Optional[User]:
    query = select(User).where(User.id == user_id).limit(1)
    res = await db.execute(query)
    return res.scalars().first()


async def create(db: AsyncSession, user_schema: UserInSchema) -> User:
    user = User(
        name=user_schema.name,
        email=user_schema.email,
        hashed_password=hash_password(user_schema.password),
        is_teacher=user_schema.is_teacher
    )
    db.add(user)
    await db.commit()
    await db.refresh(user)
    return user


async def update(db: AsyncSession, user: User) -> User:
    db.add(user)
    await db.commit()
    await db.refresh(user)
    return user


# async def get_by_email(db: AsyncSession, email: str, include_jobs: bool = False) -> User:
#     query = select(User).where(User.email == email).limit(1)
#     if include_jobs:
#         query = query.options(selectinload(User.jobs), selectinload(User.responses))
#     res = await db.execute(query)
#     user = res.scalars().first()
#     return user

async def get_by_email(db: AsyncSession, email: str, is_teacher: bool = False) -> User:
    query = select(User).where(User.email == email).limit(1)
    if is_teacher:
        query = query.options(selectinload(User.is_teacher), selectinload(User.responses))
    res = await db.execute(query)
    user = res.scalars().first()
    return user


async def delete_user(db: AsyncSession, user: User) -> None:
    await db.delete(user)
    await db.commit()