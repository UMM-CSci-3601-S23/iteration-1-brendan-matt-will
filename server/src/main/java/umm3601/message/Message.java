package umm3601.message;

import org.mongojack.Id;
import org.mongojack.ObjectId;

@SuppressWarnings({"VisibilityModifier"})
public class Message {
  @ObjectId @Id
  // By default Java field names shouldn't start with underscores.
  // Here, though, we *have* to use the name `_id` to match the
  // name of the field as used by MongoDB.
  @SuppressWarnings({"MemberName"})

  public String _id;
  public String name;
  public String body;

  @Override
  public boolean equals(Object obj) {
    if (!(obj instanceof Message)) {
      return false;
    }
    Message other = (Message) obj;
    return _id.equals(other._id);
  }

  @Override
  public int hashCode() {
    // This means that equal Messages will hash the same, which is good.
    return _id.hashCode();
  }

}
