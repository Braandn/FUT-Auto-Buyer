export const generateId = (length) => {
  let result = "";
  let characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

export const wait = async (seconds = 1) => {
  const rndFactor = Math.floor(Math.random());
  await new Promise((resolve) =>
    setTimeout(resolve, (rndFactor + seconds) * 1000)
  );
};

export const showLoader = () => {
  jQuery(".ut-click-shield").addClass("showing");
  jQuery(".loaderIcon ").css("display", "block");
};

export const hideLoader = () => {
  jQuery(".ut-click-shield").removeClass("showing");
  jQuery(".loaderIcon ").css("display", "none");
};

export const convertToSeconds = (val) => {
  if (val) {
    let valInterval = val[val.length - 1].toUpperCase();
    let valInTime = parseInt(val.substring(0, val.length - 1));
    let multipler = valInterval === "M" ? 60 : valInterval === "H" ? 3600 : 1;
    if (valInTime) {
      valInTime = valInTime * multipler;
    }
    return valInTime;
  }
  return 0;
};

export const getRandNum = (min, max) =>
  Math.round(Math.random() * (max - min) + min);

export const getRangeValue = (range) => {
  if (range) {
    return range.split("-").map((a) => parseInt(a));
  }
  return [];
};

export const getRandWaitTime = (range) => {
  if (range) {
    const [start, end] = range.split("-").map((a) => parseInt(a));
    return Math.round(Math.random() * (end - start) + start) * 1000;
  }
  return 0;
};

export const formatString = (str, len) => {
  if (str.length <= len) {
    str += " ".repeat(len - str.length);
  }
  return str;
};

export const promisifyTimeOut = (cb, wait) => {
  return new Promise((resolve) => {
    setTimeout(function () {
      cb();
      resolve();
    }, 1000);
  });
};

export const networkCallWithRetry = (execution, delay, retries) =>
  new Promise((resolve, reject) => {
    return execution()
      .then(resolve)
      .catch((reason) => {
        if (retries > 0) {
          return wait(delay)
            .then(
              networkCallWithRetry.bind(null, execution, delay, retries - 1)
            )
            .then(resolve)
            .catch(reject);
        }
        return reject(reason);
      });
  });
