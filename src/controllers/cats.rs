use std::error::Error;

use rocket::Route;
use rocket::State;
use rocket::delete;
use rocket::get;
use rocket::post;
use rocket::put;
use rocket::routes;
use rocket::serde::json::Json;
use sqlx::PgPool;
use super::{ErrStatus,Response};
use crate::models::Cat;
use crate::models::UpdateCat;

pub struct CatsController;

impl From<CatsController> for Vec<Route> {
    fn from(_: CatsController) -> Self {
        routes![get_all,get_one,create,update,delete]
    }
}


#[get("/cats")]
async fn get_all(db: &State<PgPool>) -> Response<Json<Vec<Cat>>> {
    let cats: Vec<Cat> = sqlx::query_as!(Cat,"SELECT * FROM cats ORDER BY id")
        .fetch_all(&**db).await
        .err_status()?;
    Ok(Json(cats))
}

#[get("/cats/<id>")]
async fn get_one(db: &State<PgPool>,id:i32) -> Response<Option<Json<Cat>>> {
    let cat = sqlx::query_as!(Cat,"SELECT * FROM cats WHERE id = $1",id)
        .fetch_optional(&**db).await
        .err_status()?;
    Ok(cat.map(Json))
}

#[delete("/cats/<id>")]
async fn delete(db: &State<PgPool>,id:i32) -> Response<Option<Json<Cat>>> {
    let cat = sqlx::query_as!(Cat,"DELETE FROM cats WHERE id = $1 RETURNING *;",id)
        .fetch_optional(&**db).await
        .err_status()?;
    Ok(cat.map(Json))
}

#[post("/cats",data="<body>")]
async fn create(db: &State<PgPool>,body:Json<UpdateCat>) -> Response<Option<Json<Cat>>> {
    let cat = sqlx::query_as!(Cat,r#"
        INSERT INTO cats
        (name,age,color,description,image,sex,breed,sterilized) VALUES
        ($1,$2,$3,$4,$5,$6,$7,$8)
        RETURNING *; "#,body.name,body.age,body.color,body.description,body.image,body.sex,body.breed,body.sterilized)
        .fetch_optional(&**db).await
        .err_status()?;
    Ok(cat.map(Json))
}

#[put("/cats/<id>",data="<body>")]
async fn update(db: &State<PgPool>,id:i32,body:Json<UpdateCat>) -> Response<Option<Json<Cat>>> {
    let cat = sqlx::query_as!(Cat,r#"
        UPDATE cats
        SET (name,age,color,description,image,sex,breed,sterilized) =
        ($1,$2,$3,$4,$5,$6,$7,$8)
        WHERE id = $9 
        RETURNING *;
        "#,&body.name,body.age,&body.color,&body.description,&body.image,&body.sex,&body.breed,&body.sterilized,id)
        .fetch_optional(&**db).await
        .err_status()?;
    Ok(cat.map(Json))
}