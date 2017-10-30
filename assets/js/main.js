var result="";

function validateForm() {
    var x = document.forms["details"]["fname"].value;
    if (x == "") {
        alert("First name must be filled out.");
        return false;
    }
    result="Name : "+x;
    var x = document.forms["details"]["lname"].value;
    if (x == "") {
        alert("Last name must be filled out.");
        return false;
    }
    result=result+", "+x;

    var x = document.forms["details"]["email"].value;
    if (x == "") {
        alert("Email must be filled out.");
        return false;
    }
    
    
    var x = document.forms["details"]["age"].value;
    if (x == "") {
        alert("Age must be filled out.");
        return false;
    }else if(x<18){
        alert("Cannot book a car if under 18 years of age.");
        return false;
    }

    result=result+"\nVehicle Type : "+document.forms["details"]["vehicleType"].value;
    var fromDate = document.forms["details"]["fromDate"].value;
    if (fromDate == "") {
        alert("Booking from date must be filled out.");
        return false;
    }

    var toDate = document.forms["details"]["toDate"].value;
    if (toDate == "") {
        alert("Booking till data must be filled out.");
        return false;
    }

    result=result+"\nBooking : From "+fromDate+" till "+toDate;
    if(x>25){
        result=result+"\nTotal cost need to be paid for booking is $100";
    }else{
        
        result=result+"\nTotal cost need to be paid for booking is $150";
    }
    
    $("#result").html("Recept: \n"+result);
    alert(result);
}


function calculateCost(numberOfDays,costPerDay){
    if (typeof numberOfDays !== 'number' || typeof costPerDay !== 'number') {
        throw Error('One or more given arguments is not a number');
    }
    return numberOfDays*costPerDay;
}


function validateDate(fromDate,toDate){
    if (typeof fromDate !== 'Date' || typeof toDate !== 'Date') {
        throw Error('One or more given arguments is not a date');
    }
    return numberOfDays*costPerDay;
}
