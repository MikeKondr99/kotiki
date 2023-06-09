use serde::{Deserialize, Serialize};
use sqlx::FromRow;

#[derive(Serialize, Deserialize, FromRow)]
pub struct Cat {
    pub id: Option<i32>,
    pub name: String,
    pub age: i32,
    pub color: String,
    pub sex: String,
    pub image: Option<String>,
    pub breed: Option<String>,
    pub description: Option<String>,
    pub sterilized: bool,
}

#[derive(Serialize, Deserialize, FromRow)]
pub struct UpdateCat {
    pub name: String,
    pub age: i32,
    pub color: String,
    pub sex: String,
    pub image: Option<String>,
    pub breed: Option<String>,
    pub description: Option<String>,
    pub sterilized: bool,
}
