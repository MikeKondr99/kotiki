
use rocket::Route;
use std::env;
use tracing::error;
use rocket::fs::NamedFile;
use std::io;
use std::path::Path;
use std::path::PathBuf; 
use rocket::get;
use rocket::routes;

pub struct ReactController;

impl From<ReactController> for Vec<Route> {
    fn from(_: ReactController) -> Self {
        routes![index,files]
    }
}

#[get("/")]
async fn index() -> io::Result<NamedFile> {
  let page_directory_path = "./build";
  NamedFile::open(Path::new(&page_directory_path).join("index.html")).await
}

#[get("/<file..>")]
async fn files(file: PathBuf) -> io::Result<NamedFile> {
  let page_directory_path = "./build";
  NamedFile::open(Path::new(&page_directory_path).join(file)).await
}
