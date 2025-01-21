import moment from "moment";

function minuteDiff(data1 = new Date(), data2) {
    // Converta as datas para objetos Moment
    const momento1 = moment(data1);
    const momento2 = moment(data2);

    // Calcule a diferença em minutos
    const diffMinutes = Math.abs(momento1.diff(momento2, 'minutes'));

    // Verifique se a diferença é menor que 10
    return diffMinutes;
}

export { minuteDiff };