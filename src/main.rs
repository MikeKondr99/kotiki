mod models;
mod controllers;
use std::path::PathBuf;

use shuttle_shared_db::Postgres;
use shuttle_static_folder::StaticFolder;

use controllers::{CatsController, ReactController};

use rocket::{http::Header, Response, Request, fairing::{Info, Fairing, Kind}};
use shuttle_rocket::ShuttleRocket;
use sqlx::PgPool;


struct MyState {
    db: PgPool,
    folder: PathBuf,
}

pub struct CORS;

#[rocket::async_trait]
impl Fairing for CORS {
    fn info(&self) -> Info {
        Info {
            name: "Add CORS headers to responses",
            kind: Kind::Response
        }
    }

    async fn on_response<'r>(&self, _request: &'r Request<'_>, response: &mut Response<'r>) {
        response.set_header(Header::new("Access-Control-Allow-Origin", "*"));
        response.set_header(Header::new("Access-Control-Allow-Methods", "POST, GET, PATCH, OPTIONS, DELETE, PUT"));
        response.set_header(Header::new("Access-Control-Allow-Headers", "*"));
        response.set_header(Header::new("Access-Control-Allow-Credentials", "true"));
    }
}

#[shuttle_runtime::main]
async fn rocket(
    #[Postgres] db: PgPool,
    #[StaticFolder(folder = "public")] folder: PathBuf
) -> ShuttleRocket {
    let state = MyState {
        db,
        folder,
    };
    sqlx::migrate!("./migrations")
        .run(&state.db)
        .await
        .expect("Migrations failed!");
    let rocket = rocket::build()
        .attach(CORS)
        .manage(state)
        .mount("/", ReactController)
        .mount("/api", CatsController);
    Ok(rocket.into())
}

