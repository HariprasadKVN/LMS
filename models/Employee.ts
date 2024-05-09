import mongoose, { Schema, Document } from 'mongoose';
import { object } from 'zod';
 
// Define the Employee interface
interface Employee extends Document {
  empId:string,
  leaves: {[key:string]:{total:number, applied:[Date]}}
  effort:{}
}
 
/* TaskSchema will correspond to a collection in your MongoDB database. */
const EmployeeSchema = new Schema<Employee>({
  empId: {
    /* The name of this pet */
 
    type: String,
    required: [true, "Please provide the creator's ID"],
  },
  leaves: {
    type: mongoose.Schema.Types.Mixed,
    required: [false, "Please provide the creator's Object"],
  },
  effort:{
    type: mongoose.Schema.Types.Mixed,
    required: [false, "Please provide the creator's Object"],
  }
});
 
export default mongoose.models.Employee ||
  mongoose.model<Employee>("Employee", EmployeeSchema);