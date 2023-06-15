
use rocket::{serde::json::{self}, response::status::NotFound};

type Json<T> = Result<json::Json<T>,NotFound<String>>;