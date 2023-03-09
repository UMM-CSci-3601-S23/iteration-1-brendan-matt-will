package umm3601.message;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

public class MessageSpec {

  private static final String FAKE_ID_STRING_1 = "fakeIdOne";
  private static final String FAKE_ID_STRING_2 = "fakeIdTwo";

  private Message message1;
  private Message message2;

  @BeforeEach
  void setupEach() {
    message1 = new Message();
    message2 = new Message();
  }

  @Test
  void messagesWithEqualIdAreEqual() {
    message1._id = FAKE_ID_STRING_1;
    message2._id = FAKE_ID_STRING_1;

    assertTrue(message1.equals(message2));
  }

  @Test
  void messagesWithDifferentIdAreNotEqual() {
    message1._id = FAKE_ID_STRING_1;
    message2._id = FAKE_ID_STRING_2;

    assertFalse(message1.equals(message2));
  }

  @Test
  void hashCodesAreBasedOnId() {
    message1._id = FAKE_ID_STRING_1;
    message2._id = FAKE_ID_STRING_1;

    assertTrue(message1.hashCode() == message2.hashCode());
  }

  @Test
  void messagesAreNotEqualToOtherKindsOfThings() {
    message1._id = FAKE_ID_STRING_1;
    // a message is not equal to its id even though id is used for checking equality
    assertFalse(message1.equals(FAKE_ID_STRING_1));
  }
}
