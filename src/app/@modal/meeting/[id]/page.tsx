interface MeetingPageProps {
  id: string;
}

export default async function Page({ id }: MeetingPageProps) {
  return (
    <div>
      <h1>Meeting Page</h1>
      <p>Meeting ID: {id}</p>
    </div>
  );
}
