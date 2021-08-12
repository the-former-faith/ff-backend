import * as chrono from 'chrono-node'

const removeSpecialCharacters = (s) => s.replaceAll(/\[|\]/g, '')
const re = new RegExp(/circa|ca\.|c(?=[0-9]{4})|c\.(?=[0-9]{4})|c\./, 'g')

const checkIfCirca = (o) => {
    const value = o.date.time
    const newValue = value.replaceAll(re, '')
    o.date.isCirca = value !== newValue
    o.date.time = removeSpecialCharacters(newValue)
    return o
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

const checkForSplit = (o) => {
    const value = o.date.time

    const decadeRange = handleDecadeRangeSplit(value)
    const splitValue = decadeRange ? decadeRange : handleRegularSplit(value)

    if (splitValue) {
        o.date.time = splitValue[0]
        o.date.isCirca = true
        o.dateEnd = { time: splitValue[1], isCirca: true,  precision: 0 }
    }

    return o
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

const runChrono = (o) => {
    const results = chrono.parse(o.time)

    if (results.length > 0) {
        const result = results[0].start
        o.precision = getChronoPrecision(result)
        o.time = result.date().toISOString()
    } else {
        //Here check for just year
        const year = o.time.match(/([0-9]{4})/)

        if (year) {
            o.precision = 9
            o.time = new Date(year[0]).toISOString()
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

    const date = { date: { time: dateString, isCirca: false, precision: 9 } }

    //Check that it is not an actual date format
    if ( dateString.match(/([0-9]{4}-[0-9]{2}-[0-9]{2})/) ) return date
    
    const cleanedDate = checkIfCirca(date)

    const splitDate = checkForSplit(cleanedDate)

    const runChronoOnBothDates = objectMap(splitDate, (x) => {
        return runChrono(x)
    })
    
    return runChronoOnBothDates
}  

export default parseDate

// TODO: check for 1800s / late 1850s / early 1700 s