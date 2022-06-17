const generateJoiError = (errors, enqueueSnackbar) => {
  for (let i = 0;i < errors.length;i++) {
    enqueueSnackbar(`${Object.values(errors[i])[0]}\n`, { variant: 'error' })
  }
}

export default generateJoiError;