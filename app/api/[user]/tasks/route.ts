export async function GET(
    request: Request,
    { params }: { params: { user: string  } },
  ) {
    return Response.json({ message: `Test ${params.user}` });
  }
  