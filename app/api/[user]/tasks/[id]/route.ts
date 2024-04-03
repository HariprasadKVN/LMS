export async function GET(
    request: Request,
    { params }: { params: { user: string, id:string  } },
  ) {
    return Response.json({ message: `Test ${params.user} ${params.id}` });
  }