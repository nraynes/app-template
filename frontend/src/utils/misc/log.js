function log(message, ...args) {
  if (process.env.NODE_ENV === 'development') {
    console.log(message, ...args);
  }
}

export default log;
