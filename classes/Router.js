var createError = require('http-errors');
var UserController = require('../controllers/UserController');

class Router{

    constructor(){
        this.addControllers();
        this.addBaseRoutes();
        this.handle404s();
        this.handleErrors();
        this.setVariables();
    }

    setVariables(){
        GulpApp.use(function(request, response, next) {
            if (request.session.token) {
                response.locals.loggedin = true;
            }
            if (request.session.genericErrors) {
                response.locals.genericErrors = request.session.genericErrors;
                request.session.genericErrors = false;
            }
            next();
        });
    }

    addControllers() {
        var userController = new UserController();
    }

    addBaseRoutes() {
        GulpApp.get('/', this.index);
    }

    index(request, response, next) {
        response.render('index');
    }

    handle404s() {
        GulpApp.use(function(req, res, next) {
            next(createError(404));
        });
    }

    handleErrors() {
        
        // error handler
        GulpApp.use(function(error, request, response, next) {
            if (error) {
                console.log('Error', error);
            }
            // set locals, only providing error in development
            response.locals.message = error.message;
            response.locals.error = error;
            
            // render the error page
            response.status(error.status || 500);
            response.render('error');
        });
    }

}
module.exports = Router;