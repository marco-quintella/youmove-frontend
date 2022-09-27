const formRules = {
  required: function (message: string) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (value: any) => {
      return !!value || message
    }
  }
}

export default formRules
