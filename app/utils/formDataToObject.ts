export const formDataToObject = (myFormData: FormData) => {
  const formDataObj: Record<string, FormDataEntryValue> = {};
  myFormData.forEach((value, key) => {
    formDataObj[key] = value;
  });
  return formDataObj;
};
