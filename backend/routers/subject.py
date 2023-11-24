

router = APIRouter(prefix="/subject", tags=["subject"])


@router.get("", response_model=SubjectSchema)
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