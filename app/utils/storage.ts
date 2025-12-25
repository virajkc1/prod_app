import AsyncStorage from "@react-native-async-storage/async-storage";
import { Post, Topic } from "./types";

//Storage Key - This is to retreive your posts, @ is a common convention
const STORAGE_KEY = "@capto_posts";
const TOPIC_STORAGE_KEY = "@capto_topics";

// Format date to DD/MM/YYYY Function - Utility Function
const formatDate = (date: Date): string => {
  //Date is a JS object
  const day = String(date.getDate()).padStart(2, "0"); //getDate gets day of month eg: 1 to 31 and converts into a String
  //ensures string is 2 characters long else it will add a 0 to the start eg: 4 turns to "04"
  const month = String(date.getMonth() + 1).padStart(2, "0"); //get month ranges from 0 to 11 so we add 1 to that value eg: 1 to 12
  const year = date.getFullYear(); //getFullYear gets the full year eg: 2025
  return `${day}/${month}/${year}`; //returns the date in the format DD/MM/YYYY
};

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
      const posts = JSON.parse(value) as Post[]; //parses the value as an array of Post objects
      // Sort posts by date (newest first) - parse date string to compare
      return posts.sort((a, b) => {
        //in place sort, O(n) time complexity
        const dateA = a.date.split("/").reverse().join("-"); // Convert DD/MM/YYYY to YYYY-MM-DD
        const dateB = b.date.split("/").reverse().join("-");
        return dateB.localeCompare(dateA); // Descending order (newest first)
        //localeCompare - compares 2 strings if <0 then dateB is before dateA
      });
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

const hasPostToday = async (): Promise<boolean> => {
  try {
    const posts = await getPosts();
    const today = formatDate(new Date());
    return posts.some((post) => post.date === today);
    //.some method iterates through the array to find the element with post.date === today's date
    //some method better than filter as it breaks if resolves to true

    //some will return true or false, best for checks
    //.find, returns the first matching item
    //every returns do all match
  } catch (error) {
    console.error("Error checking post today:", error);
    return false;
  }
};

const getAllTopics = async (): Promise<Topic[]> => {
  try {
    const value = await AsyncStorage.getItem(TOPIC_STORAGE_KEY); //get the item with this key
    if (value !== null) {
      const topics = JSON.parse(value) as Topic[]; // this will get the JSON text and parse it as an array of topics
      //Sort it alphabetically
      return topics.sort((a, b) => a.name.localeCompare(b.name)); //based on the name attribute of each Topic Object
    }
  } catch (error) {
    console.log("Error getting topics", error);
  }
  return [];
};

const saveTopic = async (topic: Topic) => {
  //How to save a topic
  try {
    const curr_topics = await getAllTopics(); //get current topics
    const new_topics = [...curr_topics, topic];
    await AsyncStorage.setItem(TOPIC_STORAGE_KEY, JSON.stringify(new_topics)); //Why do we need to stringify
  } catch (error) {
    console.log("Error saving topic", error);
  }
};

const topicCheck = async (topicName: string): Promise<boolean> => {
  try {
    const topics = await getAllTopics();
    return topics.some(
      (topic) => topic.name.toLowerCase() === topicName.toLowerCase()
    ); //returns true or false if we found the error
  } catch (error) {
    console.log("Error in topicCheck function", error);
  }
};

export {
  getPosts,
  savePosts,
  hasPostToday,
  formatDate,
  getAllTopics,
  saveTopic,
};
