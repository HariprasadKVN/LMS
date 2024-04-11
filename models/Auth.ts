import mongoose from "mongoose";

export interface Auth extends mongoose.Document {
  name?: string;
  email?: string;
  password?: string;
}

/* TaskSchema will correspond to a collection in your MongoDB database. */
const AuthSchema = new mongoose.Schema<Auth>({
  name: {
    /* The name of this pet */

    type: String,
    // required: [true, "Please provide the creator's ID"],
  },
  email: {
    /* The owner of this pet */

    type: String,
    // required: [true, "Please provide the assigned to ID"],
  },
  password: {
    /* The species of your pet */

    type: String,
    // required: [true, "Please specify the task ID."],
  }
});

export default mongoose.models.Auth || mongoose.model<Auth>("Auth", AuthSchema);
