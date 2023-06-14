
use rocket::Route;
use rocket::fs::NamedFile;
use std::io;
use rocket::State;
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
async fn index(folder:&State<PathBuf>) -> io::Result<NamedFile> {
  NamedFile::open(&folder.join("react").join("index.html")).await
}

#[get("/<file..>")]
async fn files(file: PathBuf,folder:&State<PathBuf>) -> io::Result<NamedFile> {
  NamedFile::open(&folder.join("react").join(file)).await
}
