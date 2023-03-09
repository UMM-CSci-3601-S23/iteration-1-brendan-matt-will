package umm3601.message;



import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static com.mongodb.client.model.Filters.eq;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Map;

import com.mongodb.MongoClientSettings;
import com.mongodb.ServerAddress;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;

import org.bson.Document;
import org.bson.types.ObjectId;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import org.mockito.ArgumentCaptor;
import org.mockito.Captor;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import io.javalin.validation.BodyValidator;
import io.javalin.validation.ValidationException;
import io.javalin.http.Context;
import io.javalin.http.HttpStatus;
import io.javalin.json.JavalinJackson;

/**
 * Tests the logic of the UserController
 *
 * @throws IOException
 */
@SuppressWarnings({ "MagicNumber" })
class MessageControllerSpec {

  // An instance of the controller we're testing that is prepared in
  // `setupEach()`, and then exercised in the various tests below.
  private MessageController messageController;

  // A Mongo object ID that is initialized in `setupEach()` and used
  // in a few of the tests. It isn't used all that often, though,
  // which suggests that maybe we should extract the tests that
  // care about it into their own spec file?
  private ObjectId samsId;

  // The client and database that will be used
  // for all the tests in this spec file.
  private static MongoClient mongoClient;
  private static MongoDatabase db;

  // Used to translate between JSON and POJOs.
  private static JavalinJackson javalinJackson = new JavalinJackson();

  @Mock
  private Context ctx;

  @Captor
  private ArgumentCaptor<ArrayList<Message>> messageArrayListCaptor;

  @Captor
  private ArgumentCaptor<Message> messageCaptor;

  @Captor
  private ArgumentCaptor<Map<String, String>> mapCaptor;

  /**
   * Sets up (the connection to the) DB once; that connection and DB will
   * then be (re)used for all the tests, and closed in the `teardown()`
   * method. It's somewhat expensive to establish a connection to the
   * database, and there are usually limits to how many connections
   * a database will support at once. Limiting ourselves to a single
   * connection that will be shared across all the tests in this spec
   * file helps both speed things up and reduce the load on the DB
   * engine.
   */
  @BeforeAll
  static void setupAll() {
    String mongoAddr = System.getenv().getOrDefault("MONGO_ADDR", "localhost");

    mongoClient = MongoClients.create(
        MongoClientSettings.builder()
            .applyToClusterSettings(builder -> builder.hosts(Arrays.asList(new ServerAddress(mongoAddr))))
            .build()
    );
    db = mongoClient.getDatabase("test");
  }

  @AfterAll
  static void teardown() {
    db.drop();
    mongoClient.close();
  }

  @BeforeEach
  void setupEach() throws IOException {
    // Reset our mock context and argument captor (declared with Mockito annotations @Mock and @Captor)
    MockitoAnnotations.openMocks(this);

    // Setup database
    MongoCollection<Document> messageDocuments = db.getCollection("messages");
    messageDocuments.drop();
    List<Document> testMessages = new ArrayList<>();
    testMessages.add(
        new Document()
            .append("name", "Chris")
            .append("body", "this is a test message"));

    testMessages.add(
        new Document()
            .append("name", "Pat")
            .append("body", "i want beans"));
    testMessages.add(
        new Document()
            .append("name", "Jamie")
            .append("body", "i want noodles"));

    samsId = new ObjectId();
    Document sam = new Document()
        .append("_id", samsId)
        .append("name", "Sam")
        .append("body", "sam wants tacos");

    messageDocuments.insertMany(testMessages);
    messageDocuments.insertOne(sam);

    messageController = new MessageController(db);
  }

  @Test
  void canGetAllMessages() throws IOException {
    // When something asks the (mocked) context for the queryParamMap,
    // it will return an empty map (since there are no query params in this case where we want all users)
    when(ctx.queryParamMap()).thenReturn(Collections.emptyMap());

    // Now, go ahead and ask the userController to getUsers
    // (which will, indeed, ask the context for its queryParamMap)
    messageController.getMessages(ctx);

    // We are going to capture an argument to a function, and the type of that argument will be
    // of type ArrayList<User> (we said so earlier using a Mockito annotation like this):
    // @Captor
    // private ArgumentCaptor<ArrayList<User>> userArrayListCaptor;
    // We only want to declare that captor once and let the annotation
    // help us accomplish reassignment of the value for the captor
    // We reset the values of our annotated declarations using the command
    // `MockitoAnnotations.openMocks(this);` in our @BeforeEach

    // Specifically, we want to pay attention to the ArrayList<User> that is passed as input
    // when ctx.json is called --- what is the argument that was passed? We capture it and can refer to it later
    verify(ctx).json(messageArrayListCaptor.capture());
    verify(ctx).status(HttpStatus.OK);

    // Check that the database collection holds the same number of documents as the size of the captured List<User>
    assertEquals(db.getCollection("messages").countDocuments(), messageArrayListCaptor.getValue().size());
  }

//    @Test
//    void addMesssage() throws IOException {
//      String testNewMessage = "{"
//          + "\name\": \"Test Name"
//          + "\"body\": \"This is a test body that is long enough\","
//          + "}";
//      when(ctx.bodyValidator(Message.class))
//        .then(value -> new BodyValidator<Message>(testNewMessage, Message.class, javalinJackson));

//      messageController.addNewMessage(ctx);
//      verify(ctx).json(mapCaptor.capture());

//      // Our status should be 201, i.e., our new user was successfully created.
//      verify(ctx).status(HttpStatus.CREATED);

//      //Verify that the user was added to the database with the correct ID
//      Document addedMessage = db.getCollection("messages")
//        .find(eq("_id", new ObjectId(mapCaptor.getValue().get("id")))).first();

//      // Successfully adding the user should return the newly generated, non-empty MongoDB ID for that user.
//      assertNotEquals("", addedMessage.get("_id"));

//      assertEquals("This is a test body", addedMessage.get(MessageController.BODY_KEY));


//  }

@Test
void addNullBodyMessage() throws IOException {
  String testNewMessage = "{"
      + "\"name\": \"Test Name\"."

      + "}";
  when(ctx.bodyValidator(Message.class))
    .then(value -> new BodyValidator<Message>(testNewMessage, Message.class, javalinJackson));

  assertThrows(ValidationException.class, () -> {
    messageController.addNewMessage(ctx);
  });
}

@Test
void addInvalidBodyMessage() throws IOException {
  String testNewMessage = "{"
      + "\"body\": \"\","

      + "}";
  when(ctx.bodyValidator(Message.class))
    .then(value -> new BodyValidator<Message>(testNewMessage, Message.class, javalinJackson));

  assertThrows(ValidationException.class, () -> {
    messageController.addNewMessage(ctx);
  });
}

}
