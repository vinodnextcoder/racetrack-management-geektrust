/**
 * todo code is incomplete
 */
const fs = require("fs");
const filename = process.argv[2];
//TODO need to fix total count value
let total =0;
let trackInfo = {
    BIKE_REGULAR: {
        vehicle: "BIKE",
        name:"BIKE_REGULAR",
        NUM: 4,
        COST: 60,
        BOOK: []
        , COUNT: 0
    },
    CAR_REGULAR: {
        vehicle: "CAR",
        name:"CAR_REGULAR",
        NUM: 3,
        COST: 120,
        BOOK: []
        , COUNT: 0
    },
    CAR_VIP: {
        vehicle: "CAR",
        name:"CAR_VIP",
        NUM: 1,
        COST: 250,
        BOOK: []
        , COUNT: 0
    },
    SUV_REGULAR: {
        vehicle: "SUV",
        name:"SUV_REGULAR",
        NUM: 2,
        COST: 200,
        BOOK: []
        , COUNT: 0
    },
    SUV_VIP: {
        vehicle: "SUV",
        name:"SUV_VIP",
        NUM: 1,
        COST: 300,
        BOOK: []
        , COUNT: 0
    }
};

let vipCost =0;
let vehicleList = [];
let vehicleListExtraTime = [];
function main(dataInput) {
    var inputLines = dataInput.toString().split("\n")
    for (i = 0; i < inputLines.length; i++) {
        if (inputLines) {
            let input = inputLines[i].split(' ')
            switch (input[0]) {
                case 'REVENUE':
                    printInfo();
                    break;
                case 'BOOK':
                    addBooking(input[1], input[2], input[3]);
                    break;
                case 'ADDITIONAL':
                    addExtra(input[1], input[2]);
                    break;
            }
        }
    }
}
const addBooking = (type, number, time) => {
    let timeSplit = time.split(":")
    if((timeSplit[0]>=11 && timeSplit[0]<13 ) || timeSplit[0]>17){
        console.log('INVALID_ENTRY_TIME');
        return;
    }
    let vehicleInfo = trackInfo[type+'_REGULAR'];
    if(vehicleInfo.name === 'SUV_REGULAR' && vehicleInfo.COUNT==2){
        vehicleInfo = {}
        vehicleInfo = trackInfo[type+'_VIP'];
        
    }
    if(vehicleInfo.name === 'SUV_VIP' && vehicleInfo.COUNT==1){
        console.log('RACETRACK_FULL');
        return;
    }
    if(vehicleInfo.name === 'CAR_REGULAR' && vehicleInfo.COUNT==3){
        vehicleInfo = {}
        vehicleInfo = trackInfo[type+'_VIP'];
        
    }
    if(vehicleInfo.name === 'CAR_VIP' && vehicleInfo.COUNT==1){
        console.log('RACETRACK_FULL');
        return;
    }
    
    vehicleInfo.BOOK.push({type, number, time,price:vehicleInfo.COST,typeName:vehicleInfo.name});
    let endtime = parseInt(timeSplit[0])+3;
    let newEndTom =endtime +':'+timeSplit[1]

    vehicleList.push({type, number, time,newEndTom,price:vehicleInfo.COST,typeName:vehicleInfo.name})
    if (vehicleInfo.name == 'SUV_VIP' || vehicleInfo.name == 'CAR_VIP' ){
        vipCost = vipCost + (parseInt(vehicleInfo.COST)*3);
    }
    else {
        total =  total + (parseInt(vehicleInfo.COST)*3);
    }
    vehicleInfo.COUNT =vehicleInfo.COUNT + 1
    // console.log('================', vehicleInfo);
    console.log('SUCCESS');
}
const addExtra = (number, time) => {
 
    let findVehicle = vehicleList.find(item=>item.number===number);     
    let timeSplit = time.split(":")
    let endTime = findVehicle.newEndTom.split(":")
    let hourCal = timeSplit[0] - endTime[0];
    if((parseInt(timeSplit[0])>=11 && parseInt(timeSplit[0])<13)){
        console.log('INVALID_ENTRY_TIME');
        return;
    }
    if(parseInt(timeSplit[0])>=20){
        console.log('INVALID_ENTRY_TIME');
        return;
    }
    if(findVehicle){
        
    if(parseInt(hourCal) ==0 && parseInt(timeSplit[1])<60){
        total += (50);
        vehicleListExtraTime.push({...findVehicle,extraCost:50})
    }
    
    if(parseInt(hourCal) >0){
        vehicleListExtraTime.push({...findVehicle,extraCost:(50*2)})
        total += (50*2);
    }
}
    console.log('SUCCESS');
}
const printInfo = () => {
    let vipTotal=0;
    let Total=0;
    for(j=0;j<vehicleList.length;j++){
        if(vehicleList[j] && vehicleList[j].typeName === 'CAR_VIP' || vehicleList[j].typeName === 'SUV_VIP'){
            vipTotal =vipTotal + (vehicleList[j].price*3)
        }
        else{
            Total =Total + (vehicleList[j].price*3)
        }
    }
    for(k=0;k<vehicleListExtraTime.length;k++){
        Total =Total + (vehicleListExtraTime[k].extraCost)
       
    }
    console.log(Total, ' ', vipTotal)
}
data = fs.readFileSync(process.argv[2]).toString();
main(data);
module.exports = { main }
