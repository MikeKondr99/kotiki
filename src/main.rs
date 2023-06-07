mod models;
mod controllers;
use std::path::PathBuf;

use controllers::{CatsController, ReactController};

use shuttle_rocket::ShuttleRocket;
use shuttle_runtime::CustomError;
use sqlx::{Executor, PgPool};


struct MyState {
    db: PgPool,
    folder: PathBuf,
}



#[shuttle_runtime::main]
async fn rocket(
    #[shuttle_shared_db::Postgres] pool: PgPool,
    #[shuttle_static_folder::StaticFolder(folder = "frontend/build")] public_folder: PathBuf
) -> ShuttleRocket {
    pool.execute(include_str!("../schema.sql")).await.map_err(CustomError::new)?;
    let state = MyState {
        db:pool,
        folder:public_folder,
    };
    let rocket = rocket::build()
        .manage(state)
        .mount("/", ReactController)
        .mount("/api", CatsController);
    Ok(rocket.into())
}

