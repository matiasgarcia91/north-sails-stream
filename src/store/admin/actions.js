import axios from "../axios";

export const uploadCSV = (selectedFile, amountOfDummies, domain) => async (
  dispatch,
  getState
) => {
  try {
    const uploadingStarted = () => ({ type: "UPLOADING" });
    const accountsCreated = accounts => ({
      type: "ACCOUNTS_CREATED",
      payload: accounts,
    });

    dispatch(uploadingStarted());
    const formData = new FormData();

    formData.append("file", selectedFile);
    formData.append("dummies", amountOfDummies);
    formData.append("domain", domain);
    const response = await axios.post("/csv-upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(response.data);
    dispatch(accountsCreated(response.data));
  } catch (e) {
    console.log("Error", e.message);
  }
};
