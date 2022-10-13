const formRules = {
  required(message: string) {
    return (value: any) => {
      return !!value || message
    }
  },
}

export default formRules
