import axios from "axios";

export const deleteEvent = async (event) => {
  console.log("Deleting event:", event);
  try {
    const response = await axios.delete(`/api/deleteEvent/${event.id}`);
    return response.data;
  } catch (error) {
    console.error("API error while deleting event:", error);
    throw error;
  }
};
