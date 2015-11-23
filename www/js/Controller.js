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
}]).controller('getDetails', ['$scope', 'myService', '$stateParams', '$location','$state',function ($scope, myService, $stateParams,$location,$state
    ) {
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
             $state.go($state.current, {}, {reload: true});
          }
          else{
            alert("Please try again later")
          }


    });

    };

   
    myService.getShopsWithId($scope.id).success(function (res) {
        $scope.product = res.Shop;
        $scope.loader=true;

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

    });

}]).controller('Main', ['$scope', 'myService','$location', function ($scope, myService,$location) {            

  $scope.sendPic=function(){
    console.log($scope.shopAddr);
    console.log($scope.pic);
  }
    
}]).controller('Maps', ['$scope', 'myService','$location','$ionicModal', function ($scope, myService,$location,$ionicModal) {
  var map;
var infowindow;
var pos;
var slat=null;
var slong=null;
var gKey;
 $scope.searchFor=true;
var globalCat=null;
var mapCat=null;
$scope.mylist=false;
$scope.mymap=true;
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
        {categoryId : 3, name : "Restaurant And Foods", slug: "restaurant_Foods"},{categoryId : 4, name : "Men", slug: "Men"},
        {categoryId : 5, name : "Women", slug: "Women"},{categoryId : 6, name : "Kids", slug: "Kids"},
        {categoryId : 7, name : "General Items", slug: "generalItems"},{categoryId : 8, name : "House Hold & Tech.", slug: "houseHoldGoods"},
        {categoryId : 9, name : "Places", slug: "Places"}    ];


  $scope.showList=function(){
    $scope.mapItem=false;
    $scope.Results=true;
    $scope.mymap=true;
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
        {categoryId : 5, name : "Sports Accessories", slug: "sportsAccesories" ,keyword:"grocery_or_supermarket"}];

  
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
        {categoryId : 0, name : "Choose Category", slug: "Choose Category" ,keyword:null},
        {categoryId : 1, name : "", slug: "",keyword:"" },
        {categoryId : 2, name : "", slug: "",keyword:""},
        {categoryId : 3, name : "", slug: "" ,keyword:""},{categoryId : 4, name : "", slug: "" ,keyword:""},
        {categoryId : 5, name : "", slug: "" ,keyword:""},{categoryId : 6, name : "", slug: "" ,keyword:""},{categoryId : 7, name : "", slug: "" ,keyword:""}, {categoryId : 8, name : "", slug: "" ,keyword:""},{categoryId : 9, name : "", slug: "" ,keyword:""},{categoryId : 10, name : "", slug: "" ,keyword:""}, {categoryId : 11, name : "", slug: "" ,keyword:""},{categoryId : 12, name : "", slug: "" ,keyword:""},{categoryId : 13, name : "", slug: "" ,keyword:""}, {categoryId : 14, name : "", slug: "" ,keyword:""},{categoryId : 15, name : "", slug: "" ,keyword:""},{categoryId : 16, name : "", slug: "" ,keyword:""}, {categoryId : 17, name : "", slug: "" ,keyword:""},{categoryId : 18, name : "", slug: "" ,keyword:""},{categoryId : 19, name : "", slug: "" ,keyword:""}, {categoryId : 20, name : "", slug: "" ,keyword:""},{categoryId : 21, name : "", slug: "" ,keyword:""},{categoryId : 22, name : "", slug: "" ,keyword:""}, {categoryId : 23, name : "", slug: "" ,keyword:""},{categoryId : 24, name : "", slug: "" ,keyword:""},{categoryId : 25, name : "", slug: "" ,keyword:""}, {categoryId : 26, name : "", slug: "" ,keyword:""},{categoryId : 27, name : "", slug: "" ,keyword:""},{categoryId : 28, name : "", slug: "" ,keyword:""}, {categoryId : 29, name : "", slug: "" ,keyword:""},{categoryId : 30, name : "", slug: "" ,keyword:""},{categoryId : 31, name : "", slug: "" ,keyword:""}, {categoryId : 32, name : "", slug: "" ,keyword:""},{categoryId : 33, name : "", slug: "" ,keyword:""},{categoryId : 34, name : "", slug: "" ,keyword:""}, {categoryId : 35, name : "", slug: "" ,keyword:""},{categoryId : 36, name : "", slug: "" ,keyword:""},{categoryId : 37, name : "", slug: "" ,keyword:""}, {categoryId : 38, name : "", slug: "" ,keyword:""},{categoryId : 39, name : "", slug: "" ,keyword:""},{categoryId : 40, name : "", slug: "" ,keyword:""}, {categoryId : 41, name : "", slug: "" ,keyword:""},{categoryId : 42, name : "", slug: "" ,keyword:""},{categoryId : 43, name : "", slug: "" ,keyword:""}, {categoryId : 44, name : "", slug: "" ,keyword:""},{categoryId : 45, name : "", slug: "" ,keyword:""},{categoryId : 46, name : "", slug: "" ,keyword:""}, {categoryId : 47, name : "", slug: "" ,keyword:""},{categoryId : 48, name : "", slug: "" ,keyword:""},{categoryId : 49, name : "", slug: "" ,keyword:""}, {categoryId : 50, name : "", slug: "" ,keyword:""},{categoryId : 51, name : "", slug: "" ,keyword:""},{categoryId : 52, name : "", slug: "" ,keyword:""}, {categoryId : 53, name : "", slug: "" ,keyword:""},{categoryId : 54, name : "", slug: "" ,keyword:""},{categoryId : 55, name : "", slug: "" ,keyword:""} ];

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
myService.sendProducts().success(function(res){
  if(res==true){
    console.log("done");
  }
});


function initialize() {
  var pyrmont;
  var mapOptions = {
        zoom: 25,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
 map = new google.maps.Map(document.getElementById('map-canvas'),mapOptions );
var ind=null;
                 console.log("here")
                // console.log(store);
/*var Keyword=store.toLowerCase();
for(var i=0;i<keyWords.length;i++){
    if(keyWords[i].search(Keyword)!= -1){
        ind=i;
        break;
    }
}*/

    


          event.preventDefault();
       
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
             infowindow = new google.maps.InfoWindow({
                map: map,
                position: pos,
                
            });
           
  
       
        });

$scope.searchThis=function(store){

           console.log("This is the keyword",gKey);
              var marker1 = new google.maps.Marker({
            position: pos,
            icon: "img/ambulance1.png"
              });
              infowindow.setContent("Me");
              marker1.setMap(map);
             map.setCenter(pos);
        
             var request = {
            location: pos,
            radius: 1000,
            types: [gKey]
            };
           ind=null;
        infowindow = new google.maps.InfoWindow();
  
          var service = new google.maps.places.PlacesService(map);
          service.nearbySearch(request, callback);
var searchResult=[];
console.log(store);

  var j=0
  if(globalCat==null){
    alert("Please Choose Category");
  }
       else{

        if(mapCat == null){
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

    myService.getShop(myObj).success(function(res){
    boo=1;
      $scope.mapItem=false;
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
     
      

      //createMarkers(res);

    
       
});

    
    }
       else{

        alert("Not Found");
       }


      });
    }
    else{
       var myObj={search:store , category : mapCat, lat:slat, lon:slong};
       var shopname=[];
      var shoparea=[];
  var shopcover=[];
  var shopcategory=[];
  var shopid=[];
 myService.getShop(myObj).success(function(res){
      $scope.Results=true;
      $scope.mapItem=false;
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
     
      

      //createMarkers(res);

    
       
});

    }
     if(boo==1){
  $scope.Results=true;
 }


}




},function() {
            handleNoGeolocation(true);
        };
    } else {
        // Browser doesn't support Geolocation
        alert("Please Open Your GPS");
        handleNoGeolocation(false);
    }
}

function callback(results, status,pagination) {
  
           
  if (status == google.maps.places.PlacesServiceStatus.OK) {
  $scope.Results=true;

      createMarker(results);


  }
}

var myMarker=[];
function createMarkers(places) {
   var bounds = new google.maps.LatLngBounds();
alert(2);
   for (var i in places) {
    console.log(places[i].shopLat, places[i].shopLong);
       var myLatLng = new google.maps.LatLng(places[i].shopLat, places[i].shopLong);

  var marker = new google.maps.Marker({
    map: map,
    location : pos,
    title:places[i].shopName,
    position: myLatLng,
    icon: "img/ambulance1.png"
  });
  myMarker.push(marker);


}

for(var k=0 ;k<myMarker.length ; k++){
  myMarker[k].setMap(map);
     bounds.extend(myLatLng);
}
      map.fitBounds(bounds);
  /*google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent(places[i].shopName);
 
    infowindow.open(map, this);

  });*/
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
console.log("Here is places",places);
  $scope.extras=places;
 map.fitBounds(bounds);
  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent(place.name);
 
    infowindow.open(map, this);

  });
}

   $scope.showMap=function() {
    console.log("call hua")
    $scope.Results=false;
    $scope.categoriesMap=false;
$scope.mapItem=true;
$scope.mymap=false;
$scope.mylist=true;
  }
     
       

google.maps.event.addDomListener(window, 'load', initialize);

  
}]);
















