export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  return Response.json({ message: `Test ${params.id}` });
}
