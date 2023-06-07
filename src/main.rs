mod models;
mod controllers;
use controllers::CatsController;

use shuttle_rocket::ShuttleRocket;
use sqlx::{Executor, PgPool};


struct MyState(PgPool);



#[shuttle_runtime::main]
async fn rocket(#[shuttle_shared_db::Postgres] pool: PgPool) -> ShuttleRocket {
    pool.execute(include_str!("../schema.sql")).await.unwrap();
    let state = MyState(pool);
    let rocket = rocket::build()
        .manage(state)
        .mount("/", CatsController);
    Ok(rocket.into())
}

