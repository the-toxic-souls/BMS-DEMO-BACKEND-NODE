declare global{
    namespace Express {
        interface Request {
            jwt_data?: Object,
            user_permission?:Object
        }
    }
}

export = Express