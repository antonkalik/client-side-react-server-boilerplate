function spread(data) {
  const newArray = [];
  let subArray = [];
  for (let i = 0; i < data.length; i++) {
    if (data[i + 1] && data[i].minute - data[i + 1].minute < 2) {
      subArray.push({ message: data[i].message });
    } else {
      newArray.push(subArray);
      subArray = [];
      newArray.push(data[i]);
    }
  }
  return newArray;
}

module.exports = spread;
