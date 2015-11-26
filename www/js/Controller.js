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
         $scope.colors = {autoParts: false, Batteries: false,Electronics: false, bicyleShop: false,
         bikeShop: false, carShop: false,
       Rental: false, showRooms: false,
       Washing: false, Books: false,
       fitnessEquipments: false, Stationary: false,
       sportsWear: false, sportsAccesories: false,Cafe: false, chaatGolaShop: false,Dhaba: false, Coconut: false,
       frenchFries : false,
       Restaurants: false, Soup: false,gentGarments: false, Watches: false,gentsUnderGarments: false, gentShoes: false,
       Perfume: false, eyeWear: false,ladiesGarments: false, ladiesUnderGarments: false,ladiesShoes: false, Cosmetics: false,
       artificialJewelery: false, handBag_purse_keyChain: false,kidGarments: false, kidShoes: false,babyProducts: false, Toys: false,
       Groceries: false, Sweets: false,Vegetables: false, bakery: false,Fruits: false, pharmacy: false,
       aquarium: false, movieGames: false,Gifts: false, dairyProduct: false,Tobacco: false, mobileCards: false,
       Computer: false, electronicAppliances: false,electricItems: false, Furniture: false,Hardware: false, Paints: false,
       Sanitary: false, Mobile: false,hospital: false, airport: false,amusement_park: false, travel_agency: false,
       art_gallery : false, atm: false,zoo: false, bank: false,bar: false, beauty_salon: false,
       bowling_alley: false, bus_station: false,campground: false, casino: false,cemetery: false, church: false,
       city_hall: false, courthouse: false,embassy: false, fire_station: false,furniture_store: false, gas_station: false,
       gym: false, hair_care: false,hindu_temple: false, real_estate_agency: false,laundry: false,   library: false, liquor_store: false,locksmith: false, mosque: false,
       veterinary_care: false, movie_theater: false,museum: false, night_club: false,park: false, pet_store: false,
       university: false, physiotherapist: false,post_office: false, school: false,shopping_mall: false, spa: false,
       stadium: false, train_station: false ,caterers : false};
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
  $scope.SendShop=function(shopName,shopArea,shopAddr,shopLong,shopLat){
console.log(shopName,shopArea,shopAddr,shopLong,shopLat);
 var j=0
 for(var d in $scope.colors){
  if($scope.colors[d] == true)
  {

    cat.push(d);
    
  }
 }



         for(var as=0;as<cat.length;as++){
  var obj={shopName:shopName,shopAddr:shopAddr, shopArea:shopArea,shopLong:shopLong, shopLat:shopLat, category:cat[as], shopCover:$scope.stepsModel[0]};
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
         $scope.colors = {autoParts: false, Batteries: false,Electronics: false, bicyleShop: false,
         bikeShop: false, carShop: false,
       Rental: false, showRooms: false,
       Washing: false, Books: false,
       fitnessEquipments: false, Stationary: false,
       sportsWear: false, sportsAccesories: false,Cafe: false, chaatGolaShop: false,Dhaba: false, Coconut: false,
       frenchFries : false,
       Restaurants: false, Soup: false,gentGarments: false, Watches: false,gentsUnderGarments: false, gentShoes: false,
       Perfume: false, eyeWear: false,ladiesGarments: false, ladiesUnderGarments: false,ladiesShoes: false, Cosmetics: false,
       artificialJewelery: false, handBag_purse_keyChain: false,kidGarments: false, kidShoes: false,babyProducts: false, Toys: false,
       Groceries: false, Sweets: false,Vegetables: false, bakery: false,Fruits: false, pharmacy: false,
       aquarium: false, movieGames: false,Gifts: false, dairyProduct: false,Tobacco: false, mobileCards: false,
       Computer: false, electronicAppliances: false,electricItems: false, Furniture: false,Hardware: false, Paints: false,
       Sanitary: false, Mobile: false,hospital: false, airport: false,amusement_park: false, travel_agency: false,
       art_gallery : false, atm: false,zoo: false, bank: false,bar: false, beauty_salon: false,
       bowling_alley: false, bus_station: false,campground: false, casino: false,cemetery: false, church: false,
       city_hall: false, courthouse: false,embassy: false, fire_station: false,furniture_store: false, gas_station: false,
       gym: false, hair_care: false,hindu_temple: false, real_estate_agency: false,laundry: false,   library: false, liquor_store: false,locksmith: false, mosque: false,
       veterinary_care: false, movie_theater: false,museum: false, night_club: false,park: false, pet_store: false,
       university: false, physiotherapist: false,post_office: false, school: false,shopping_mall: false, spa: false,
       stadium: false, train_station: false ,caterers : false};

}
}]).controller('getDetails', ['$scope', 'myService', '$stateParams', '$location','$window',function ($scope, myService,$stateParams,$location,$window){
  //$window.location.reload(true);
 
    $scope.id = $stateParams.id;
    console.log($stateParams);
    var userId=[];
    var Review=[];
    var myDate=[];
    $scope.SendDetails = function(Product){
        console.log(Product);
        console.log($scope.review);
    
        var myobject={review : $scope.review , Shop : Product};
         myService.sendReview(myobject).success(function (res) {
          if(res==true){
            alert("Your Review Added");
            $scope.review="";
           $window.location.reload(true);
          }
          else{
            alert("Please try again later")
          }


    });

    };

   
    myService.getShopsWithId($scope.id).success(function (res) {
      console.log("here");
           console.log(res.Shop);
        $scope.product = res.Shop;
        console.log($scope.product);
 
        if(res.Review !== "No_Review"){
        for(var i in res.Review){
          userId.push(res.Review[i].UserId);
          Review.push(res.Review[i].UserReview);
          myDate.push(res.Review[i].date);
        }
         var myData = userId.map(function(value, index) {
    return {
        name: value,
        review: Review[index],
        date: myDate[index]
      }
  });
        console.log($scope.product);
        console.log(myData);
        $scope.Reviews=myData;
}
    });
     $scope.hello=function(){
$window.location.reload(true);
 }

}]).controller('userReviews', ['$scope', 'myService', '$stateParams', '$location','$state','$window',function ($scope,myService,$stateParams,$location,$state,$window){
  //$window.location.reload(true);
  $scope.This=false;
  $scope.hello=function(){
$window.location.reload(true);
 }
  $state.go($state.current, {}, {reload: true});
      var userId=[];
      var shopid=[];
    var Review=[];
    var myDate=[];
   var obj={abc:"abc"};
    myService.getUserReview(obj).success(function (res) {
      if(res==false){
  
        $scope.This=true;
      }
      else if(res=="register"){
        alert("Please Login First");
        $location.path("/login");
        $window.location.reload(true);
      } 
      else{       
        for(var i in res.Review){
          shopid.push(res.Review[i].shopId);
          userId.push(res.Review[i].shopName);
          Review.push(res.Review[i].UserReview);
          myDate.push(res.Review[i].date);
        }
         var myData = userId.map(function(value, index) {
    return {

        name: value,
        sid:shopid[index],
        review: Review[index],
        date: myDate[index]
      }
  });
        console.log(myData);

        $scope.Reviews=myData;
}
    });
  

}]).controller('Main', ['$scope', 'myService','$location', function ($scope, myService,$location) {            

  $scope.sendPic=function(){
    console.log($scope.shopAddr);
    console.log($scope.pic);
  }
    
}]).controller('Maps', ['$scope', 'myService','$state','$location','$ionicModal','$window', function ($scope, myService,$state,$location,$ionicModal,$window) {
  var map;
  $scope.focus=false;
       initialize2();
       $scope.mapIt=false;
    $scope.doRefresh = function() {
$window.location.reload(true);
       // Stop the ion-refresher from spinning
       $scope.$broadcast('scroll.refreshComplete');
    
  }

var pos;
var slat=null;
var slong=null;
var gKey;
 $scope.searchFor=true;
 $scope.hello=function(){
$window.location.reload(true);
 }
var globalCat=null;
var mapCat=null;
//$scope.mylist=false;
$scope.mymap=false;
$scope.categoriesMap=true;
     $scope.colors = {artificialJewelery: false, Accessories: false,Electronics: false, bedSheetNTowel: false,
         babyProducts: false, Cosmetics: false,
       Crockeries: false, eyeWear: false,
       gentGarments: false, handBag_purse_keyChain: false,
       kidGarments: false, ladiesGarments: false,
       ladiesUnderGarments: false, mobileCards: false,Perfume: false, petFood: false,sportsWear: false, Tobacco: false,
       Watches: false, gentShoes: false,ladiesShoes: false, Groceries: false,Toys_PartyItems_Balls_Stationary: false};

    $scope.chooseCategories=[
        {categoryId : 0, name : "Choose Category", slug: "Choose Category" },
        {categoryId : 1, name : "Automotive", slug: "Automotive" },
        {categoryId : 2, name : "Education & Sports", slug: "Education"},
        {categoryId : 3, name : "Restaurant And Food", slug: "restaurant_Foods"},{categoryId : 4, name : "Men", slug: "Men"},
        {categoryId : 5, name : "Women", slug: "Women"},{categoryId : 6, name : "Kids", slug: "Kids"},
        {categoryId : 7, name : "General Items", slug: "generalItems"},{categoryId : 8, name : "House Hold & Tech.", slug: "houseHoldGoods"},
        {categoryId : 9, name : "Places", slug: "Places"}    ];


  $scope.showList=function(){
    $scope.mapItem=false;
    $scope.Results=true;
    $scope.mymap=true;
     $scope.focus=false;
    $scope.mylist=false;
  }
         $scope.selectedCategories = angular.copy($scope.chooseCategories[0]);

         //Modals Work Down
         $scope.openModal=function(myid){
          
          if(myid==1){
            console.log("Me yaha hu",myid);
            console.log("Haan AUTO");
            $scope.modal1.show()
          }
          else if(myid==2){
            console.log("Me yaha hu",myid);
             $scope.searchFor=true;
            console.log("Haan EDU");
            $scope.modal2.show()
          }
           else if(myid==3)
          {
            console.log("Me yaha hu",myid);
             $scope.searchFor=true;
             console.log("Haan RES");
             $scope.modal3.show()
          }
           else if(myid==4)
          {
            console.log("Me yaha hu",myid);
             $scope.searchFor=true;
             console.log("Haan EDU");
             $scope.modal4.show()
          }
          else if(myid==5)
          {
            console.log("Me yaha hu",myid);
             $scope.searchFor=true;
             console.log("Haan EDU");
             $scope.modal5.show()
          }
           else if(myid==6){
            console.log("Me yaha hu",myid);
             $scope.searchFor=true;
           $scope.modal6.show()
          }
           else if(myid==7){
            console.log("Me yaha hu",myid);
             $scope.searchFor=true;
            $scope.modal7.show()
          }
           else if(myid==8){
            console.log("Me yaha hu",myid);
             $scope.searchFor=true;
            $scope.modal8.show()
          }
          else if(myid==9){
            console.log("Me yaha hu",myid);
            $scope.modal9.show()
          }
         }
         $scope.closeModals=function(myid){
           if(myid==1){
        $scope.selectedCategories = angular.copy($scope.chooseCategories[0]);

             $scope.modal1.hide();
          }
          else if(myid==2){
       $scope.selectedCategories = angular.copy($scope.chooseCategories[0]);
              $scope.modal2.hide();
          }
           else if(myid==3)
          {
         
  $scope.selectedCategories = angular.copy($scope.chooseCategories[0]);
              $scope.modal3.hide();
          }
           else if(myid==4)
          {
 $scope.selectedCategories = angular.copy($scope.chooseCategories[0]);
              $scope.modal4.hide();
          }
          else if(myid==5)
          {
    
 $scope.selectedCategories = angular.copy($scope.chooseCategories[0]);
             $scope.modal5.hide();
          }
           else if(myid==6){
  
 $scope.selectedCategories = angular.copy($scope.chooseCategories[0]);
            $scope.modal6.hide();
          }
           else if(myid==7){
     
             $scope.selectedCategories = angular.copy($scope.chooseCategories[0]);
            $scope.modal7.hide();
          }
           else if(myid==8){
      
             $scope.selectedCategories = angular.copy($scope.chooseCategories[0]);
            $scope.modal8.hide();
          }
          else if(myid==9){
   $scope.selectedCategories = angular.copy($scope.chooseCategories[0]);
            $scope.modal9.hide();
          }
         }
  $scope.closeModal=function(myid,index){
          
          if(myid==1){
            console.log("Me yaha hu",index);
        console.log($scope.chooseAutomotive[index].slug);
        globalCat=$scope.chooseAutomotive[index].slug;
        gKey=$scope.chooseAutomotive[index].keyword;
        $scope.searchFor=true;

             $scope.modal1.hide();
          }
          else if(myid==2){
                  console.log($scope.chooseEducation[index].slug);
        globalCat=$scope.chooseEducation[index].slug;
        gKey=$scope.chooseEducation[index].keyword;

          $scope.searchFor=true;
              $scope.modal2.hide();
          }
           else if(myid==3)
          {
            console.log("Me yaha hu",myid);
                console.log($scope.chooserestaurantsandfoods[index].slug);
        globalCat=$scope.chooserestaurantsandfoods[index].slug;
        gKey=$scope.chooserestaurantsandfoods[index].keyword;
             $scope.searchFor=true;
             console.log("Haan RES");
            

            $scope.searchFor=true;
              $scope.modal3.hide();
          }
           else if(myid==4)
          {
            console.log("Me yaha hu",myid);
                console.log($scope.chooseMen[index].slug);
        globalCat=$scope.chooseMen[index].slug;
        gKey=$scope.chooseMen[index].keyword;
             
             console.log("Haan Men");
            

            $scope.searchFor=true;
              $scope.modal4.hide();
          }
          else if(myid==5)
          {
            console.log("Me yaha hu",index);
                console.log($scope.chooseWomen[index].slug);
        globalCat=$scope.chooseWomen[index].slug;
        gKey=$scope.chooseWomen[index].keyword;
             $scope.searchFor=true;
             console.log("Haan Women");
             

             $scope.modal5.hide();
          }
           else if(myid==6){
            console.log("Me yaha hu",myid);
                console.log($scope.chooseKid[index].slug);
        globalCat=$scope.chooseKid[index].slug;
        gKey=$scope.chooseKid[index].keyword;
             $scope.searchFor=true;

            $scope.modal6.hide();
          }
           else if(myid==7){
            console.log("Me yaha hu",myid);
                console.log($scope.choosegenItem[index].slug);
        globalCat=$scope.choosegenItem[index].slug;
        gKey=$scope.choosegenItem[index].keyword;
             $scope.searchFor=true;
            
            $scope.modal7.hide();
          }
           else if(myid==8){
            console.log("Me yaha hu",myid);
                console.log($scope.choosehouseHold[index].slug);
        globalCat=$scope.choosehouseHold[index].slug;
        gKey=$scope.choosehouseHold[index].keyword;
             $scope.searchFor=true;
            
            $scope.modal8.hide();
          }
          else if(myid==9){
            console.log("Me yaha hu",myid);
                console.log($scope.choosePlace[index].slug);
        mapCat=$scope.choosePlace[index].slug;
        gKey=$scope.choosePlace[index].keyword;
            $scope.searchFor=false;
            $scope.modal9.hide();
          }
         }

 $scope.chooseAutomotive=[
        {categoryId : 0, name : "Choose Category", slug: "Choose Category" ,keyword:null},
        {categoryId : 1, name : "Auto Parts", slug: "autoParts" ,keyword:"car_repair" },
        {categoryId : 2, name : "Batteries", slug: "Batteries ",keyword:"car_repair"},
        {categoryId : 3, name : "Bicyle Repair Shop", slug: "bicyleShop" ,keyword:"bicycle_store"},{categoryId : 4, name : "Bike Repair Shop", slug: "bikeShop" ,keyword:"car_repair"},
        {categoryId : 5, name : "Car Repair Shop", slug: "carShop" ,keyword:"car_repair"},{categoryId : 6, name : "Rental", slug: "Rental" ,keyword:"car_rental"},{categoryId : 7, name : "ShowRooms", slug: "showRooms" ,keyword:"car_dealer"}, {categoryId : 8, name : "Washing", slug: "Washing" ,keyword:"car_wash"}    ];


  
         $scope.selectedAutomotive = angular.copy($scope.chooseAutomotive[0]);



 $ionicModal.fromTemplateUrl('automotive-modal.html', {
   id:"1",
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal1 = modal;
  });




 $scope.chooseEducation=[{categoryId : 0, name : "Choose Category", slug: "Choose Category" ,keyword:null},
        {categoryId : 1, name : "Books", slug: "Books",keyword:"book_store" },
        {categoryId : 2, name : "Fitness Equipments", slug: "fitnessEquipments",keyword:"grocery_or_supermarket"},
        {categoryId : 3, name : "Stationary", slug: "Stationary" ,keyword:"grocery_or_supermarket"},{categoryId : 4, name : "Sports Wear", slug: "sportsWear" ,keyword:"grocery_or_supermarket"},
        {categoryId : 5, name : "Sports Accessories", slug: "Accessories" ,keyword:"grocery_or_supermarket"}];

  
         $scope.selectedEducation = angular.copy($scope.chooseEducation[0]);

$scope.eduFunction=function(myid){
              console.log($scope.chooseEducation[myid].slug);
        globalCat=$scope.chooseEducation[myid].slug;
        gKey=$scope.chooseEducation[myid].keyword;
              closeModaledu();

            }


 $ionicModal.fromTemplateUrl('education-modal.html', {
  id:'2',
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal2 = modal;
  });



 $scope.chooserestaurantsandfoods=[
        {categoryId : 0, name : "Choose Category", slug: "Choose Category" ,keyword:null},
        {categoryId : 1, name : "Cafe", slug: "Cafe",keyword:"cafe" },
        {categoryId : 2, name : "Chaat & Gola Shop", slug: "chaatGolaShop",keyword:"cafe"},
        {categoryId : 3, name : "Coconut", slug: "Coconut" ,keyword:"grocery_or_supermarket"},{categoryId : 4, name : "Dhaba", slug: "Dhaba" ,keyword:"cafe"},
        {categoryId : 5, name : "Restaurants", slug: "Restaurants" ,keyword:"restaurant"},{categoryId : 6, name : "Soup", slug: "Soup" ,keyword:"restaurant"}
        ];

  
         $scope.selectedrestaurantsandfoods = angular.copy($scope.chooserestaurantsandfoods[0]);

$scope.restaurantsandfoodsFunction=function(myid){
              console.log($scope.chooserestaurantsandfoods[myid].slug);
        globalCat=$scope.chooserestaurantsandfoods[myid].slug;
        gKey=$scope.chooserestaurantsandfoods[myid].keyword;
              closeModalrestaurantsandfoods();

            }



   $ionicModal.fromTemplateUrl('restaurantsandfoods-modal.html', {
    id:'3',
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal3 = modal;
  });




  $scope.chooseMen=[
            {categoryId : 0, name : "Choose Category", slug: "Choose Category" ,keyword:null},
        {categoryId : 1, name : "Men's Wear", slug: "gentGarments",keyword:"clothing_store" },
        {categoryId : 2, name : "Watches/Wallet", slug: "Watches",keyword:"grocery_or_supermarket"},
        {categoryId : 3, name : "Men's UnderGarments", slug: "gentsUnderGarments" ,keyword:"grocery_or_supermarket"}, {categoryId : 4, name : "Men's Shoes", slug: "gentShoes", keyword:"shoe_store"},
      {categoryId : 5, name : "Perfumes", slug: "Perfume", keyword:"grocery_or_supermarket" } ,
      {categoryId : 6, name : "Men's Eye Wear", slug: "eyeWear", keyword:"grocery_or_supermarket" }  ];


            $scope.selectedMen = angular.copy($scope.chooseMen[0]);

  $ionicModal.fromTemplateUrl('men-modal.html', {
    id:'4',
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal4 = modal;
  });




  $scope.chooseWomen=[
        {categoryId : 0, name : "Choose Category", slug: "Choose Category" , keyword:null},
        {categoryId : 1, name : "Women's Wear", slug: "ladiesGarments" , keyword:"clothing_store"},
        {categoryId : 2, name : "Watches", slug: "Watches" , keyword:"grocery_or_supermarket"},
        {categoryId : 3, name : "Women UnderGarments", slug: "ladiesUnderGarments", keyword:"grocery_or_supermarket"},
        {categoryId : 4, name : "Women Shoes", slug: "ladiesShoes", keyword:"shoe_store"},
        {categoryId : 5, name : "Cosmetics", slug: "Cosmetics", keyword:"grocery_or_supermarket"},
        {categoryId : 6, name : "Women Eye Wear", slug: "eyeWear", keyword:"grocery_or_supermarket"},
        {categoryId : 7, name : "Women Jewelery", slug: "artificialJewelery", keyword:"jewelry_store"} ,   {categoryId : 8, name : "Hand Bags & Purses", slug: "handBag_purse_keyChain", keyword:"grocery_or_supermarket"}   ,   {categoryId : 9, name : "Perfumes", slug: "Perfume", keyword:"grocery_or_supermarket"}        ];

            $scope.selectedWomen = angular.copy($scope.chooseWomen[0]);

      

   $ionicModal.fromTemplateUrl('women-modal.html', {
    id:'5',
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal5 = modal;
  });



  $scope.chooseKid=[
          {categoryId : 0, name : "Choose Category", slug: "Choose Category" ,keyword:null},
        {categoryId : 1, name : "Kid's Wear", slug: "kidGarments",keyword:"clothing_store" },
        {categoryId : 2, name : "Kid's Shoes", slug: "kidShoes" ,keyword:"shoe_store"},
        {categoryId : 3, name : "Baby Products", slug: "babyProducts" ,keyword:"grocery_or_supermarket"},{categoryId : 4, name : "Toys", slug: "Toys" ,keyword:"grocery_or_supermarket"},
        {categoryId : 5, name : "Kid's Eye Wear", slug: "eyeWear" ,keyword:"grocery_or_supermarket"},{categoryId : 6, name : "Kid's Watches", slug: "Watches" ,keyword:"grocery_or_supermarket"}        ];

            $scope.selectedKid = angular.copy($scope.chooseKid[0]);



$ionicModal.fromTemplateUrl('kids-modal.html', {
    id:'6',
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal6 = modal;
  });


   $scope.choosegenItem=[
               {categoryId : 0, name : "Choose Category", slug: "Choose Category" ,keyword:null},
        {categoryId : 1, name : "Grocery", slug: "Groceries",keyword:"grocery_or_supermarket" },
        {categoryId : 2, name : "Sweets and Mithai", slug: "Sweets",keyword:"grocery_or_supermarket"},
        {categoryId : 3, name : "Vegetables", slug: "Vegetables" ,keyword:"grocery_or_supermarket"},{categoryId : 4, name : "Bakery", slug: "bakery" ,keyword:"bakery"},
        {categoryId : 5, name : "Fruits ", slug: "Fruits" ,keyword:"grocery_or_supermarket"},{categoryId : 6, name : "Pharmacy", slug: "pharmacy" ,keyword:"pharmacy"},{categoryId : 7, name : "Aquarium", slug: "aquarium" ,keyword:"aquarium"}, {categoryId : 8, name : "Movie and Games", slug: "movieGames" ,keyword:"movie_rental"},{categoryId : 9, name : "Gifts", slug: "Gifts" ,keyword:"grocery_or_supermarket"},{categoryId : 10, name : "Dairy Product", slug: "dairyProduct" ,keyword:"bakery"}, {categoryId : 11, name : "Pan Shop", slug: "Tobacco" ,keyword:"grocery_or_supermarket"},{categoryId : 12, name : "Mobile Cards and Easy Load", slug: "mobileCards" ,keyword:"grocery_or_supermarket"}     ];

            $scope.selectedgenItem = angular.copy($scope.choosegenItem[0]);


   $ionicModal.fromTemplateUrl('generalitems-modal.html', {
    id:'7',
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal7 = modal;
  });



   $scope.choosehouseHold=[
             { categoryId : 0, name : "Choose Category", slug: "Choose Category" ,keyword:null},
        {categoryId : 1, name : "Computer", slug: "Computer",keyword:"electronics_store" },
        {categoryId : 2, name : "Electronics Appliances", slug: "electronicAppliances",keyword:"electronics_store"},
        {categoryId : 3, name : "Electric Items", slug: "Electronics" ,keyword:"electronics_store"},{categoryId : 4, name : "Furniture", slug: "Furniture" ,keyword:"furniture_store"},
        {categoryId : 5, name : "Hardware", slug: "Hardware" ,keyword:"furniture_store"},{categoryId : 6, name : "Paints", slug: "Paints" ,keyword:"painter"},{categoryId : 7, name : "Sanitary", slug: "Sanitary" ,keyword:"plumber"}, {categoryId : 8, name : "Mobile", slug: "Mobile" ,keyword:"electronics_store"}  ];

            $scope.selectedhouseHold = angular.copy($scope.choosehouseHold[0]);




  $ionicModal.fromTemplateUrl('householdgoods-modal.html', {
    id:'8',
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal8 = modal;
  });


  $scope.choosePlace=[
         {categoryId : 0, name : "Choose Category", slug: "Choose Category" ,keyword:""},
 {categoryId : 1, name : "Hospital", slug: "hospital",keyword:"hospital" },
 {categoryId : 2, name : "Airport", slug: "airport",keyword:"airport"},
 {categoryId : 3, name : "Amusement Park", slug: "amusement_park" ,keyword:"amusement_park"},
{categoryId : 4, name : "Travel Agency", slug: "travel_agency" ,keyword:"travel_agency"},
{categoryId : 5, name : "Art Gallery", slug: "art_gallery" ,keyword:"art_gallery"},
{categoryId : 6, name : "Atm", slug: "atm" ,keyword:"atm"},
{categoryId : 7, name : "Zoo", slug: "zoo" ,keyword:"zoo"}, 
{categoryId : 8, name : "Bank", slug: "bank" ,keyword:"bank"},
{categoryId : 9, name : "Bar", slug: "bar" ,keyword:" bar"},
{categoryId : 10, name : "Beauty Saloon", slug: "beauty_salon" ,keyword:"beauty_salon"},
{categoryId : 11, name : "Bowling Alley", slug: "bowling_alley" ,keyword:"bowling_alley"},
{categoryId : 12, name : "Bus Station", slug: "bus_station" ,keyword:"bus_station"},
{categoryId : 13, name : "Campground", slug: "campground" ,keyword:"campground"},
{categoryId : 14, name : "Casino", slug: "casino" ,keyword:"casino"},
{categoryId : 15, name : "Cemetry", slug: "cemetery" ,keyword:"cemetery"},
{categoryId : 16, name : "Church", slug: "church" ,keyword:"church"},
{categoryId : 17, name : "City Hall", slug: "city_hall" ,keyword:"city_hall"},
{categoryId : 18, name : "Court House", slug: "courthouse" ,keyword:"courthouse"},
{categoryId : 19, name : "Embassy", slug: "embassy" ,keyword:"embassy"},
{categoryId : 20, name : "Fire Station", slug: "fire_station" ,keyword:"fire_station"},
{categoryId : 21, name : "Funeral Home", slug: "funeral_home" ,keyword:"funeral_home"},
{categoryId : 22, name : "Furniture Store", slug: "furniture_store" ,keyword:"furniture_store"},
{categoryId : 23, name : "Gas Station", slug: "gas_station" ,keyword:"gas_station"},
{categoryId : 24, name : "Gym", slug: "gym" ,keyword:"gym"},
{categoryId : 25, name : "Hair Care", slug: "hair_care" ,keyword:"hair_care"},
{categoryId : 26, name : "Hindu Temple", slug: "hindu_temple" ,keyword:"hindu_temple"},
{categoryId : 27, name : "Real Estate Agency", slug: "real_estate_agency" ,keyword:"real_estate_agency"},
{categoryId : 28, name : "Laundry", slug: "laundry" ,keyword:"laundry"},
{categoryId : 29, name : "Library", slug: "library" ,keyword:"library"},
{categoryId : 30, name : "Liquor Store", slug: "liquor_store" ,keyword:"liquor_store"},
{categoryId : 31, name : "Lock Smith", slug: "locksmith" ,keyword:"locksmith"},
{categoryId : 32, name : "Masjid", slug: "mosque" ,keyword:"mosque"},
{categoryId : 33, name : "Veterinary Care", slug: "veterinary_care" ,keyword:"veterinary_care"},
{categoryId : 34, name : "Movie Theater", slug: "movie_theater" ,keyword:"movie_theater"},
{categoryId : 35, name : "Museum", slug: "museum" ,keyword:"museum"},
{categoryId : 36, name : "Night Club", slug: "night_club" ,keyword:"night_club"},
{categoryId : 37, name : "Park", slug: "park" ,keyword:"park"},
{categoryId : 38, name : "Pet Store", slug: "pet_store" ,keyword:"pet_store"},
{categoryId : 39, name : "University", slug: "university" ,keyword:"university"},
{categoryId : 40, name : "Physiotherapist", slug: "physiotherapist" ,keyword:"physiotherapist"},
{categoryId : 41, name : "Post Office", slug: "post_office" ,keyword:"post_office"},
{categoryId : 42, name : "School", slug: "school" ,keyword:"school"},
{categoryId : 43, name : "Shopping Mall", slug: "shopping_mall" ,keyword:"shopping_mall"},
{categoryId : 44, name : "Spa", slug: "spa" ,keyword:"spa"},
{categoryId : 45, name : "Stadium", slug: "stadium" ,keyword:"stadium"},
{categoryId : 46, name : "Train Station", slug: "train_station" ,keyword:"train_station"}
];

            $scope.selectedPlace= angular.copy($scope.choosePlace[0]);

       
  $ionicModal.fromTemplateUrl('places-modal.html', {
    id:'9',
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal9 = modal;
  });




var boo=0;

var nowShow=false;
$scope.mapItem=false;

function initialize1() {
  var pyrmont;
 var mapOptions
var ind=null;
                 console.log("here")
          //event.preventDefault();
       
      if (navigator.geolocation) {
map = new google.maps.Map(document.getElementById('map-canvas'),mapOptions );
          var request = {
            location: pos,
            radius: 1000,
            types: [gKey]
            };
           ind=null;  
          var service = new google.maps.places.PlacesService(map);
          service.nearbySearch(request, callback);

    } else {
        // Browser doesn't support Geolocation
        alert("Please Open Your GPS");
        handleNoGeolocation(false);
    }
}
function initialize2() {
  var pyrmont;
 var mapOptions
var ind=null;
                 console.log("here")
          //event.preventDefault();
       
      if (navigator.geolocation) {
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
                 mapOptions = {
                  center:pos,
                zoom: 15,
               mapTypeId: google.maps.MapTypeId.ROADMAP
              };

     
            
        });


    } else {
        // Browser doesn't support Geolocation
        alert("Please Open Your GPS");
        handleNoGeolocation(false);
    }
}

function callback(results, status,pagination) {
  
           
  if (status == google.maps.places.PlacesServiceStatus.OK) {
      createMarker(results);


  }
}

var myMarker=[];
var store;
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
    var contentString = '<div>'+
      '<div>'+
      '</div>'+
      '<h3>'+ place.name+'</h3>'+
      '<div>'+
      '<p></br></br><strong>For delivery:</strong> </br> Call Now: +923332571546 </p>'+
      '</div>'+
      '</div>';
      var infowindow = new google.maps.InfoWindow({
    content: contentString,
    maxWidth: 200
  });
  var marker = new google.maps.Marker({
    map: map,
    location : pos,
    title:place.name,
    position: place.geometry.location,
     icon: "img/g.png"
  });
  
   bounds.extend(place.geometry.location);
          marker.addListener('click', function() {
           infowindow.open(map, marker);
            });
}
console.log("Here is places",places);
  $scope.extras=places;
 





     var marker1 = new google.maps.Marker({
            position: pos,
            icon: "img/ic.png",
            animation: google.maps.Animation.DROP
              });
     var infowindow1 = new google.maps.InfoWindow({
                map: map,
                position: pos,
                
            });
            marker1.addListener('click', toggleBounce);
              infowindow1.setContent("Me");
              marker1.setMap(map);
             map.setCenter(pos);
             map.fitBounds(bounds);

function toggleBounce() {
  if (marker.getAnimation() !== null) {
    marker.setAnimation(null);
  } else {
    marker.setAnimation(google.maps.Animation.BOUNCE);
  }
}

map.setZoom(15);
}

   $scope.showMap=function() {

   show2();

  } 
function show2(){
 console.log("call hua")
    $scope.Results=false;
    $scope.mapItem=true;
    $scope.mylist=true;
    $scope.mymap=false;

/*    $scope.categoriesMap=false;


*/
}

function clickone(store){
 // initialize1();

var searchResult=[];
console.log(store);

  var j=0
  if(globalCat==null && mapCat==null){
    alert("Please Choose Category");
  }
  else{
  if(store==null && $scope.searchFor==true){
    alert("Please input your search");
  }
       else{

        
        if(mapCat == null){
          if(store.length > 2){
        console.log(globalCat);
  var myObj={search:store , category : globalCat, lat:slat, lon:slong};
  var shopname=[];
  var shoparea=[];
  var shopcover=[];
  var shopcategory=[];
  var shopid=[];
       myService.sendSearch(myObj).success(function(res){
  if(res==true){
    console.log("itemFound");
$scope.mapItem=true;
   $scope.Results=false;
    $scope.mymap=false;
     $scope.mylist=true;
    myService.getShop(myObj).success(function(res){

    

      for(var i in res){
        shopname.push(res[i].shopName);
        shoparea.push(res[i].shopArea);
        shopcover.push(res[i].shopCover);
        shopcategory.push(res[i].categoryName);
        shopid.push(res[i]._id);

         var myLl = new google.maps.LatLng(res[i].shopLat, res[i].shopLong);
        var marker = new google.maps.Marker({
        position: myLl,
       title:res[i].shopName
      });
      marker.setMap(map);
    }
     var myData = shopname.map(function(value, index) {
    return {
        name: value,
        area: shoparea[index],
        cover: shopcover[index],
        category:shopcategory[index],
        _id:shopid[index]
    }
  });
  console.log(myData);
    $scope.categoriesMap=false;
       $scope.places=myData;
});

    }
       else{
       alert("Not Found");
       }
});
}
else
 alert("Not Found");
    }

    else{
       var myObj={search:store , category : mapCat, lat:slat, lon:slong};
       var shopname=[];
      var shoparea=[];
  var shopcover=[];
  var shopcategory=[];
  var shopid=[];
 myService.getShop(myObj).success(function(res){
   $scope.mapItem=true;
   $scope.Results=false;
    $scope.mymap=false;
     $scope.mylist=true;
      for(var i in res){
        shopname.push(res[i].shopName);
        shoparea.push(res[i].shopArea);
        shopcover.push(res[i].shopCover);
        shopcategory.push(res[i].categoryName);
        shopid.push(res[i]._id);

         var myLl = new google.maps.LatLng(res[i].shopLat, res[i].shopLong);
        var marker = new google.maps.Marker({
        position: myLl,
        icon:"img/l.png",
       title:res[i].shopName
      });
      marker.setMap(map);
    }
     var myData = shopname.map(function(value, index) {
    return {
        name: value,
        area: shoparea[index],
        cover: shopcover[index],
        category:shopcategory[index],
        _id:shopid[index]
    }
  });

 console.log(myData);
    $scope.categoriesMap=false;
       $scope.places=myData;
     
});

    }
  }
}
}
var dk=0;

   



$scope.searchThis=function(store1){
   $scope.Results=false;
    $scope.mymap=false;
     $scope.focus=true;
dk=1;

  initialize1();
  store=store1;
clickone(store);

}
}]);