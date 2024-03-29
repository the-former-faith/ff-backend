const slugify = (text) => {
    const from = 'ãàáäâẽèéëêìíïîõòóöôùúüûñç·/_,:;'
    const to = 'aaaaaeeeeeiiiiooooouuuunc------'

    const newText = Array.from(text)
        .map((c) => {
        const index = [...from].indexOf(c)
        if (index > -1) {
            return c.replace(
            new RegExp(from.charAt(index), 'g'),
            to.charAt(index)
            )
        }
        return c
        })
        .join('')

    return newText
        .toString()                     // Cast to string
        .toLowerCase()                  // Convert the string to lowercase letters
        .trim()                         // Remove whitespace from both sides of a string
        .replace(/\s+/g, '-')           // Replace spaces with -
        .replace(/&/g, '-y-')           // Replace & with 'and'
        .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
        .replace(/\-\-+/g, '-');   
}

export default slugify