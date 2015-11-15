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
var categories = [''];
var S = require('string');
var fs = require("fs");
var geolib=require("geolib");
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




app.post('/searchIt', function (req, res) {
    var collection =db.get('ProductItems');
    var categ=req.body.category;
    var search=req.body.search;
    var flag=0;
    console.log("Haan bhai Yaha aGaaya");
     collection.findOne({categoryName: categ}, {}, function (e, docs2) {
        if(docs2){
            console.log("Haan bhai search kerlia ab");
            var co=0;
            for(var z in docs2.items){
    co++;
         }
         for(var k=0;k<co;k++){
            if(docs2.items[k]!=null){

                var str=S(docs2.items[k].item_name).collapseWhitespace().s;
                console.log(str);
                console.log(S(str).contains(search));
                if(S(str).contains(search)){
                    flag=1;
                    k=co+1
                }
         }
            
         }
         
        }
        else{
            console.log("Not found");
        }
        if(flag==1){
            console.log("Haan bhai item mil gaya");
            res.send(true);
         }
         else{
            res.send(false);
         }
     });
});


app.post('/getShop', function (req, res) {
    var cou=0;
    var aray=[];
var collect=req.body.category+'_Shops';
    var collection =db.get(collect);
    collection.find({},function(err,docs){
        if(docs){
            for(var i in docs){
                cou++;
            }
            for(var j=0; j<cou;j++){
                var lat=docs[j].coordinates[1];
                var lon= docs[j].coordinates[0];
                var slat=req.body.lat;
                var slon=req.body.lon;
        var ans=geolib.isPointInCircle(
                {latitude: lat , longitude: lon},
                {latitude: slat, longitude: slon},
                500
                );

                if(ans==true){
                    var objec={shopLong : docs[j].coordinates[0], shopLat :docs[j].coordinates[1], shopName: docs[j].shopName, shopAddr : docs[j].shopAddr, shopArea: docs[j].shopArea, shopCover:docs[j].shopCover  };
                    aray.push(objec);
                    console.log(j ,"   ",objec);
                }

            }
           res.send(aray);



        }
        else{
            console.log(err);
            res.send(false);
        }



    });


    
});



app.post('/shopProfile',function(req,res){

var collect=req.body.category+'_Shops';

var collection = db.get(collect);
var FreshObj={coordinates:[req.body.shopLong,req.body.shopLat],shopName:req.body.shopName,shopAddr:req.body.shopAddr, shopArea:req.body.shopArea, shopCover : req.body.shopCover};

/*collection.index({"location.coordinates":"2dsphere"}, { sparse: true }, function(err, result) {
        if(err)console.log(err);
        else console.log("done");

    })*/
collection.insert(FreshObj,function(e,docs){
    if(e)res.send(false);
    else res.send(true);


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












































      /*collection.geoNear(24.885738, 67.074577, {$maxDistance:10,includeLocs: true }, function(err, result) {
    if(err){
        console.log('error');
    }
    else{
        console.log(result);
    }
  });*/
     /* collection.find({coordinates : {$geoNear: {$geometry :{  coordinates: [ 24.885738 , 67.074577 ], type: "Point"},distanceField: "dist.calculated", maxDistance: 100,
        query: { type: "public" },
        includeLocs: true,
        num: 50,
        spherical: true
     }
   
}},function(err,result){
if(err)console.log(err);
else console.log(result);

});*/

   /*ar as= collection.find({ coordinates: { $nearSphere: { $geometry: { coordinates: [ 67.074577 , 24.885738] ,type: "Point" }, $maxDistance: 5 * 1609.34 } } },function(err,result){
if(err)console.log(err);
else console.log(result);


});*/


 /*  console.log(das);*/

/* collection.findOne({ geometry: { $geoIntersects: { $geometry: { coordinates:  [24.937691 , 67.033492], type: "Point"  } } } },function(err,result){
if(err)console.log(err);
else console.log(result);


});*/

    /*   collection.find({location:
   { $geoWithin:
      { $centerSphere: [ [ 24.937691,  67.033492 ], 5 / 3963.2 ] } } },function(err, docs) {
    if(err)  console.log(err);
    else
        console.log("Returned",docs);
});
*/

      /*  collection.find({ coordinates: {$near: {
     $geometry: {
        type: "Point" ,
        coordinates: [24.937691 , 67.033492] 
     },
     $maxDistance: 1000,
     includeLocs: true
  }}},function(err, docs) {
    if(err)  console.log(err);
    else
        console.log("Returned",docs);
});
*/

   /* collection.find({coordinates:{ $geoWithin:{ $centerSphere: [ [24.937691 , 67.033492] , 500 / 3963.2 ] } } },function(e,docs2){
        if(docs2){
           console.log(docs2);
            res.send(docs2);
        }
        else{
            console.log("Not found result");
            res.send(false);

        }

      });
*/











