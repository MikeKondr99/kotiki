
use rocket::Route;
use rocket::fs::TempFile;
use rocket::post;
use uuid::Uuid;
use rocket::fs::NamedFile;
use std::io;
use std::path::PathBuf;
use rocket::State;
use rocket::get;
use rocket::routes;

use crate::controllers::Response;

use super::ErrStatus;

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
async fn create(folder:&State<PathBuf>,mut file:TempFile<'_>) ->  Response<String> {
    let typ = file.content_type().ok_or("Не было типа контента")?;
    let ext = typ.extension().ok_or("Не было расширения")?;
    if ext!="jpeg" || ext!="png" { return Err(format!("Недоступное расширение {ext}"))}

    let id = Uuid::new_v4();
    let path = format!("{}.{}",id,ext);
    file.persist_to(folder.join("images").join(&path)).await.err_status()?;
    Ok(path)
}