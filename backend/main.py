from fastapi import FastAPI
from routers import auth, user, subject, test
import uvicorn

app = FastAPI()
app.include_router(auth)
app.include_router(user)
app.include_router(subject)
app.include_router(test)


if __name__ == '__main__':
    uvicorn.run("main:app", port=8080, reload=True)