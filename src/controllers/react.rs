
use rocket::Route;
use std::env;
use tracing::error;
use rocket::fs::NamedFile;
use std::io;
use rocket::State;
use std::path::Path;
use std::path::PathBuf; 
use rocket::get;
use rocket::routes;

use crate::MyState;

pub struct ReactController;

impl From<ReactController> for Vec<Route> {
    fn from(_: ReactController) -> Self {
        routes![index,files]
    }
}

#[get("/")]
async fn index(state:&State<MyState>) -> io::Result<NamedFile> {
  NamedFile::open(Path::new(&state.folder).join("react").join("index.html")).await
}

#[get("/<file..>")]
async fn files(file: PathBuf,state:&State<MyState>) -> io::Result<NamedFile> {
  let a = Path::new(&state.folder).join("react").join(file);
  error!("{:?}",a);
  NamedFile::open(a).await
}
