use serde::{Deserialize, Serialize};
use sqlx::FromRow;

#[derive(Serialize, Deserialize, FromRow)]
pub struct Cat {
    id: i32,
    name: String,
    age: i32,
    color: String,
    sex: String,
    image: Option<String>,
    breed: Option<String>,
    sterilized: bool,
}
