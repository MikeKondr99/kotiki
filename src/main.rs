mod models;
mod controllers;
mod cors;

use std::path::PathBuf;

use rocket::{Config, data::{Limits, ByteUnit,}};
use shuttle_shared_db::Postgres;
use shuttle_static_folder::StaticFolder;

use controllers::{CatsController, ReactController, ImagesController};

use shuttle_rocket::ShuttleRocket;
use sqlx::PgPool;


#[shuttle_runtime::main]
async fn rocket(
    #[Postgres] db: PgPool,
    #[StaticFolder(folder = "public")] folder: PathBuf
) -> ShuttleRocket {

    sqlx::migrate!("./migrations")
        .run(&db)
        .await
        .expect("Migrations failed!");

    let rocket = rocket::build()
        .attach(cors::Cors)
        .manage(db)
        .manage(folder)
        .configure(Config {
            limits: Limits::default()
                .limit("file",ByteUnit::Mebibyte(3))
                .limit("form",ByteUnit::Mebibyte(3))
                .limit("data-form",ByteUnit::Mebibyte(3)),
            ..Default::default()
        })
        .mount("/", ReactController)
        .mount("/api", CatsController)
        .mount("/api", ImagesController);
    Ok(rocket.into())
}

