import dayjs from "dayjs";
export default function (app) {
  app.directive('time-format', {
    mounted(el, bindings) {
      let formatString = bindings.value
      if (!formatString) {
        formatString = 'YYYY-MM-DD-dd HH:mm:ss'
      }
      const textContent = el.textContent
      const timestamp = parseInt(textContent)
      if (textContent.length == 10) {
        timestamp *= 10
      }

      el.textContent = dayjs(timestamp).format(formatString)
    }
  })
}