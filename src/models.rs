use serde::{Deserialize, Serialize};
use sqlx::FromRow;

#[derive(Serialize, Deserialize, FromRow)]
pub struct Cat {
    pub id: i32,
    pub name: String,
    pub age: i32,
    pub color: String,
    pub sex: String,
    pub image: String,
    pub breed: String,
    pub description: String,
    pub sterilized: bool,
}

#[derive(Serialize, Deserialize, FromRow)]
pub struct UpdateCat {
    pub name: String,
    pub age: i32,
    pub color: String,
    pub sex: String,
    pub image: String,
    pub breed: String,
    pub description: String,
    pub sterilized: bool,
}
