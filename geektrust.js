/**
 * todo code is incomplete
 */
const fs = require("fs");
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
    vehicleInfo.BOOK.push({type, number, time});
    if (type+'_VIP' == 'SUV_VIP'){
        vipCost = vipCost + vehicleInfo.COST;
    }
    total =  total + vehicleInfo.COST;
    vehicleInfo.COUNT +=1
    console.log('SUCCESS');
}
const addExtra = (number, time) => {
    // console.log(number,time);
    let timeSplit = time.split(":")
    if((timeSplit[0]>=11 && timeSplit[0]<13) || timeSplit[0]>20){
        console.log('INVALID_ENTRY_TIME');
        return;
    }
    console.log('SUCCESS');
}
const printInfo = () => {
    console.log(total, ' ', vipCost)
}
data = fs.readFileSync(process.argv[2]).toString();
main(data);
module.exports = { main }
