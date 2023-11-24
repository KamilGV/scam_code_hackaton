from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from dependencies import get_db, get_current_user
from typing import List
from queries import job as job_queries, response as response_queries
from schemas import TestSchema, TestInSchema
from models import Job, User


router = APIRouter(prefix="/test", tags=["test"])


@router.get("", response_model=TestSchema)
async def read_test(
        test_id: int,
        db: AsyncSession = Depends(get_db)):
    return await test_queries.get_test(db=db, test_id=test_id)

@router.post("")
async def create_job(
        test: TestInSchema,
        db: AsyncSession = Depends(get_db),
        current_user: User = Depends(get_current_user)):
    if not current_user.is_teacher:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Unauthorized access")

    new_job = await job_queries.create_job(db=db, job_schema=job, user_id=current_user.id)
    return JobSchema.model_validate(new_job)

