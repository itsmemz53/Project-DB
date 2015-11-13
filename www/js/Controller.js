var objects={};
var keyWords=['hospital',
"airport",
"amusement_park",
"aquarium",
"art_gallery",
"atm",
"bakery",
"bank",
"bar",
"beauty_salon",
"bicycle_store",
"book_store",
"bowling_alley",
"bus_station",
"cafe",
"campground",
"car_dealer",
"car_rental",
"car_repair",
"car_wash",
"casino",
"cemetery",
"church",
"city_hall",
"clothing_store",
"convenience_store",
"courthouse",
"dentist",
"department_store",
"doctor",
"electrician",
"electronics_store",
"embassy",
"establishment",
"finance",
"fire_station",
"florist",
"food",
"funeral_home",
"furniture_store",
"gas_station",
"general_contractor",
"grocery_or_supermarket",
"gym",
"hair_care",
"hardware_store",
"health",
"hindu_temple",
"home_goods_store",
"hospital",
"insurance_agency",
"jewelry_store",
"laundry",
"lawyer",
"library",
"liquor_store",
"local_government_office",
"locksmith",
"lodging",
"meal_delivery",
"meal_takeaway",
"mosque",
"movie_rental",
"movie_theater",
"moving_company",
"museum",
"night_club",
"painter",
"park",
"parking",
"pet_store",
"pharmacy",
"physiotherapist",
"place_of_worship",
"plumber",
"police",
"post_office",
"real_estate_agency",
"restaurant",
"roofing_contractor",
"rv_park",
"school",
"shoe_store",
"shopping_mall",
"spa",
"stadium",
"storage",
"store",
"subway_station",
"synagogue",
"taxi_stand",
"train_station",
"travel_agency",
"university",
"veterinary_care",
"zoo"]
angular.module('dbProject.controllers', [])
.controller('registerUser', ['$scope', 'myService', '$location', '$rootScope', function ($scope, myService, $location, $rootScope, $state) {
    // $rootScope.location = $location.path();

    console.log("Hello World")
    $scope.username = '';
    $scope.email = '';
    $scope.password = '';




    $scope.register = function (form) {
     var abc={username:$scope.username,email:$scope.email,password:$scope.password}
   
        console.log("IwantToRegister")
        console.log(abc);

        console.log(abc);

        if(form.$valid){
        myService.registerUser(abc).success(function(res){



            if (res == "Used") {
                alert("This user has already an accout")
                $location.path('/register')
            }
            else {
                console.log("inElse");
                $rootScope.loggedIn = true;
                $location.path("/login");
            }
        })};


    }


}]).controller('loginUser',['$scope','myService','$location',function($scope,myService,$location)
    {
  //  $rootScope.location = $location.path();
    $scope.login=function(form) {
        console.log("i AM login")
        var userObj = {username: $scope.username, password: $scope.password};
        console.log("loggin in ka object", userObj);
        if (form.$valid) {
            myService.login(userObj).success(function (res) {
                console.log(res);
                if (res.error) {
                    alert("Error")
                    $scope.username = "";
                    $scope.password = "";
                    $location.path('/login')

                }
                else {
                    //   $rootScope.loggedIn=true;
                    $location.path('/home')

                }
            });
        }
    }
  
}]).controller('Authentication', ['$scope', 'myService','$location', function ($scope, myService,$location) {
    console.log($scope.page);
  myService.isAuthenticated().success(function (res) {
    console.log("Authentication Called");
        if(res==true){
             $location.path('watchproducts')
        }
        else{
             $location.path('home')
        }
            

    });
}]).controller('shopProfile', ['$scope', 'myService','$location', function ($scope, myService,$location) {   
         $scope.colors = {artificialJewelery: false, Accessories: false,Electronics: false, bedSheetNTowel: false,
         babyProducts: false, Cosmetics: false,
       Crockeries: false, eyeWear: false,
       gentGarments: false, handBag_purse_keyChain: false,
       kidGarments: false, ladiesGarments: false,
       ladiesUnderGarments: false, mobileCards: false,Perfume: false, petFood: false,sportsWear: false, Tobacco: false,
       Watches: false, gentShoes: false,ladiesShoes: false, Groceries: false,Toys_PartyItems_Balls_Stationary: false};
var cat=[];
 $scope.stepsModel = [];

    $scope.imageUpload = function(element){
        var reader = new FileReader();
        reader.onload = $scope.imageIsLoaded;
        reader.readAsDataURL(element.files[0]);

    }

    $scope.imageIsLoaded = function(e){
        $scope.$apply(function() {
            $scope.stepsModel.push(e.target.result);
        });
    }
  $scope.SendShop=function(){

 var j=0
 for(var d in $scope.colors){
  if($scope.colors[d] == true)
  {

    cat.push(d);
    
  }
 }



         for(var as=0;as<cat.length;as++){
  var obj={shopName:$scope.shopName,shopAddr:$scope.shopAddr, shopArea:$scope.shopArea,shopLong:$scope.shopLong, shopLat:$scope.shopLat, category:cat[as], shopCover:$scope.stepsModel[0]};
      myService.sendShop(obj).success(function(res){
        if (res == true) {
              console.log("submitted");
            }
            else  {
              console.log("wrong");
            }
        });
    } 
    $scope.shopName='';
    $scope.shopAddr='';
    $scope.shopArea='';
    $scope.shopLong='';
    $scope.shopLat='';
    $scope.stepsModel[0]='';
    $scope.imageIsLoaded='';
 $scope.colors = {artificialJewelery: false, Accessories: false,Electronics: false, bedSheetNTowel: false,
         babyProducts: false, Cosmetics: false,
       Crockeries: false, eyeWear: false,
       gentGarments: false, handBag_purse_keyChain: false,
       kidGarments: false, ladiesGarments: false,
       ladiesUnderGarments: false, mobileCards: false,Perfume: false, petFood: false,sportsWear: false, Tobacco: false,
       Watches: false, gentShoes: false,ladiesShoes: false, Groceries: false,Toys_PartyItems_Balls_Stationary: false};

}
}]).controller('Main', ['$scope', 'myService','$location', function ($scope, myService,$location) {            

  $scope.sendPic=function(){
    console.log($scope.shopAddr);
    console.log($scope.pic);
  }
    
}]).controller('Maps', ['$scope', 'myService','$location', function ($scope, myService,$location) {
  var map;
var infowindow;
var pos;
var slat;
var slong;
$scope.mapItem=false;
myService.sendProducts().success(function(res){
  if(res==true){
    console.log("done");
  }
});
function initialize() {
  var pyrmont;
  var mapOptions = {
        zoom: 30,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
console.log(map);
var ind=null;
                 console.log("here")
                 console.log(store);
/*var Keyword=store.toLowerCase();
for(var i=0;i<keyWords.length;i++){
    if(keyWords[i].search(Keyword)!= -1){
        ind=i;
        break;
    }
}*/

    


          event.preventDefault();
       
      if (navigator.geolocation) {

     $scope.fromLink = function(store) {  
     
          navigator.geolocation.getCurrentPosition(function(position) {

            var geocoder = new google.maps.Geocoder();
             geocoder.geocode({
              "location": new google.maps.LatLng(position.coords.latitude, position.coords.longitude)
            },
            function(results, status) {
              if (status == google.maps.GeocoderStatus.OK){
                $scope.from=results[0].formatted_address
                slat=results[0].geometry.location.lat();
                slong=results[0].geometry.location.lng()
                console.log("Here"+results[0].geometry.location);
              }
              else
              console.log("error");
            });
            pos=new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
             infowindow = new google.maps.InfoWindow({
                map: map,
                position: pos,
                
            });
              var marker1 = new google.maps.Marker({
            position: pos,
            icon: "img/ambulance1.png"
              });
              infowindow.setContent("Me");
              marker1.setMap(map);
             map.setCenter(pos);
        
             var request = {
            location: pos,
            radius: 2500,
            types: ['restaurant']
            };
           ind=null;
        infowindow = new google.maps.InfoWindow();
  
          var service = new google.maps.places.PlacesService(map);
          service.nearbySearch(request, callback);
        })
}
 $scope.searchLink = function(store) {  

var geocoder = new google.maps.Geocoder();
             geocoder.geocode({
              "address": $scope.from
            },
            function(results, status) {
              if (status == google.maps.GeocoderStatus.OK){
                slat=results[0].geometry.location.lat();
                slong=results[0].geometry.location.lng();
                            
              }
              else{
                console.log("Unable to retrieve your address<br />");
            }
                slat=results[0].geometry.location.lat();
                slong=results[0].geometry.location.lng();
                 pos=new google.maps.LatLng(slat, slong);
            console.log(pos)
             infowindow = new google.maps.InfoWindow({
                map: map,
                position: pos,
                
            });
             var marker1 = new google.maps.Marker({
            position: pos,
            icon: "img/ambulance1.png"
              });
              marker1.setMap(map);
             map.setCenter(pos);

             var request = {
            location: pos,
            radius: 1000,
            types: ['restaurant']
           
            };
           
        infowindow = new google.maps.InfoWindow();
  
          var service = new google.maps.places.PlacesService(map);
          service.nearbySearch(request, callback);
            });
           
              




},function() {
            handleNoGeolocation(true);
        };
    } else {
        // Browser doesn't support Geolocation
        handleNoGeolocation(false);
    }
}

function callback(results, status,pagination) {
  
           
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    $scope.nearHosp=function(){
  $scope.Results=true;

      createMarker(results);
    if (pagination.hasNextPage) {
      
      $scope.more=false;
     

    $scope.moreButton =function(){
      console.log("button called")
         $scope.more=true;
        pagination.nextPage();
     }
    }
    };
  }
}

function createMarker(places) {
  $scope.places=null;
   var bounds = new google.maps.LatLngBounds();
   for (var i = 0, place; place = places[i]; i++) {
  var image = {
      url: place.icon,
      size: new google.maps.Size(71, 71),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(17, 34),
      scaledSize: new google.maps.Size(25, 25)
    };
  var marker = new google.maps.Marker({
    map: map,
    location : pos,
    title:place.name,
    position: place.geometry.location,
     icon: image
  });
  
   bounds.extend(place.geometry.location);
}
  $scope.places=places;
 map.fitBounds(bounds);
  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent(place.name);
 
    infowindow.open(map, this);

  });
}

   $scope.showMap=function() {
    console.log("call hua")
    $scope.Results=false;
$scope.mapItem=true;
  }
     
       

google.maps.event.addDomListener(window, 'load', initialize);

  
}]);