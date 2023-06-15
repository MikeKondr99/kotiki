mod cats;
mod react;
mod images;

use std::error::Error;

pub use cats::CatsController;
pub use react::ReactController;
pub use images::ImagesController;


pub trait ErrStatus {
    type Output;
    fn err_status(self) -> Self::Output;
}

impl<T,E:Error> ErrStatus for Result<T,E> {
    type Output = Result<T,String>;

    fn err_status(self) -> Self::Output {
        self.map_err(|e| format!("{:?}",e))
    }
}

type Response<T> = Result<T,String>;

