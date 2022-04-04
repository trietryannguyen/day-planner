$(document).ready(function() {


    getTodaysDate();
    getSavedDescriptions();
    getTimeSetColors();
    setTimeInterval();

   
    $("button").on("click", function() {        
    
        var enteredInput = $(this).siblings('.description').val();       

        
        if (enteredInput !== "") {
            var parentRowId = $(this).parent().attr('id'); 
            saveData(enteredInput, parentRowId);
        }
    })

    //get todays date
    function getTodaysDate() {
      
        $("#currentDay").text(moment().format('MMMM Do, YYYY'));
    };

    //get all of the saved descriptions for each hour
    function getSavedDescriptions() {
        $('div').each(function(index, value) {
          
            var divId = this.id;
            if (divId.includes("time")){                
                var savedValue = window.localStorage.getItem(divId)
                if (savedValue != null) {
                  
                    $(this).children('.description').val(savedValue);
                }
            }
          });


    };

   
    function getTimeSetColors() {
      
        $('div').each(function(index, value) {
           
            var divId = this.id;
            if (divId.includes("time")){
             
                var divTime = parseInt(divId);                
                var h = moment().format('H');

               
                if (divTime < h){                    
                    $(this).children('.description').attr("class","col-md-10 description past");
                }
                else if (divTime == h) {
                    $(this).children('.description').attr("class","col-md-10 description present");                    
                }
                else {
                    $(this).children('.description').attr("class","col-md-10 description future");                                        
                }
            }
        });
    };

    function setTimeInterval () {
        window.setInterval(getTimeSetColors, 30000);
    };

    function saveData(enteredInput, parentRowId){
         window.localStorage.removeItem(parentRowId);
         window.localStorage.setItem(parentRowId,enteredInput);
    };

    


    




});