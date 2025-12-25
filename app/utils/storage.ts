import AsyncStorage from "@react-native-async-storage/async-storage";
import { Post } from "./types";

//Storage Key - This is to retreive your posts, @ is a common convention
const STORAGE_KEY = "@capto_posts";

const getPosts = async (): Promise<Post[]> => {
  //makes the functio async and returns a promise of an array of posts
  //Promise is a JS object that represents a value that will exist in the future
  //When resolved the promise will give an array of Post objects
  try {
    //error handling
    const value = await AsyncStorage.getItem(STORAGE_KEY); //reads a value from device storage with this key
    //value returned is a string if promise is resolved else its null
    if (value !== null) {
      //if the value is not null, parse the value as an array of Post objects
      return JSON.parse(value) as Post[]; //the value is a string, so we need to parse it as an array of Post objects
    }
  } catch (error) {
    //if the promise is rejected, catch the error
    console.error("Error getting posts:", error); //log the error to the console
  }
  return []; //if the promise is resolved, return an empty array
};

const savePosts = async (p: Post[]) => {
  try {
    const posts = await getPosts();
    const new_posts = [...posts, ...p];
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(new_posts));
    //converts new_posts as a JSON string (Serialisation)and saves it to the device storage with the key STORAGE_KEY
    //overwrites any existing value with the same key due to setItem method
  } catch (error) {
    console.error("Error saving posts:", error);
  }
};

export { getPosts, savePosts };
