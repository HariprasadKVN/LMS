import dbConnect from "@/lib/dbConnect";
import Task from "@/models/Task";

export async function GET(request: Request) {
  await dbConnect();
  try {
    const tasks = await Task.find({});
    return Response.json({ success: true, data: tasks });
  } catch (error) {
    return Response.json({ success: false });
  }
}

export async function POST(request: Request) {
  try {
    const task = await Task.create(await request.json());
    return Response.json({ success: true, data: task });
  } catch (error) {
    console.log(error);
    return Response.json({ success: false });
  }
}
