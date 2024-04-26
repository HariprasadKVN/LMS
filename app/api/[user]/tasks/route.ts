import dbConnect from "@/store/dbConnect";
import Task from "@/models/Task";

export async function GET(request: Request) {
  await dbConnect();
  try {
    const tasks = await Task.find({
      status: { $nin: ["completed", "aborted"] },
    }).sort({ status: -1, start_date: 1 });
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

export async function PUT(request: Request) {
  try {
    const x = await request.json();
    const task = await Task.findByIdAndUpdate(x._id, {
      $set: { status: x.status },
    });
    return Response.json({ success: true, data: task });
  } catch (error) {
    console.log(error);
    return Response.json({ success: false });
  }
}
