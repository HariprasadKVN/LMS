import mongoose from "mongoose";

export interface Auth extends mongoose.Document {
  name: string;
  email: string;
  password: string;
}

/* TaskSchema will correspond to a collection in your MongoDB database. */
const AuthSchema = new mongoose.Schema<Auth>({
  name: {
    /* Name of the user */
    type: String,
    required: [true, "Please provide the User Name"],
  },
  email: {
    /* User's email, used for logging*/
    type: String,
    required: [true, "Please provide the User's email for logging"],
  },
  password: {
    /*User's password*/
    type: String,
    required: [true, "Please specify the user's password"],
  },
});

export default mongoose.models.Auth ||
  mongoose.model<Auth>("Auth", AuthSchema);
