import mongoose from "mongoose";

export interface Tasks extends mongoose.Document {
  created_by?: string;
  assigned_to?: string;
  task_id?: string;
  task_desc?: string;
  estimate?: number;
  status?: string;
  start_date?: Date;
  end_date?: Date;
}

/* TaskSchema will correspond to a collection in your MongoDB database. */
const TaskSchema = new mongoose.Schema<Tasks>({
  created_by: {
    /* The name of this pet */

    type: String,
    // required: [true, "Please provide the creator's ID"],
  },
  assigned_to: {
    /* The owner of this pet */

    type: String,
    // required: [true, "Please provide the assigned to ID"],
  },
  task_id: {
    /* The species of your pet */

    type: String,
    // required: [true, "Please specify the task ID."],
  },
  task_desc: {
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
  start_date: {
    /* Url to pet image */

    // required: [true, "Please provide the start date"],
    type: Date,
  },
  end_date: {
    /* List of things your pet likes to do */

    type: Date,
  },
});

export default mongoose.models.Task || mongoose.model<Tasks>("Task", TaskSchema);
