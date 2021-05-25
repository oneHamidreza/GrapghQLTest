export function log(msg, color = '#ffffff') {
    if (color === '#ffffff')
        console.log(msg)
    else
        console.log("%c" + msg, "color:" + color + ";font-weight:bold;")
}