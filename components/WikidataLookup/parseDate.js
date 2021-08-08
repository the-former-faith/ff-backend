import * as chrono from 'chrono-node'

const removeSpecialCharacters = (s) => s.replaceAll(/\[|\]/g, '')
const re = new RegExp(/circa|ca\.|c(?=[0-9]{4})|c\.(?=[0-9]{4})|c\./, 'g')
const checkIfCirca = (date) => {
    const value = date.dateStart.value
    const newValue = value.replaceAll(re, '')
    date.dateStart.isCirca = value !== newValue
    date.dateStart.value = removeSpecialCharacters(newValue)
    return date
}

const handleDecadeRangeSplit = (s) => {
    //1817-18 but not 1880 - 1890
    const decades = s.match(/([1-9]{2})([0-9]{2})\s*(-|—|–)\s*([0-9]{2}(?=[^0-9]|$))/)

    return decades ? [`${decades[1]}${decades[2]}`, `${decades[1]}${decades[4]}`] : null
}

const handleRegularSplit = (s) => {
    const splitter = s.match(/(-|—|–|and)/)

    return splitter ? s.split(splitter[0]) : null
}


const checkForSplit = (date) => {
    const value = date.dateStart.value
    const decadeRange = handleDecadeRangeSplit(value)
    const splitValue = decadeRange ? decadeRange : handleRegularSplit(value)

    if (splitValue) {
        date.dateStart.value = splitValue[0]
        date.dateStart.isCirca = true
        date.dateEnd = { value: splitValue[1], isCirca: true,  precision: 0 }
    }

    return date
}

const getChronoPrecision = (x) => {
    if ( x.isCertain('day') ) {
        return 11
    } else if ( x.isCertain('month') ) {
        return 10
    } else {
        return 9
    }
}

const runChrono = async(o) => {
    const results = chrono.parse(o.value)

    if (results.length > 0) {
        const result = results[0].start
        o.precision = getChronoPrecision(result)
        o.value = result.date().toISOString()
    } else {
        //Here check for just year
        const year = o.value.match(/([0-9]{4})/)

        if (year) {
            o.precision = 9
            o.value = new Date(year[0]).toISOString()
        }
    }

    return o
} 

const objectMap = (object, mapFn) => {
    return Object.keys(object).reduce(function(result, key) {
      result[key] = mapFn(object[key])
      return result
    }, {})
}

const parseDate = async(dateString) => {

    const date = { dateStart: { value: dateString, isCirca: false, precision: 0 } }
    
    const cleanedDate = checkIfCirca(date)

    const splitDate = checkForSplit(cleanedDate)

    //For now I'm just running on start date, but will have to change to check both
    const runChronoOnBothDates = objectMap(splitDate, async(x) => {
        return await runChrono(x)
    })
    
    return runChronoOnBothDates
    //return { date: {time: date, isCirca: boolean, precision: number},  dateEnd: {time: date, isCirca: boolean, precision: number} }
}  

export default parseDate

//    TODO: check for 1800s / late 1850s / early 1700 s