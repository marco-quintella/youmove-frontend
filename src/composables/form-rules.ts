const formRules = {
  required: function (message: string) {
    return (value: any) => {
      return !!value || message
    }
  }
}

export default formRules
