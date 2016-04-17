import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import twitter4j.GeoLocation;
import twitter4j.Query;
import twitter4j.QueryResult;
import twitter4j.Status;
import twitter4j.Twitter;
import twitter4j.TwitterException;
import twitter4j.TwitterFactory;
import twitter4j.conf.ConfigurationBuilder;
import twitter4j.json.DataObjectFactory;

public class TwitterStreamPuller {

	public static void main(String[] args) {
		ConfigurationBuilder cb = new ConfigurationBuilder();
	    cb.setJSONStoreEnabled(true);
		cb.setDebugEnabled(true)
		 .setOAuthConsumerKey("") // set your auth consumr key in this
		 .setOAuthConsumerSecret("")//  set your consumer secret key here
		 .setOAuthAccessToken("")// set your access token in here
		 .setOAuthAccessTokenSecret(""); // set your secret access token in here. 
		
	    Twitter twitter = new TwitterFactory(cb.build()).getInstance();
	    try {
		    File file = new File("twitterStream.json");
			if(!file.exists()) {
				file.createNewFile();
			}
			BufferedWriter writer = new BufferedWriter(new FileWriter(file, true));
			
			JSONArray entries = new JSONArray();
			JSONObject documentList = new JSONObject();
			
		    searchTweets("Trump", twitter, writer, entries);
		    searchTweets("Dinner", twitter, writer, entries);
		    searchTweets("Life", twitter, writer, entries);
		    searchTweets("Sports", twitter, writer, entries);
		    searchTweets("Car", twitter, writer, entries);
		    searchTweets("Food", twitter, writer, entries);
		    searchTweets("Education", twitter, writer, entries);
		    searchTweets("India", twitter, writer, entries);
		    searchTweets("Football", twitter, writer, entries);
		    searchTweets("Instagram", twitter, writer, entries);
		    
		    try {
		    	documentList.put("", entries);
		    	writer.write(documentList.getString(""));
		    } catch(JSONException e) {
		    	e.printStackTrace();
		    }
		    writer.flush();
		    writer.close();
	    } catch(IOException ioe) {
	    	ioe.printStackTrace();
	    }
	}
	
	public static void searchTweets(String keyword, Twitter twitter, BufferedWriter writer, JSONArray entries) {
		Query query = new Query(keyword);
	    query.geoCode(new GeoLocation(29.530881, -82.073610), 500.0, "mi");
	    QueryResult result;
		
	    try {
			result = twitter.search(query);
		    for (Status tweet : result.getTweets()) {
		    	if(tweet.getGeoLocation() != null) {
		    		JSONObject action = createJSObject(tweet);
		    		entries.put(action);
		    	}
		    }
		} catch (TwitterException e) {
			e.printStackTrace();
		}
	}
	
	public static JSONObject createJSObject(Status tweet) {
		JSONObject fields = new JSONObject();
		try {
			fields.put("tweet_id", tweet.getId());
			fields.put("screen_name", tweet.getUser().getScreenName());
			fields.put("user_url", tweet.getUser().getURL());
			fields.put("latitude", tweet.getGeoLocation().getLatitude());
			fields.put("longitude", tweet.getGeoLocation().getLongitude());
			fields.put("text", tweet.getText());
			fields.put("follower_count", tweet.getUser().getFollowersCount());
			fields.put("tweet_url", "https://twitter.com/" + tweet.getUser().getScreenName() + "/status/" + tweet.getId());
		} catch (JSONException e) {
			e.printStackTrace();
		}
		
		JSONObject action = new JSONObject();
		try {
			action.put("fields", fields);
			action.put("id", tweet.getId());
			action.put("type", "add");
		} catch(JSONException e) {
			e.printStackTrace();
		}
		
		return action;
	}
}
