var exports = module.exports = {};
var express = require('express')
    , passport = require('passport')
    , util = require('util')
    , LocalStrategy = require('passport-local').Strategy;
var crypto = require("crypto");
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var db = require('monk')('f9:admin@ds035553.mongolab.com:35553/db-project');
var categories = ['']

function findByUsername(username, fn) {
    var collection = db.get('loginUsers');
    console.log("yeh user name hai latest!!", username);
    collection.findOne({username: username}, {}, function (e, docs) {
        console.log("now in user", docs);
        if (docs) {
            return fn(null, docs);
        }
        else {
            return fn(null, null);
        }

    });
}

function findById(id, fn) {
    var collection = db.get('loginUsers');
    collection.findOne({_id: id}, {}, function (e, docs) {
        console.log("now in id", docs);
        

        if (docs) {
            return fn(null, docs);
        }
        else {
            return fn(null, null);
        }
    });
}


var app = express();
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded

// configure Express
app.use(cookieParser());
//app.use(express.methodOverride());
app.use(session({

    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
    cookie: {secure: false, maxAge: (40 * 60 * 60 * 1000)}, // 4 hours
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(function (req, res, next) {
    req.db = db;
    next();
})

passport.serializeUser(function (user, done) {
    done(null, user._id);
});

passport.deserializeUser(function (id, done) {
    findById(id, function (err, user) {
        done(err, user);
    });
});

app.set('port', process.env.PORT || 8100);
passport.use(new LocalStrategy(
    function (username, password, done) {
        // Find the user by username.  If there is no user with the given
        // username, or the password is not correct, set the user to `false` to
        // indicate failure and set a flash message.  Otherwise, return the
        // authenticated `user`.
        console.log(username, password);
        findByUsername(username, function (err, user) {

            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false, {message: 'Unknown user ' + username});
            }
            var OldPassword = user.password.password
            console.log("This is an Old   " + OldPassword);
            var NewPassword = hash(password, user.password.salt);
            console.log("This is a New   " + NewPassword);
            if (OldPassword != NewPassword) {
                console.log("Error");
                return done(null, false, {message: 'Invalid password'});
            }
            return done(null, user);
        });
    }
));
var i=1;
var pobj={};
app.use('/',express.static(__dirname + '/www'));
app.use('/www/bower_components', express.static(__dirname + '/www/bower_components'));
var array=[];

app.post('/login',
    passport.authenticate('local', {failureRedirect: '/loginFailure'}),
    function (req, res) {
        res.send({sucess: true});
    });
app.get('/login', function (req, res) {
    res.send({msg: "login kr"});
});


app.get('/loginFailure', function (req, res) {
    res.send({error: true})
});



app.post('/register', function (req, res) {
    var collection = req.db.get("loginUsers");
    var mail = req.body.email;
    collection.findOne({email: mail}, {}, function (e, docs2) {
        console.log("checking docs 2", docs2);
        if (docs2 != null) {
            var obj = ('Used');
            res.send(obj);
        }
        else {
            var id = req.body.username;

            collection.findOne({username: id}, {}, function (e, docs3) {
                if (docs3) {
                    var obj = ('Used');
                    res.send(obj);
                }
                else {
                    console.log("pushing in the database!!!");
                    var saltPass = newSalt(16);
                    var pass = {password: hash(req.body.password, saltPass), salt: saltPass};
                    var obje = {username: req.body.username, email: req.body.email, password: pass};
                    collection.insert(obje, function (err, doc) {
                        if (err) {
                            // If it failed, return error
                            res.send("There was a problem adding the information to the database.");
                        }
                        else {
                            res.send(true);
                        }
                    });
                }
            });

        }
    });

    // Submit to the DB

});
app.post('/shopProfile',function(req,res){



var collection = db.get("shopProfile");
var FreshObj={shopName:req.body.shopName,shopAddr:req.body.shopAddr, shopArea:req.body.shopArea,shopLong:req.body.shopLong, shopLat:req.body.shopLat};
var obj={};
    
    var dum=req.body.category;
    console.log(dum);
  collection.findOne({category: dum}, {}, function (e, docs2) {
    if(docs2){
       collection.remove({category : dum});
       console.log("remove ker k if me aya");
       // console.log("Ye purana hai",docs2.Shops);
  
       
      //  console.log("Ye naya hai ", FreshObj);
        var Comp={};
        array=null;
        array=[];
        var co=0;
 for(var z in docs2.Shops){
    co++;
 }
// console.log(co);
        for(var k=0;k<co;k++){
            if(docs2.Shops[k]!=null){
             array.push(docs2.Shops[k]);
         }
            
         }
        
          
           array.push(FreshObj);
         //  console.log(array.length)
           for(var l=0 ;l<array.length;l++){
            Comp[l]=array[l];
           }
           obj={category : dum, Shops:Comp};
               console.log("ab yaha finally insert karega is cat me ",dum);
 collection.insert(obj, function (err, doc) {
                       
                        if (err) {
                            // If it failed, return error
                            //res.send(false);
                        }
                        else {
                            //res.send(true);
                        }
                    });
 res.send(true);
    }
else{
    console.log("Ye yaha new category bana ker insert karega",dum);
           var dummy={'0':FreshObj};
     obj={category : dum, Shops:dummy};
 collection.insert(obj, function (err, doc) {
                       
                        if (err) {
                            // If it failed, return error
                            res.send(false);
                        }
                        else {
                            res.send(true);
                        }
                    });

}
});

});

app.post('/ProductItems',function(req,res){
    var collection= req.db.get("ProductItems");
    var obj=[

];
   /* var obje={categoryName:'ladiesShoes' ,items:obj};
     collection.insert(obje, function (err, doc) {
                        if (err) {
                            // If it failed, return error
                            res.send("There was a problem adding the information to the database.");
                        }
                        else {
                            res.send("Done");
                        }
                    });*/
/* collection.findOne({categoryName:"artificialJewelery"}, {}, function (e, docs2) {
        if(docs2){
            var al=docs2.items;

            for (var i = 0; i < al.length; i++) {
                if(al[i].item_name == ' Bali'){
                    console.log("True");
                }
                else{
                    console.log("chp");
                }
            };
          
        }
        else{
            console.log("fuckoff");
        }
 });*/

});

app.get('/logout', function (req, res) {
    req.session.destroy();
    req.session = null;
    req.logout();
    res.send(true);

});
app.get('/isAuthenticated', function (req, res) {
    if (req.isAuthenticated())
        res.send(true);
    else
        res.send(false);
});







app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});

function sendData(res, obj) {
    //console.log("finally checking object",obj);
    res.send(obj);
}
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

function newSalt(size) {

    return crypto.randomBytes(size).toString('hex');
}
function hash(password, salt) {
    var sha256 = crypto.createHash('sha256').update(salt + password).digest("hex");
    return sha256;
}
exports.GetUser=function(){
    return MatchUser;
}