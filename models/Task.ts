import mongoose from "mongoose";


export interface Tasks extends mongoose.Document {
  createdBy?: string;
  assignedTo?: string;
  taskId?: string;
  taskDesc?: string;
  estimate?: number;
  status?: string;
  startDate?: Date;
  endDate?: Date;
}

/* TaskSchema will correspond to a collection in your MongoDB database. */
const TaskSchema = new mongoose.Schema<Tasks>({
  createdBy: {
    /* The name of this pet */

    type: String,
    // required: [true, "Please provide the creator's ID"],
  },
  assignedTo: {
    /* The owner of this pet */

    type: String,
    // required: [true, "Please provide the assigned to ID"],
  },
  taskId: {
    /* The species of your pet */

    type: String,
    // required: [true, "Please specify the task ID."],
  },
  taskDesc: {
    /* Pet's age, if applicable */

    type: String,
    // required: [true, "Please provide the task description"],
  },
  estimate: {
    /* Boolean poddy_trained value, if applicable */

    type: Number,
  },
  status: {
    /* List of dietary needs, if applicable */

    type: String,
  },
  startDate: {
    /* Url to pet image */

    // required: [true, "Please provide the start date"],
    type: Date,
  },
  endDate: {
    /* List of things your pet likes to do */

    type: Date,
  },
});

export default mongoose.models.Task ||
  mongoose.model<Tasks>("Task", TaskSchema);
