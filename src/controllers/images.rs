
use rocket::Route;
use rocket::fs::TempFile;
use rocket::http::uncased::UncasedStr;
use rocket::post;
use tracing::error;
use uuid::Uuid;
use rocket::fs::NamedFile;
use std::io;
use std::path::PathBuf;
use rocket::State;
use rocket::get;
use rocket::routes;

pub struct ImagesController;

impl From<ImagesController> for Vec<Route> {
    fn from(_: ImagesController) -> Self {
        routes![create,get_one]
    }
}

#[get("/images/<name>")]
async fn get_one(folder:&State<PathBuf>,name:String) -> io::Result<NamedFile> {
  NamedFile::open(&folder.join("images").join(name)).await
}

#[post("/images",data="<file>")]
async fn create(folder:&State<PathBuf>,mut file:TempFile<'_>) -> String {
    let id = Uuid::new_v4();
    if let Some(Some(ext)) = file.content_type().map(|x| x.extension()) {
        if ext=="jpeg" || ext=="png" {
            let path = format!("{}.{}",id,ext);
            file.persist_to(folder.join("images").join(&path)).await.unwrap();
            return path;
        }
    }
    panic!();
}