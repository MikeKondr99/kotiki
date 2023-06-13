use std::error::Error;

use rocket::Route;
use rocket::State;
use rocket::delete;
use rocket::get;
use rocket::post;
use rocket::put;
use rocket::response::status::BadRequest;
use rocket::routes;
use rocket::serde::json::Json;
use crate::MyState;
use crate::models::Cat;
use crate::models::UpdateCat;

pub struct CatsController;

impl From<CatsController> for Vec<Route> {
    fn from(_: CatsController) -> Self {
        routes![get_all,get_one,create,update,delete]
    }
}

trait ToResponse {
    type Output;
    fn to_response(self) -> Self::Output;
}

impl<T,E:Error> ToResponse for Result<T,E> {
    type Output = Result<Json<T>,BadRequest<String>>;

    fn to_response(self) -> Self::Output {
        self.map(Json).map_err(|e| BadRequest(Some(e.to_string())))
    }
}

type ApiResult<T> = Result<Json<T>,BadRequest<String>>;


#[get("/cats")]
async fn get_all(state: &State<MyState>) -> ApiResult<Vec<Cat>>{
    sqlx::query_as!(Cat,"SELECT * FROM cats ORDER BY id")
        .fetch_all(&state.db).await
        .to_response()
}

#[get("/cats/<id>")]
async fn get_one(state: &State<MyState>,id:i32) -> ApiResult<Cat> {
    sqlx::query_as!(Cat,"SELECT * FROM cats WHERE id = $1",id)
        .fetch_one(&state.db).await
        .to_response()
}

#[delete("/cats/<id>")]
async fn delete(state: &State<MyState>,id:i32) -> ApiResult<Cat> {
    sqlx::query_as!(Cat,"DELETE FROM cats WHERE id = $1 RETURNING *;",id)
        .fetch_one(&state.db).await
        .to_response()
}

#[post("/cats",data="<body>")]
async fn create(state: &State<MyState>,body:Json<UpdateCat>) -> ApiResult<Cat> {
    sqlx::query_as!(Cat,r#"
    INSERT INTO cats
    (name,age,color,description,image,sex,breed,sterilized) VALUES
    ($1,$2,$3,$4,$5,$6,$7,$8)
    RETURNING *; "#,body.name,body.age,body.color,body.description,body.image,body.sex,body.breed,body.sterilized)
        .fetch_one(&state.db).await
        .to_response()
}

#[put("/cats/<id>",data="<body>")]
async fn update(state: &State<MyState>,id:i32,body:Json<UpdateCat>) -> ApiResult<Cat> {
    sqlx::query_as!(Cat,r#"
    UPDATE cats
    SET (name,age,color,description,image,sex,breed,sterilized) =
    ($1,$2,$3,$4,$5,$6,$7,$8)
    WHERE id = $9 
    RETURNING *;
    "#,&body.name,body.age,&body.color,&body.description,&body.image,&body.sex,&body.breed,&body.sterilized,id)
        .fetch_one(&state.db).await
        .to_response()
}