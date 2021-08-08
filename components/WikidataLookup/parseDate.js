import * as chrono from 'chrono-node'

const dates = [
'created/published: c1900.',
'1917',
'circa 1910',
'October 29, 1916',
'(Original text : From the 1800s)',
'June 25, 2016',
'between 1916 and 1917',
'[19]22 February 20.',
'ca. 1915',
'between 1887 and 1890',
'09/07/08',
'Exact date of issue for press release is unclear, however the text on the back of the photo promotes the upcoming episode "Aunt Grindl" for the television series Grindl to air on "Sunday May 4", 1964 (this is a typo, as May 4, 1964 was a Monday and the episode aired Sunday May 3, 1964)',
'Unknown date',
'June 1994',
'published 1914',
'circa 1870 ',
'Documentation compiled after 1933',
'July 1962',
'3 November 1953',
'late June 1960.',
'July 1956',
'between circa 1900 and circa 1982',
'between circa 1930 and circa 1945 ',
'circa 1950 s',
'circa 1911 –17',
'no later than 1916',
'between circa 1861 and circa 1863',
'circa 1862 -63 (Published 1889)',
'before 1892',
'circa 1862 Date Created/Published: New York : Geo. E. Perine, (between 1860 and 1900)'
]

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

//This is just for testing, since I will usually only have one string.
const results = (x) => x.map(a => {
    //return {original: a, updated: runChrono(a) } 
    return parseDate(a)
})
  
console.log(results(dates))
    

export default parseDate

//1. Check for and remove circa
//2. Remove extra characters
//3. Check for before, after, "and", and between and create dateEnd if needed
//4. Run date parser (on both start and end if applicable)
//5. Split here based on results:
//  a. Check for precision if date is returned
//  b. If no date:
//    1) check for 1800s / late 1850s / early 1700 s
//    2) check if year-only and create date w/ precision