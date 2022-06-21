/**
 * todo code is incomplete
 */
const fs = require("fs");
const internal = require("stream");
const filename = process.argv[2];
let total =0;
let trackInfo = {
    BIKE_REGULAR: {
        vehicle: "BIKE",
        NUM: 4,
        COST: 60,
        BOOK: []
        , COUNT: 0
    },
    CAR_REGULAR: {
        vehicle: "CAR",
        NUM: 3,
        COST: 120,
        BOOK: []
        , COUNT: 0
    },
    CAR_VIP: {
        vehicle: "CAR",
        NUM: 1,
        COST: 250,
        BOOK: []
        , COUNT: 0
    },
    SUV_REGULAR: {
        vehicle: "SUV",
        NUM: 2,
        COST: 200,
        BOOK: []
        , COUNT: 0
    },
    SUV_VIP: {
        vehicle: "SUV",
        NUM: 1,
        COST: 300,
        BOOK: []
        , COUNT: 0
    }
}
let vipCost =0;
let vehicleList = [];
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
    let vehicleInfo = trackInfo[type+'_REGULAR'];
    // vehicleInfo[type]
    let timeSplit = time.split(":")
    if(timeSplit[0]>=11 && timeSplit[0]<13){
        console.log('INVALID_ENTRY_TIME');
        return;
    }
    vehicleInfo.BOOK.push({type, number, time,price:vehicleInfo.COST});
    let endtime = parseInt(timeSplit[0])+3;
    let newEndTom =endtime +':'+timeSplit[1]

    vehicleList.push({type, number, time,newEndTom,price:vehicleInfo.COST})
    // if (type+'_VIP' == 'SUV_VIP'){
    //     vipCost = vipCost + (parseInt(vehicleInfo.COST)*3);
    // }
    total =  total + (parseInt(vehicleInfo.COST)*3);
    vehicleInfo.COUNT +=1
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
    }
    if(parseInt(hourCal) >0){
        total += (50*2);
    }
}
    console.log('SUCCESS');
}
const printInfo = () => {
    console.log(total, ' ', vipCost)
}
data = fs.readFileSync(process.argv[2]).toString();
main(data);
module.exports = { main }
