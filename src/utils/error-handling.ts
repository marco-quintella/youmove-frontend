// eslint-disable-next-line @typescript-eslint/ban-types
export function tryCatch (fn: Function, fin?: Function): void {
  try {
    fn()
  } catch (e) {
    console.error(e)
  } finally {
    !!fin && fin()
  }
}
