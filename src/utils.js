var Total_hour = '9.30',
    Paid_hour = '8.00',
    Extra_hour = '0.40';

var conversionInMinutes = hour => Math.floor(hour) * 60 + (hour - (Math.floor(hour))) * 100;
var conversionInHours = min => Math.floor( min/60 ) + min % 60 / 100;
var Remaining_hour = conversionInMinutes(Total_hour) - conversionInMinutes(Paid_hour) - conversionInMinutes(Extra_hour);

console.log(conversionInHours(Remaining_hour).toFixed(2));