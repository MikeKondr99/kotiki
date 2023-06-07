mod models;
mod controllers;
use controllers::{CatsController, ReactController};

use shuttle_rocket::ShuttleRocket;
use shuttle_runtime::CustomError;
use sqlx::{Executor, PgPool};


struct MyState(PgPool);



#[shuttle_runtime::main]
async fn rocket(#[shuttle_shared_db::Postgres] pool: PgPool) -> ShuttleRocket {
    pool.execute(include_str!("../schema.sql")).await.map_err(CustomError::new)?;
    let state = MyState(pool);
    let rocket = rocket::build()
        .manage(state)
        .mount("/", ReactController)
        .mount("/api", CatsController);
    Ok(rocket.into())
}

