import moment from 'moment';

export function deliveryFee(date, settings){
  if (moment().format("YYYY-MM-DD")===moment(date, "YYYY-MM-DD").subtract(1, "days").format("YYYY-MM-DD"))
    return settings.nextDayPrice;
  else if (moment().format("YYYY-MM-DD")===date)
    return settings.asapPrice;
  else
    return settings.deliveryPrice;
}
