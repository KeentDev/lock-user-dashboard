export const helper = {
  epochToHumanTime(epoch) {
    let currDivisor = [1,60,60,24,7,4];
    let unitTime = ['sec','min','hr','day','week'];
    let sentence = "";
    let majorTime;
    let minorTime;
    let majorTimeUnit;
    let minorTimeUnit;
    let i = 0;
    let isOverdue = false;
    let majorTimePhrase;
    let minorTimePhrase;

    if(epoch < 0){
      isOverdue = true;
      epoch *= -1;
    }

    majorTime = epoch;

    for(let realTime = 1; i < currDivisor.length; i++){
      majorTime /= currDivisor[i];
      realTime *= currDivisor[i+1];

      if((epoch) < (realTime)) break;
    }

    minorTime = Math.floor((majorTime - Math.floor(majorTime))*currDivisor[i]);
    majorTime = Math.floor(majorTime);
    majorTimeUnit = unitTime[i];
    minorTimeUnit = unitTime[i-1];

    majorTimePhrase = `${majorTime}${majorTimeUnit}${majorTime > 1 ? 's' : ''}`;
    minorTimePhrase = `${minorTime}${minorTimeUnit}${minorTime > 1 ? 's' : ''}`;
    
    sentence = `${majorTimePhrase}${i > 0 ? ' ' : ''}${ i == 0 ? '' : minorTimePhrase } ${isOverdue ? 'overdue' : 'left'}`;
    return {sentence, isOverdue};
  },

  getTimeLeft(epoch) {
    const currTime = Math.floor((new Date).getTime()/1000);
    return epoch - currTime;
  },

  transformHoursMinutesFormat(epoch) {
    let timeDateObj = new Date(epoch*1000);
    let hour = timeDateObj.getHours();
    let minute = timeDateObj.getMinutes();
    let meridiem = '';
    let format = '';

    if(hour >= 12){
      meridiem = 'pm';
      hour -= 12;
      if(hour == 0){
        hour = 12;
      }
    }else {
      meridiem = 'am';
      if(hour == 0){
        hour = 12;
      }
    }

    format = `${hour}:${minute > 9 ? '' : '0'}${minute}`;

    return {format, meridiem};
  }
}

export default helper