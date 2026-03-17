export default async function UserProfile({ params }: any) {
  const resolvedParams = await params;
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Profile</h1>
      <hr />
      <p className="text-4xl">
        Profile Page
        <span className="p-2 ml-2 bg-violet-500  text-black rounded items-center justify-center">{resolvedParams.id}</span>
      </p>
    </div>
  );
}
