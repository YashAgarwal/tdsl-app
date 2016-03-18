var ideal_diet = {protein:0, carbs:0, fat:0, fibre:40, ca:.6, ph:.6, mg:.34, zn:0, fe:.020, na:.5, k:.5, ma:.0035, cu:.002};
var data=[];
var est_diet = {protein:0, carbs:0, fat:0, fibre:0, ca:0, ph:0, mg:10, zn:0, fe:0, na:0, k:0, ma:.0, cu:0};
var deficiency = {protein:0, carbs:0, fat:0, fibre:0, ca:0, ph:0, mg:0, zn:0, fe:0, na:0, k:0, ma:.0, cu:0};
var nutrient = ["protein", "carbs", "fat", "fibre", "ca", "ph", "mg", "zn", "fe", "na", "k", "ma", "cu"];
$(document).ready(function(){
    $("#page2").hide();
    $("#page3").hide();
    $("#page4").hide();
    $("#page5").hide();
    
    $("#bp1").click(function(){
        $("#page1").hide();
        $("#page2").show();
    });
    
    $('#bp2').click(function(){
    name = $('#a').val();
    var weight = $('#b').val();
    var height = $('#c').val();
    var age_st = $('#d').val();
    var activity = $('input[name=activity]:checked').val();
    var gender = $('input[name=gender]:checked').val(); 
    var wt, ht, age;
    if (name==""||weight==""||height==""||age_st==""||typeof activity=="undefined"||typeof gender=="undefined") {Materialize.toast('Fill in complete details', 2000, 'rounded')}
    else {
    $('#page2').hide();
    $('#page3').show();
    ht = parseFloat(height);
    wt = parseFloat(weight);
    age=  parseFloat(age_st);
    }

    calculateIdealDiet(wt, ht, age, gender, activity);

    $("#result").html("Hello " + name + "<br/>" + "Protein     : " + ideal_diet["protein"] + "<br/>" + "Carbohydrates     : " + ideal_diet["carbs"] + "<br/>" + "Fat     : " + ideal_diet["fat"] + "<br/>" + "Fibre     : " + ideal_diet["fibre"] + "<br/>" + "Calcium     : " + ideal_diet["ca"] + "<br/>" + "Phosphorus     : " + ideal_diet["ph"] + "<br/>" + "Magnesium     : " + ideal_diet["mg"] + "<br/>" + "Zinc     : " + ideal_diet["zn"] + "<br/>" + "Iron     : " + ideal_diet["fe"] + "<br/>" + "Sodium     : " + ideal_diet["na"] + "<br/>"  + "Potesium     : " + ideal_diet["k"] + "<br/>" + "Mangnese     : " + ideal_diet["ma"] + "<br/>" + "Copper     : " + ideal_diet["cu"] + "<br/>");
    });
    $('#bp3').click(function(){
        $('#page3').hide();
        $('#page4').show();
    });
    $('#bp4').click(function(){
        $('#page4').hide();
        $('#page5').show();
        estimateDeficiency();
        $("#deficiency").html("Hello " + name + "<br/>" + "Protein     : " + deficiency["protein"] + "<br/>" + "Carbohydrates     : " + deficiency["carbs"] + "<br/>" + "Fat     : " + deficiency["fat"] + "<br/>" + "Fibre     : " + deficiency["fibre"] + "<br/>" + "Calcium     : " + deficiency["ca"] + "<br/>" + "Phosphorus     : " + deficiency["ph"] + "<br/>" + "Magnesium     : " + deficiency["mg"] + "<br/>" + "Zinc     : " + deficiency["zn"] + "<br/>" + "Iron     : " + deficiency["fe"] + "<br/>" + "Sodium     : " + deficiency["na"] + "<br/>"  + "Potesium     : " + deficiency["k"] + "<br/>" + "Mangnese     : " + deficiency["ma"] + "<br/>" + "Copper     : " + deficiency["cu"] + "<br/>");

    });

});


var calculateIdealDiet = function(weight, height, age, gender, activity){
    var bmr;
    var protein;
    var carbs;
    var fat;

    if (gender=='Male') {
        bmr = 10*weight+6.25*height+5*age+5;
        ideal_diet["zn"] = .012;
    } 
    else if (gender=='Female') {
        bmr = 10*weight+6.25*height+5*age-161;
        ideal_diet["zn"] = .010;
    }
    else{bmr = -1; ideal_diet["zn"]=-1;}
    
    switch(activity){
        case 'Seadantry':
            bmr = 1.2*bmr;
            break;
        case 'Lightly Active':
            bmr = 1.25*bmr;
            break;
        case 'Moderately Active':
            bmr = 1.55*bmr;
            break;
        case 'Very Active':
            bmr = 1.75*bmr;
            break;
        case 'Extremely Active':
            bmr = 2.05*bmr;
            break;
    }
    ideal_diet["protein"] = weight*2.20462;
    ideal_diet["fat"] = .325*bmr/9;
    ideal_diet["carbs"] = (bmr-(ideal_diet["protein"]*4+ideal_diet["fat"]*9))/4;
}; 

var estimateDeficiency = function(){
    $.each( deficiency, function( i, val ) {
        deficiency[i] = ideal_diet[i]-est_diet[i];
        if (deficiency[i]<0) {deficiency[i]=0;}
    });
}
