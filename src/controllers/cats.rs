use rocket::Route;
use rocket::State;
use rocket::get;
use rocket::routes;
use rocket::serde::json::Json;
use crate::MyState;
use crate::models::Cat;

pub struct CatsController;

impl From<CatsController> for Vec<Route> {
    fn from(_: CatsController) -> Self {
        routes![get_cats]
    }
}

#[get("/cats")]
async fn get_cats(state: &State<MyState>) -> Json<Vec<Cat>> {
    let res = sqlx::query_as::<_,Cat>("SELECT * FROM cats").fetch_all(&state.db).await.unwrap();
    Json(res)
}