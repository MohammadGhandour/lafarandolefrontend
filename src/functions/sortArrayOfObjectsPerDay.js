import moment from "moment";

export function sortArrayOfObjectsPerDay(arrayOfObjects, objectsName) {
    let days = arrayOfObjects.reduce((acc, object) =>
        acc.includes(
            moment(object.createdAt).day() &&
            moment(object.createdAt).month() &&
            moment(object.createdAt).year()
        ) ?
            acc : acc.concat(moment(object.createdAt).format('ll')),
        []);

    days = days.reduce((acc, date) =>
        acc.includes(date) ? acc : acc.concat(date),
        []
    );

    let arrayOfObjectsPerDay = [];

    days.map(day => {
        var singleDay = {};
        singleDay['date'] = day;
        singleDay[objectsName] = [];
        return arrayOfObjectsPerDay.push(singleDay);
    });

    arrayOfObjectsPerDay.map(day => {
        // eslint-disable-next-line
        return arrayOfObjects.map(object => {
            if (day.date === moment(object.createdAt).format('ll')) {
                day.expenses.push(object);
            }
        })
    });

    return arrayOfObjectsPerDay;
};
